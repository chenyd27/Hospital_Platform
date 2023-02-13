import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginGuard } from '../userinfo.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent implements OnInit {
  doctor : any;
  patients : any;
  selectId : string = "";
  chart : any;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{
      ticks:{
        stepSize: 1,
      }
    }] },

  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public dateset : number[] = [0,0,0,0,0,0,0];
  
  public barChartData: ChartDataSets[] = [
    { data: this.dateset, label: 'Unfinished Times' },
  ];  

  constructor(private http : HttpClient, private route : ActivatedRoute, private router : Router, private loginInfo : LoginGuard) {
   }

  getReminderList() :void{
      let tmpId = this.selectId.split(" - ")[0];
      this.dateset = [0,0,0,0,0,0,0];
      this.http.get(this.loginInfo.url + "doctor-outdated-reminder?patientId=" + tmpId).subscribe((res : any)=>{
        console.log(res);
        for(let i = 0;i < res.outdatedReminderList.length;i++){
          let date = new Date();
          let tmp = new Date(res.outdatedReminderList[i].date);
          date.setHours(0,0,0,0);
          tmp.setHours(0,0,0,0);
          let lag = date.getTime() - tmp.getTime();
          lag /= (3600 * 24 * 1000);
          lag = Math.floor(lag);
          this.dateset[lag] += 1;
        }
        this.barChartData = [{data: this.dateset, label: 'Unfinished Times'}];
      })
  }

  ngOnInit(): void {
    let currentDoctor : any;
    let tmpDoctor: string | null = localStorage.getItem('doctor');
    if(typeof tmpDoctor === "string"){
      currentDoctor = JSON.parse(tmpDoctor);
    }
    this.http.post(this.loginInfo.url + "doctor-outdated",currentDoctor).subscribe((res:any)=>{
        if(res.outdated == true){
          this.http.post(this.loginInfo.url + "doctor-info",currentDoctor).subscribe((res:any)=>{
            if(res.flag == true){
              this.loginInfo.setDoctor(res.doctor,res.flag);
              localStorage.setItem('doctor',JSON.stringify(res.doctor));
              this.patients = this.loginInfo.doctor.patientList;
              this.http.get(this.loginInfo.url + "doctor-outdated-reminder?patientId=" + this.patients[0].patientId).subscribe((res : any)=>{
                for(let i = 0;i < res.outdatedReminderList.length;i++){
                  let date = new Date();
                  let tmp = new Date(res.outdatedReminderList[i].date);
                  date.setHours(0,0,0,0);
                  tmp.setHours(0,0,0,0);
                  let lag = date.getTime() - tmp.getTime();
                  lag /= (3600 * 24 * 1000);
                  lag = Math.floor(lag);
                  this.dateset[lag] += 1;
                }
                this.barChartData = [{data: this.dateset, label: 'Unfinished Times'}];
              })
            }
          })
        }
    })
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        this.barChartLabels.push(date.toLocaleDateString());
      }
  }

}

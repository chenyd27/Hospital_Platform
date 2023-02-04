import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginGuard } from '../userinfo.service';
import { Chart } from 'chart.js';


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
  constructor(private http : HttpClient, private route : ActivatedRoute, private router : Router, private loginInfo : LoginGuard) { }

  getReminderList() :void{
      let tmpId = this.selectId.split(" - ")[0];
      this.http.get(this.loginInfo.url + "doctor-outdated-reminder?patientId=" + tmpId).subscribe((res : any)=>{
         console.log(res);
      })
  }

  ngOnInit(): void {
      let tmpdoctor = localStorage.getItem('doctor');
      if(typeof tmpdoctor === "string") this.doctor = JSON.parse(tmpdoctor);
      this.patients = this.doctor.patientList;
      
  }

}

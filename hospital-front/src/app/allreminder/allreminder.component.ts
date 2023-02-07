import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginGuard } from '../userinfo.service';

@Component({
  selector: 'app-allreminder',
  templateUrl: './allreminder.component.html',
  styleUrls: ['./allreminder.component.less']
})
export class AllreminderComponent implements OnInit {

  doctor:any = {};
  reminderList: any;
  constructor(private http: HttpClient, private route : ActivatedRoute, private router : Router, private loginInfo : LoginGuard) { }

  ngOnInit(): void {
    localStorage.setItem('patientpage','false');
    localStorage.setItem('reminderpage','true');
    localStorage.setItem('allreminder','2');
    this.route.queryParams.subscribe((data:any)=>{
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
                this.doctor = res.doctor;
                this.reminderList = res.doctor.reminderList;
                console.log(this.reminderList);
              }
            })
          }
      })
      
    })
  }

}

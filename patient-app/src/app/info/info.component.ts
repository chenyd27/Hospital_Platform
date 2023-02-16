import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginGuard } from '../service/userinfo.service';
import { Router } from '@angular/router';
import { StompService } from '../service/stomp.service';
import { RouteReuseStrategy } from '@angular/router';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  patient:any;
  constructor(private routeReuseStrategy: RouteReuseStrategy,private http : HttpClient, private loginService : LoginGuard,private router : Router,private stomp : StompService) { }
  
  renewReminderList():void{
    this.http.post(this.loginService.url + 'patient-outdated',this.patient).subscribe((res:any)=>{
      this.http.post(this.loginService.url + "login-patient",this.patient).subscribe((res:any)=>{
        if(res.flag == true){
          this.patient = res.patient;
        }
      })
    })
  }

  logout():void{
    
    localStorage.clear();
    localStorage.setItem('flag','false');
    localStorage.setItem('patient','');
    localStorage.setItem('homepage','true');
    this.router.navigateByUrl('login');
  }


  ngOnInit() {
    console.log("c");
    let tmp = localStorage.getItem('patient');
    if(tmp != null)this.patient = JSON.parse(tmp);
    this.renewReminderList();
    this.stomp.subscribe('/topic/' + this.patient.patientId,(data:any)=>{
      this.renewReminderList();
    })
  }

}

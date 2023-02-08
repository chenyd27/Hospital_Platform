import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginGuard } from '../service/userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  patient:any;
  constructor(private http : HttpClient, private loginService : LoginGuard,private router : Router) { }
  
  renewReminderList():void{
    this.http.post(this.loginService.url + 'patient-outdated',this.patient).subscribe((res:any)=>{
      this.http.post(this.loginService.url + "patient-reminder",this.patient).subscribe((res:any)=>{
        if(res.flag == true){
          this.patient.reminderList = res.reminderList;
        }
      })
    })
  }

  logout():void{
    localStorage.setItem('homepage','true');
    this.router.navigateByUrl('login');
  }

  ngOnInit() {
    localStorage.setItem('homepage','false');
    let tmp = localStorage.getItem('patient');
    if(tmp != null)this.patient = JSON.parse(tmp);
    this.renewReminderList();
  }

}

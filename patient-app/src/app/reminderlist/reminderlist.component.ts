import { Component, OnInit } from '@angular/core';
import { LoginGuard } from '../service/userinfo.service';
import { StompService } from '../service/stomp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reminderlist',
  templateUrl: './reminderlist.component.html',
  styleUrls: ['./reminderlist.component.scss'],
})
export class ReminderlistComponent implements OnInit {

  patient:any;
  constructor(private loginService : LoginGuard,private stomp : StompService,private router :Router,private route : ActivatedRoute,private http:HttpClient) {}
  
  renewReminderList():void{
    this.http.post(this.loginService.url + 'patient-outdated',this.patient).subscribe((res:any)=>{
      this.http.post(this.loginService.url + "patient-reminder",this.patient).subscribe((res:any)=>{
        if(res.flag == true){
          this.patient.reminderList = res.reminderList;
        }
      })
    })
  }

  updateFinished(item : any):void{
      this.http.post(this.loginService.url + 'patient-finished',item).subscribe((res:any)=>{
          this.renewReminderList();
      })
  }

  

  ngOnInit(): void {
      if(localStorage.getItem('flag') == 'false' || localStorage.getItem('flag') == null){
          this.router.navigateByUrl("login");
      }else{
        localStorage.setItem('homepage','true');
        let tmp = localStorage.getItem('patient');
        if(tmp != null)this.patient = JSON.parse(tmp);
        this.renewReminderList();
        this.stomp.subscribe('/topic/' + this.patient.patientId,(data:any)=>{
          this.renewReminderList();
        })
      }
  }

}

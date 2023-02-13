import { Component, DoCheck, OnInit } from '@angular/core';
import { StompService } from '../service/stomp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginGuard } from '../service/userinfo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  patient:any;
  index:boolean = true;
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

  jumptoReminder():void{
    this.router.navigateByUrl('');
    this.index = true;
    localStorage.setItem('homepage','true');
  }

  jumptoInfo():void{
    this.router.navigateByUrl('home/info');
    this.index = false;
    localStorage.setItem('homepage','false');
  }  
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if(localStorage.getItem('homepage') == 'false'){
      this.index = false;
    }else{
      this.index = true;
    }
  }
  
  ngOnInit(): void {
      if(localStorage.getItem('flag') == 'false' || localStorage.getItem('flag') == null){
          this.router.navigateByUrl("login");
      }else{
        
        let tmp = localStorage.getItem('patient');
        if(tmp != null)this.patient = JSON.parse(tmp);
        this.renewReminderList();
        this.stomp.subscribe('/topic/' + this.patient.patientId,(data:any)=>{
          this.renewReminderList();
        })
      }
  }

}

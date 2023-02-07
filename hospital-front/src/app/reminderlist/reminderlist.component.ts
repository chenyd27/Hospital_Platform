import { Component, OnInit, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginGuard } from '../userinfo.service';

@Component({
  selector: 'app-reminderlist',
  templateUrl: './reminderlist.component.html',
  styleUrls: ['./reminderlist.component.less']
})
export class ReminderlistComponent implements OnInit,DoCheck{
  doctor : any = {};
  index : number = 0;
  subtitle : string = "Patient-List";
  changePatientList():void{
    this.index = 0;
  }
  changeReminderList():void{
    this.index = 1;
  }
  
  ngDoCheck(): void {
      if(localStorage.getItem('patientpage') ==='true'){
        this.subtitle = "Patient-List";
      }else{
        this.subtitle = "Reminder-List";
      }
  }

  constructor(private route : ActivatedRoute, private router : Router, private http : HttpClient, private loginInfo: LoginGuard ) { }

  ngOnInit(): void {
    if(localStorage.getItem('allreminder') == '1'){
      this.changePatientList();
    }else{
      this.changeReminderList();
    }
    localStorage.setItem('patientpage','true');
    localStorage.setItem('reminderpage','false');
  }

}

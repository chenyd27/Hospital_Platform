import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-addreminder',
  templateUrl: './addreminder.component.html',
  styleUrls: ['./addreminder.component.less']
})
export class AddreminderComponent implements OnInit {
  url : string = "http://44.210.137.103:8080/";
  doctor:any = {};
  selectPatient:string = "";
  patientId : string = "";
  reminderContent:string = "";
  duration : string = "";
  priorityLevel = ["HIGH", "MIDDLE","LOW"];
  prioritySelector : string = this.priorityLevel[2];

  errgroup : any = {
    emptyId : false,
    emptyContent : false,
    emptyDurationTime : false,
  }
  reminder : any = {
    patientId : "" ,
    reminderContent:"",
    duration : 0,
    doctorId : 0,
    priority: 0,
  }
  constructor(private http : HttpClient, private route : ActivatedRoute, private router : Router) { }

  changePatient():void{
    this.patientId = this.selectPatient.split(" - ")[0];
  }
  isNumber(value: string): boolean {
    return /^\d+$/.test(value);
  }

  isEmpty(value: string): boolean {
    return !value || value.trim().length === 0;
  }
  addReminder():void{
    if(this.isEmpty(this.reminderContent)){
      this.errgroup.emptyContent = true;
    }else if(this.isEmpty(this.patientId)){
      this.errgroup.emptyId = true;
    }else if(this.duration === "0" || this.isEmpty(this.duration) || this.isNumber(this.duration) == false){
      this.errgroup.emptyDurationTime = true;
    }else{
      this.reminder.patientId = this.patientId;
      this.reminder.reminderContent = this.reminderContent;
      this.reminder.duration = this.duration;
      this.reminder.doctorId = this.doctor.doctorId;
      if(this.prioritySelector === "HIGH"){
        this.reminder.priority = 3;
      }else if(this.prioritySelector === "MIDDLE"){
        this.reminder.priority = 2;
      }else{
        this.reminder.priority = 1;
      }
      this.http.post(this.url + 'doctor-addreminder',this.reminder).subscribe((res:any)=>{
        if(res.flag == true){
          localStorage.setItem('reminderButton','true');
          localStorage.setItem('addButton','false');
          localStorage.setItem('historyButton','false');
          localStorage.setItem('allreminder','1');
          this.router.navigateByUrl('');
        }
      })
    }
  }

  reset():void{
    this.errgroup.emptyId = false;
    this.errgroup.emptyContent = false;
    this.errgroup.emptyDurationTime = false;
  }

  clearInfo() :void{
    this.errgroup.emptyId = false;
    this.errgroup.emptyContent = false;
    this.errgroup.emptyDurationTime = false;
    this.selectPatient = "";
    this.reminderContent = "";
    this.duration = "";
    this.patientId = "";
    this.prioritySelector = this.priorityLevel[2];
  }


  ngOnInit(): void {
      let tmpdoctor = localStorage.getItem('doctor');
      if(typeof tmpdoctor === "string") this.doctor = JSON.parse(tmpdoctor);
  }

}

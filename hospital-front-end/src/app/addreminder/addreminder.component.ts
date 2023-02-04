import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addreminder',
  templateUrl: './addreminder.component.html',
  styleUrls: ['./addreminder.component.less']
})
export class AddreminderComponent implements OnInit {
  url : string = "http://localhost:9000/";
  doctor:any = {};
  selectPatient:string = "";
  patientId : string = "";
  reminderContent:string = "";
  duration : string = "";
  priorityLevel = ["HIGH", "MIDDLE","LOW"];
  prioritySelector : string = "";
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

  addReminder():void{
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
          this.router.navigateByUrl('');
       }
    })
  }

  ngOnInit(): void {
      let tmpdoctor = localStorage.getItem('doctor');
      if(typeof tmpdoctor === "string") this.doctor = JSON.parse(tmpdoctor);
  }

}

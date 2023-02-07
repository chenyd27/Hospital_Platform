import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginGuard } from '../userinfo.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.less']
})
export class PatientlistComponent implements OnInit {
  doctor : any = {}
  patients : any = [];
  constructor(private route : ActivatedRoute, private http: HttpClient, private loginInfo : LoginGuard) { }

  ngOnInit(): void {
    localStorage.setItem('patientpage','true');
    localStorage.setItem('reminderpage','false');
    localStorage.setItem('allreminder','1');
    if(localStorage.getItem('flag') == 'false'){
      console.log(1);
    }else{
      let currentDoctor : any;
      let tmpDoctor: string | null = localStorage.getItem('doctor');
      if(tmpDoctor != null){
        currentDoctor = JSON.parse(tmpDoctor);
      }
      this.http.post(this.loginInfo.url + "doctor-outdated",currentDoctor).subscribe((res:any)=>{
          if(res.outdated == true){
            this.http.post(this.loginInfo.url + "doctor-info",currentDoctor).subscribe((res:any)=>{
              if(res.flag == true){
                this.loginInfo.setDoctor(res.doctor,res.flag);
                localStorage.setItem('doctor',JSON.stringify(res.doctor));
                this.patients = this.loginInfo.doctor.patientList;
              }
            })
          }
      })
    }
  }

}

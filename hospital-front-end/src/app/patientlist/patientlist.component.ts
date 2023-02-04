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
                this.patients = this.loginInfo.doctor.patientList;
              }
            })
          }
      })
      
    })
  }

}

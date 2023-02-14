import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginGuard } from '../userinfo.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  doctor : any = {
    email : "",
    password : ""
  }
  email: string = "";
  password: string = "";
  router : Router;
  http : HttpClient;
  url : string = "http://44.211.141.255:8080/";
  jump():void{
    this.http.post(this.url + "doctor-login-origin",this.doctor).subscribe((res:any)=>{
      console.log(res);
      if(res.flag == true){
        this.loginInfo.setDoctor(res.doctor,res.flag);
        this.router.navigate(['/home']);
        localStorage.setItem('doctor',JSON.stringify(res.doctor));
        localStorage.setItem('flag',res.flag);
        console.log(localStorage);
        /**
         * let navigationExtras: NavigationExtras = {
          queryParams:{'email':res.doctor.email,'password':res.doctor.password}
        };
        this.router.navigate(['/home'],navigationExtras);
         */
      }
    })
  }

  constructor(router : Router, http : HttpClient, private loginInfo : LoginGuard) { 
    this.router = router;
    this.http = http;
  }

  ngOnInit(): void {
      localStorage.clear();
      localStorage.setItem('doctor',"");
      localStorage.setItem('flag',"false");
      localStorage.setItem('reminderButton','true');
      localStorage.setItem('addButton','false');
      localStorage.setItem('historyButton','false');
      localStorage.setItem('allreminder','1');
  }

}

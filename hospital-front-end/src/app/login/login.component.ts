import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AES, enc } from 'crypto-js';




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
  url : string = "http://localhost:9000/";
  jump():void{
    this.http.post(this.url + "doctor-login-origin",this.doctor).subscribe((res:any)=>{
      if(res.flag == true){
        let navigationExtras: NavigationExtras = {
          queryParams:{'email':res.doctor.email,'password':res.doctor.password}
        };
        this.router.navigate(['/home'],navigationExtras);
      }
    })
  }

  constructor(router : Router, http : HttpClient) { 
    this.router = router;
    this.http = http;
  }
  secret = 'secret_key';
  encode(str: string): string{
    const encoded = AES.encrypt(str, this.secret).toString();
    return encoded;
  }

  ngOnInit(): void {
  }

}

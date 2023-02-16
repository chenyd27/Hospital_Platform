import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginGuard } from '../service/userinfo.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  patient:any = {
    email:"",
    password:""
  }
  loginPatient():void{
    this.http.post(this.loginservice.url + "login-patient",this.patient).subscribe((res:any)=>{
      console.log('aft');
      localStorage.setItem('flag','true');
      localStorage.setItem('patient',JSON.stringify(res.patient));
      localStorage.setItem('homepage','true');
      this.router.navigateByUrl('home');
    })
  }

  cleanInput():void{
    this.patient.email = "";
    this.patient.password = "";
  }
  constructor(private router :Router,private route : ActivatedRoute,private http:HttpClient,private loginservice:LoginGuard) { }


  ngOnInit() {
    localStorage.clear();
    localStorage.setItem('flag','false');
    localStorage.setItem('patient','');
    localStorage.setItem('homepage','true');
    console.log(localStorage);
  }

}

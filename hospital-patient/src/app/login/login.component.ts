import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginGuard } from '../userinfo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  
  patient : any = {
    email:"",
    password:""
  }
  login():void{
    this.http.post(this.loginInfo.url + 'patient-login',this.patient).subscribe((res:any)=>{
      if(res.flag == true){
        this.loginInfo.setDoctor(res.doctor,res.flag);
        this.router.navigate(['/home']);
        localStorage.setItem('patient',JSON.stringify(res.patient));
        localStorage.setItem('flag',res.flag);
      }
    });
  }

  constructor(private http: HttpClient, private router : Router, private route : ActivatedRoute, private loginInfo : LoginGuard) { }

  ngOnInit() {
    localStorage.setItem('patient',"");
    localStorage.setItem('flag',"false");
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginGuard } from '../userinfo.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  doctor:any = {};
  state : boolean = false;
  router : Router;
  route : ActivatedRoute;
  http:HttpClient;
  url : string = "http://localhost:9000/";

  constructor(router : Router,route: ActivatedRoute, http:HttpClient,private loginInfo : LoginGuard) {
    this.router = router;
    this.route = route;
    this.http = http;
 }

  ngOnInit(): void {
    if(Boolean(localStorage.getItem('flag')) == false || localStorage.getItem('flag') == null){
      this.router.navigateByUrl("/login");
    }
    /**
     * this.route.queryParams.subscribe((data:any)=>{
      if(data.email == null){
        this.router.navigateByUrl("login");
      }else{
        this.doctor.email = data.email;
        this.doctor.password = data.password;
        this.http.post(this.url + "doctor-info",this.doctor).subscribe((res:any)=>{
          this.doctor = res;
          this.state = true;
        })
      }
    })
     */
  }
  }




import { AfterViewChecked, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginGuard } from '../userinfo.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit,DoCheck {

  doctor:any = {};
  state : boolean = false;
  router : Router;
  route : ActivatedRoute;
  http:HttpClient;
  url : string = "http://44.210.137.103:8080/";
  addButton : boolean = false;
  reminderButton : boolean = true;
  historyButton : boolean = false;

  changetoReminder():void{
    this.reminderButton = true;
    this.addButton = false;
    this.historyButton = false;
    localStorage.setItem('reminderButton','true');
    localStorage.setItem('addButton','false');
    localStorage.setItem('historyButton','false');
  }

  changetoAdd():void{
    this.reminderButton = false;
    this.addButton = true;
    this.historyButton = false;
    localStorage.setItem('reminderButton','false');
    localStorage.setItem('addButton','true');
    localStorage.setItem('historyButton','false');
  }
  changetoHistory():void{
    this.reminderButton = false;
    this.addButton = false;
    this.historyButton = true;
    localStorage.setItem('reminderButton','false');
    localStorage.setItem('addButton','false');
    localStorage.setItem('historyButton','true');
  }

  constructor(router : Router,route: ActivatedRoute, http:HttpClient,private loginInfo : LoginGuard) {
    this.router = router;
    this.route = route;
    this.http = http;
 }

 ngDoCheck(): void {
  //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //Add 'implements DoCheck' to the class.
  if(localStorage.getItem('historyButton') === "true"){
    this.historyButton = true;
    this.addButton = false;
    this.reminderButton = false;
  }else if(localStorage.getItem('addButton') === "true"){
    this.historyButton = false;
    this.addButton = true;
    this.reminderButton = false;
  } else{
    this.historyButton = false;
    this.addButton = false;
    this.reminderButton = true;
  }
 }

  ngOnInit(): void {
    if(Boolean(localStorage.getItem('flag')) == false || localStorage.getItem('flag') == null || localStorage.getItem('flag') == 'false'){
      this.router.navigateByUrl("/login");
    }else{
      if(localStorage.getItem('historyButton') === "true"){
        this.historyButton = true;
        this.addButton = false;
        this.reminderButton = false;
      }else if(localStorage.getItem('addButton') === "true"){
        this.historyButton = false;
        this.addButton = true;
        this.reminderButton = false;
      } else{
        this.historyButton = false;
        this.addButton = false;
        this.reminderButton = true;
      }
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



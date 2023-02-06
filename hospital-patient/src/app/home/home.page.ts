import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginGuard } from '../userinfo.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {

  data: any;
  alive = true;
  message = '';
  inputMessage = '';
  

  reminderList:any = [];

  constructor(private router : Router,private http : HttpClient, private route : ActivatedRoute, private loginInfo : LoginGuard) {}

  openSocket() : void{

  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(localStorage.getItem('flag') == null || localStorage.getItem('flag') == 'false'){
        this.router.navigateByUrl('login');
    }else{
      let currentPatient : any;
      let tmpPatient: string | null = localStorage.getItem('patient');
      if(typeof tmpPatient === "string"){
        currentPatient = JSON.parse(tmpPatient);
      }
      this.http.post(this.loginInfo.url + "patient-set-outdated",currentPatient).subscribe((res:any)=>{
        this.http.post(this.loginInfo.url + "patient-reminder",currentPatient).subscribe((res:any)=>{
          this.reminderList = res.reminderList;
          console.log(this.reminderList);
        })
      })
    }
  }
  
  ngOnDestroy() {
    this.alive = false;
  }


}

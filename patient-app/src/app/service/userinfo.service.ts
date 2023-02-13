import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn:'root', // 注入服务
})
export class LoginGuard{
    doctor : any = {
        email : "",
        password : ""
    }
    flag : boolean = false;
    url : string = "http://44.210.137.103:8080/";
    constructor(private http:HttpClient){}

    setDoctor(doctor : any, flag : any){
        this.doctor = doctor;
        this.flag = flag;
    }
    
}
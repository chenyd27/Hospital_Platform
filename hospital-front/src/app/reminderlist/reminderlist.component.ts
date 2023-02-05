import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginGuard } from '../userinfo.service';

@Component({
  selector: 'app-reminderlist',
  templateUrl: './reminderlist.component.html',
  styleUrls: ['./reminderlist.component.less']
})
export class ReminderlistComponent implements OnInit {
  doctor : any = {};
  index : number = 0;

  changePatientList():void{
    this.index = 0;
  }
  changeReminderList():void{
    this.index = 1;
  }

  constructor(private route : ActivatedRoute, private router : Router, private http : HttpClient, private loginInfo: LoginGuard ) { }

  ngOnInit(): void {
  }

}

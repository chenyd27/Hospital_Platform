import { Component, OnInit } from '@angular/core';
import { StompService } from '../service/stomp.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private stomp : StompService) {}

  ngOnInit(): void {
      this.stomp.subscribe('/topic/',(data:any)=>{
          console.log(data);
      })
  }

}

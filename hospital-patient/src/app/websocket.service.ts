import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private ws : WebSocket) { 
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MonitorService {


  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    let currentPatient : any;
      let tmpPatient: string | null = localStorage.getItem('patient');
      if(typeof tmpPatient === "string"){
        currentPatient = JSON.parse(tmpPatient);
      }
    return this.http.get('https://localhost:9000/patient-reminder',currentPatient);
  }
}

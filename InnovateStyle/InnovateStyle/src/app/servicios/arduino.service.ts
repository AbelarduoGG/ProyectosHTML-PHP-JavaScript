import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';    //traemos el modulo
import { Router } from '@angular/router'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArduinoService {

  private baseUrl = 'http://192.168.90.123:80';
  private urlobtenerarduino = "http://localhost:3000/arduinos/consultartodo"
  private urlobtenersensor2 = "http://localhost:3000/arduinos/consultartodo2"

  constructor(private http: HttpClient, private router:Router) { }

  encenderSensor(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ON`, {});
  }

  apagarSensor(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/OFF`, {});
  }

  obtenerarduino(){
    return this.http.get<any>(this.urlobtenerarduino); 
  }

  obtenersensor2(){
    return this.http.get<any>(this.urlobtenersensor2); 
  }

}

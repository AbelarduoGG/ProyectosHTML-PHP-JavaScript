import { Component, inject } from '@angular/core';
import { ArduinoService } from '../servicios/arduino.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arduino',
  standalone: true,
  imports: [FormsModule, CommonModule],   //para utilizar los ngModel en nuestro html y la variables
  templateUrl: './arduino.component.html',
  styleUrl: './arduino.component.css'
})
export class ArduinoComponent {

  arduinos: any[] = [];
  sensor2s: any[] = [];

  arduino={
    nSensor:"",
    valor:"",
  }

  sensor2={
    nSensor:"",
    estado:"",
  }

  private Servicio: ArduinoService = inject(ArduinoService);

  constructor(private servicio: ArduinoService, private router: Router) {
    this.obtenerarduino(); 
    this.obtenersensor2(); 
  }

  encenderSensor() {
    this.servicio.encenderSensor().subscribe(
      response => {
        console.log(response); // Puedes manejar la respuesta como desees
      },
      error => {
        console.error(error); // Maneja el error si lo hay
      }
    );
  }

  apagarSensor() {
    this.servicio.apagarSensor().subscribe(
      response => {
        console.log(response); // Puedes manejar la respuesta como desees
      },
      error => {
        console.error(error); // Maneja el error si lo hay
      }
    );
  }


  obtenerarduino(){
    this.Servicio.obtenerarduino().subscribe(
      (data: any) => {
        this.arduinos = data.arduinos;
      },
      err=>{
        if(err.error.errores != null){
          alert(err.error.errores[0].msg);
        }else{
          alert(err.error);
        }
      }
    );
  }

  obtenersensor2(){
    this.Servicio.obtenersensor2().subscribe(
      (data: any) => {
        this.sensor2s = data.sensor2s;
      },
      err=>{
        if(err.error.errores != null){
          alert(err.error.errores[0].msg);
        }else{
          alert(err.error);
        }
      }
    );
  }




}

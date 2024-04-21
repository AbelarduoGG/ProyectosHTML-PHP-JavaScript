import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-directivas',
  standalone: true,
  imports: [CommonModule, FormsModule],  //ponemos FormsModulo para nuestro formulario el cual enlazaremos 
  templateUrl: './directivas.component.html',
  styleUrl: './directivas.component.css'
})
export class DirectivasComponent {
  
  //edad = 19;  //declaramos la variable edad para nuestro boton
  edad:number=18; //con el number no podremos asignar letras a la variable

  valor = true;

  puesto = "";    //lo dejamos vacio para realizar un cambio con el formulario

  grado="";

  datos=["Lunes", "Martes", "Miercoles", "Jueves"];

  productos=[{"codigo":1, "nombre":"Laptop","descripcion":"Bonito","precio":10000,"existencia":10},
             {"codigo": 2, "nombre":"Teclado y mouse gamer","descripcion":"Barato","precio":20000,"existencia":8},
             {"codigo": 3, "nombre":"Impresor Laser","descripcion":"Mas barato","precio":30000,"existencia":20},
             {"codigo": 4, "nombre":"SSD 1tb","descripcion":"Mas bonito","precio":5000,"existencia":5},
             {"codigo": 5, "nombre":"USB 128gb","descripcion":"Ambas","precio":6000,"existencia":15}];

  can1="";
  can2="";
  total="";

  // nuestros metodos para llamar y realizar operaciones
  
  suma(){
    if(this.can1 =="" || this.can2==""){
      alert("Los campos deben estar llenos.")
    }else{
      let t = parseFloat(this.can1) + parseFloat(this.can2);
      this.total = t.toString();
    }
  }

  resta(){
    if(this.can1 =="" || this.can2==""){
      alert("Los campos deben estar llenos.")
    }else{
      let t = parseFloat(this.can1) - parseFloat(this.can2);
      this.total = t.toString();
    }
  }

  multiplica(){
    if(this.can1 =="" || this.can2==""){
      alert("Los campos deben estar llenos.")
    }else{
      let t = parseFloat(this.can1) * parseFloat(this.can2);
      this.total = t.toString();
    }
  }

  divide(){
    if(this.can1 =="" || this.can2==""){
      alert("Los campos deben estar llenos.")
    }else{
      let t = parseFloat(this.can1) / parseFloat(this.can2);
      this.total = t.toString();
    }
  }

}

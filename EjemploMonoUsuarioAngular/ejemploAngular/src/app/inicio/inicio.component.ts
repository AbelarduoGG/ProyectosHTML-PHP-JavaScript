import { Component } from '@angular/core';
import { OnInit } from '@angular/core';   //llamamos a hablar la paqueteria

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{    //usamos implementacion (la cual permite sobreescribir metodos y atributos a diferencia de la herencia, la cual te obliga a declararlos)

  ngOnInit(): void {    //utilizamos el metodo ya que es obligatorio en la implementacion
    // alert("Entraste al componente inicio");   //cada vez que entremos al inicio se activara este metodo y mandara la alerta
  }
}

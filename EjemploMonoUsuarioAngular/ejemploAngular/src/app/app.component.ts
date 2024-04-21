//importar las librerisa
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { DirectivasComponent } from './directivas/directivas.component';
import { MenuComponent } from './menu/menu.component';

@Component({ //directiva formada por un json
  selector: 'app-root', //referenciar en otro html
  standalone: true,
  imports: [CommonModule, RouterOutlet, EncabezadoComponent, DirectivasComponent, MenuComponent], //para utilizar las librerias
  templateUrl: './app.component.html',   //referencia a archivo html para el componente
  styleUrl: './app.component.css'       //referencia al css correspondiente al componente
})
export class AppComponent { //referenciar en un ts (timescript)
  title = 'ejemploAngular';      //recibe el titulo de nuestro proyecto
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';
import { IniciosesionService } from '../app/servicios/iniciosesion.service';
import { PiepaginaComponent } from './piepagina/piepagina.component';
import { RouterModule, Router} from '@angular/router';    //agregamos un Router para un redireccionamiento

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EncabezadoComponent, IniciosesionComponent, PiepaginaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InnovateStyle';
  constructor(private router:Router, public serviciologin:IniciosesionService){}  //traemos el servicio de iniciosesion
}

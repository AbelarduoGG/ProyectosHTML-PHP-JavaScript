import { Component } from '@angular/core';
import { RouterModule, Router} from '@angular/router';    //agregamos un Router para un redireccionamiento
import { ArduinoComponent } from '../arduino/arduino.component';
import { InventarioComponent } from '../inventario/inventario.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { IniciosesionService } from '../servicios/iniciosesion.service';
import { UsuariosComponent } from '../usuarios/usuarios.component';

@Component({
  selector: 'app-piepagina',
  standalone: true,
  imports: [RouterModule, 
    ArduinoComponent, 
    InventarioComponent,
    PerfilComponent,
    UsuariosComponent],
  templateUrl: './piepagina.component.html',
  styleUrl: './piepagina.component.css'
})
export class PiepaginaComponent {

  constructor(private router:Router, public serviciologin:IniciosesionService){}  //traemos el servicio de iniciosesion

}
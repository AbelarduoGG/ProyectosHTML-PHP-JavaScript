import { Component } from '@angular/core';
import { RouterModule, Router} from '@angular/router';    //agregamos un Router para un redireccionamiento
import { ArduinoComponent } from '../arduino/arduino.component';
import { InventarioComponent } from '../inventario/inventario.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { IniciosesionService } from '../servicios/iniciosesion.service';
import { UsuariosComponent } from '../usuarios/usuarios.component';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [RouterModule, 
            ArduinoComponent, 
            InventarioComponent,
            PerfilComponent,
            UsuariosComponent],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {

  constructor(private router:Router, public serviciologin:IniciosesionService){}  //traemos el servicio de iniciosesion

}

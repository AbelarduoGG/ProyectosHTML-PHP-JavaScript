// el timescript se encarga de que las rutas funcionen o sean ejecutadas
import { Component } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';
import { ContactoComponent } from '../contacto/contacto.component';
import { DirectivasComponent } from '../directivas/directivas.component';
import { IniciosesionComponent } from '../iniciosesion/iniciosesion.component';
import { RouterModule, Router} from '@angular/router';    //agregamos un Router para un redireccionamiento
import { IniciosesionService } from '../servicios/iniciosesion.service';    //importamos nuestro inicio de sesion

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule,
            InicioComponent,
            ContactoComponent,
            DirectivasComponent,
            IniciosesionComponent], //llamamos a un modulo encargado de la navegacion en la aplicacion y a todos los componentes involucrados en la navegacion 
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router:Router, public serviciologin:IniciosesionService){}    //creamos un constructor a nuestro objeto con la variable router y de tipo Router

  // cerrarsesion(){     //generamos una funcion para cerrar sesion
  //   this.eslogueado = false;    //cambiamos el valor de la variable
  //   this.router.navigate(['/iniciosesion']);    //mandamos a iniciar sesion
  // }

  // login(){
  //   this.eslogueado = true;
  //   this.router.navigate(['/inicio']);
  // }

  eslogueado = false;

}

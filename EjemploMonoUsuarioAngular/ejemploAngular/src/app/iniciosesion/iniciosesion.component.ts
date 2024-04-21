import { Component, inject } from '@angular/core';
// import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IniciosesionService } from '../servicios/iniciosesion.service';    //importamos nuestro servicio
import { Router } from '@angular/router'; //redireccionamiento al inciar sesion

@Component({
  selector: 'app-iniciosesion',
  standalone: true,
  imports: [FormsModule],   //llamamos a nuestro servicio
  templateUrl: './iniciosesion.component.html',
  styleUrl: './iniciosesion.component.css'
})
export class IniciosesionComponent {

  usuario = {
    usuario:"",
    password: ""
  }

  private Serviciologin:IniciosesionService = inject(IniciosesionService);
  // constructor(private Serviciologin: IniciosesionService){}   //declaramos una variable de tipo de nuestro service
  constructor (private router:Router){}   //redireccion al iniciar sesion

  login(){
    this.Serviciologin.login(this.usuario).subscribe(
      res =>{
        // console.log(res.usu_enviar.mensaje);    //mandamos lo que nos llega en el exito de coneccion
        alert(res.usu_enviar.mensaje);     //enviamos un mensaje en caso de exito
        localStorage.setItem("token", res.usu_enviar.jwtoken);    //variable de inicio de sesion. se guardan estos valores al iniciar sesion para el frontend
        this.router.navigate(['/inicio']);  //redireccionamos a inicio para iniciar sesion
        
      },
      err=>{
        // console.log(err);   //mandamos lo que nos llega en la variable de error
        if(err.error.errores != null){
          alert(err.error.errores[0].msg);
        }else{
          alert(err.error)
        }

      }
    );
  }

}//cierre de la clase

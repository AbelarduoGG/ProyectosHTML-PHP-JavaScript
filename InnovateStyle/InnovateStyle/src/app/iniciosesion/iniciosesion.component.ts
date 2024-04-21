import { Component, inject } from '@angular/core';
import { IniciosesionService } from '../servicios/iniciosesion.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciosesion',
  standalone: true,
  imports: [FormsModule],  //para utilizar los ngModel en nuestro html y la variables
  templateUrl: './iniciosesion.component.html',
  styleUrl: './iniciosesion.component.css'
})
export class IniciosesionComponent {

  usuario ={
    correo:"",
    contrasena:"",
    nombre:"",
    apellidop:"",
    apellidom:"",
    direccion:""
  }

  private Serviciologin:IniciosesionService = inject(IniciosesionService);
  
  constructor(private router:Router){}
  // constructor(private Serviciologin : IniciosesionService){} //traemos el servicio para iniciar sesion por el metodo de inyeccion

  login(){
    this.Serviciologin.login(this.usuario).subscribe(
      res=>{
        alert(res.usu_enviar.mensaje);
        localStorage.setItem("token", res.usu_enviar.jwtoken);    //almacenar el token en el back
        localStorage.setItem("nombre", res.usu_enviar.nombre);
        localStorage.setItem("direccion", res.usu_enviar.direccion);
        localStorage.setItem("apellidop", res.usu_enviar.apellidop);
        localStorage.setItem("apellidom", res.usu_enviar.apellidom);
        localStorage.setItem("rol", res.usu_enviar.rol);
        localStorage.setItem("imagen", res.usu_enviar.imagen);

        this.router.navigate(['/verperfil']);     //redireccionamos luego de iniciar sesion
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

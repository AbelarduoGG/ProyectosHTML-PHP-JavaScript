import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';    //importamos el modulo especializado y el cliente para http 
import { Router } from '@angular/router';   //redireccion

@Injectable({
  providedIn: 'root'
})
export class IniciosesionService {

  url = "http://localhost:3000/usuarios/iniciosesion";  //declaramos la url del backend para iniciar sesion

  constructor(private http: HttpClient, private router:Router) { } //traemos la variable http para trabajar co metodos de get, post, delete

  login(usuario:object){    //creamos nuestra funcion guardar
    return this.http.post<any>(this.url, usuario)    //retornamos la funcion de post. Any le obliga a retornar cualquier cosa. Le mandamos la url del proceso y le mandamos el usuario
  }

  eslogueado(){   //revisamos si la variable de sesion ya esta creada
    // if(localStorage.getItem("token")!=null){
    //   return true;
    // }
    // else{
    //   return false;
    // }
    return !!localStorage.getItem("token");  //esto hace lo mismo de arriba que esta comentado
  }

  cerrarsesion(){     //eliminamos la variable de localStorage relacionada a la validacion de inicio de sesion
    //eliminar una sola variable del localstorage
    // localStorage.removeItem("token");

    //elimina todas las variables del localStorage
    localStorage.clear();
    this.router.navigate(['/iniciosesion']);  //redireccionamos al inicio de sesion al cerrar
  }

}//cierre de la clases

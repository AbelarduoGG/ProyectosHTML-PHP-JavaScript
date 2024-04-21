import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';    //traemos el modulo
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class IniciosesionService {

  private url = "http://localhost:3000/usuarios/iniciosesion";       //declaramos la url que usaremos
  private urlcambiarcontrasena = "http://localhost:3000/usuarios/cambiarcontrasena";       //declaramos la url que usaremos

  constructor(private http: HttpClient, private router:Router) { }

  login(usuario:object){    //trabajamos con los metodos get, post, delete
    return this.http.post<any>(this.url, usuario);   //usamos el metodo post para el inicio de sesion
  }  
  
  eslogueado(){     //revisamos si la variable de sesion esta creada
    return !!localStorage.getItem("token");     //en caso de tener el token lleno, se regresa true  
  }

  cerrarsesion(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  privilegiosadministrador(){
    return localStorage.getItem("rol") == "Administrador";
  }

  cambiarcontrasena(usuario: object) {
    const token = localStorage.getItem("token");
    const options = {
      headers: { Authorization: `Bearer ${token}` } // Incluimos el token de autorización en el encabezado
    };
    return this.http.post<any>(this.urlcambiarcontrasena, usuario, options);
  }

}

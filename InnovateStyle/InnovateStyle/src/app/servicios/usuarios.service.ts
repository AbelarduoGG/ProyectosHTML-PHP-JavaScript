import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlagregarusuarios = "http://localhost:3000/usuarios";       //declaramos la url que usaremos
  private urleliminarusuarios = "http://localhost:3000/usuarios/eliminar";
  private urlconsultarusuarios = "http://localhost:3000/usuarios/consultar";
  private urlobtenerusuarios = "http://localhost:3000/usuarios/consultartodo";

  constructor(private http: HttpClient, private router:Router) { }

  agregar(usuario:object){
    return this.http.post<any>(this.urlagregarusuarios, usuario);
  }

  eliminar(usuario:object){
    return this.http.post<any>(this.urleliminarusuarios, usuario);
  }

  consultar(usuario:object){
    return this.http.post<any>(this.urlconsultarusuarios, usuario);
  }

  obtener(){
    return this.http.get<any>(this.urlobtenerusuarios);
  }

}

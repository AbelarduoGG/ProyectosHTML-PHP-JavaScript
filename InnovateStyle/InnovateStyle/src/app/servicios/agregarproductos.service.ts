import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';    //traemos el modulo
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class AgregarproductosService {

  private urlagregarproductos = "http://localhost:3000/inventarios";       //declaramos la url que usaremos
  private urleliminarproductos ="http://localhost:3000/inventarios/eliminar";
  private urlconsultarproductos ="http://localhost:3000/inventarios/consultar";
  private urlmodificarproductos = "http://localhost:3000/inventarios/modificarproducto";
  private urlobtenerproductos = "http://localhost:3000/inventarios/consultartodo";

  constructor(private http: HttpClient, private router:Router) { }

  agregar(inventario:object){
    return this.http.post<any>(this.urlagregarproductos, inventario);
  }

  eliminar(inventario:object){
    return this.http.post<any>(this.urleliminarproductos, inventario);
  }

  consultar(inventario:object){
    return this.http.post<any>(this.urlconsultarproductos, inventario);
  }

  modificar(inventario:object){
    return this.http.post<any>(this.urlmodificarproductos, inventario);
  }

  obtener(){
    return this.http.get<any>(this.urlobtenerproductos);
  }

}

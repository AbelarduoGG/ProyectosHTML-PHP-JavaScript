import { Component, inject } from '@angular/core';
import { AgregarproductosService } from '../servicios/agregarproductos.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [FormsModule, CommonModule],   //para utilizar los ngModel en nuestro html y la variables
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})

export class InventarioComponent {

  terminoBusqueda: string = '';
  productos: any[] = [];
  productosFiltrados: any[] = [];

  buscarProductos() {
    this.productosFiltrados = this.productos.filter(producto => 
      producto.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
  }

  inventario={
    proveedor_id:"",
    nombre:"",
    descripcion:"",
    precio:"",
    cantidad:"",
    imagen1:"",
    imagen2:"",
    imagen3:"",
    categoria:"",
    marca:""
  }

  private Servicio:AgregarproductosService = inject(AgregarproductosService);

  constructor(private servicio: AgregarproductosService, private router: Router) {
    this.obtenerProductos(); // Llama a obtenerProductos directamente en el constructor
  }

  rutaImagen1(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const nombreArchivo = files[0].name;
      this.inventario.imagen1 = nombreArchivo;
    }
  }

  rutaImagen2(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const nombreArchivo = files[0].name;
      this.inventario.imagen2 = nombreArchivo;
    }
  }
  
  rutaImagen3(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const nombreArchivo = files[0].name;
      this.inventario.imagen3 = nombreArchivo;
    }
  }


  agregar(): void {

    // Construir la ruta completa utilizando el nombre de la imagen
    this.inventario.imagen1 = "../../assets/productos/" + this.inventario.imagen1;
    this.inventario.imagen2 = "../../assets/productos/" + this.inventario.imagen2;
    this.inventario.imagen3 = "../../assets/productos/" + this.inventario.imagen3;

    // alert(this.inventario.imagen1)
    
    this.Servicio.agregar(this.inventario).subscribe(
      res=>{
        alert(res.pro_enviar.mensaje);
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

  eliminar(){
    this.Servicio.eliminar(this.inventario).subscribe(
      res=>{
        alert(res.pro_enviar.mensaje);
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

  consultar(){
    this.Servicio.consultar(this.inventario).subscribe(
      res=>{
        alert(res.pro_enviar.mensaje);
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

  modificar(){
    this.Servicio.modificar(this.inventario).subscribe(
      res=>{
        alert(res.pro_enviar.mensaje);
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

  obtenerProductos(){
    this.Servicio.obtener().subscribe(
      (data: any) => {
        this.productos = data.productos;
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

  limpiarCampos() {
    this.inventario.proveedor_id = '';
    this.inventario.nombre = '';
    this.inventario.descripcion = '';
    this.inventario.precio = '';
    this.inventario.cantidad = '';
    this.inventario.imagen1 = '';
    this.inventario.imagen2 = '';
    this.inventario.imagen3 = '';
    this.inventario.categoria = '';
    this.inventario.marca = ''
  }

}

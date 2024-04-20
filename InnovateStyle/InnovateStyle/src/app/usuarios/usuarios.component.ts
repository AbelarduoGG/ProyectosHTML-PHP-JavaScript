import { Component, inject } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],     //para utilizar los ngModel en nuestro html y la variables
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  terminoBusqueda: string = '';
  usuarios: any[] = [];
  correosFiltrados: any[] = [];

  buscarCorreos() {
    this.correosFiltrados = this.usuarios.filter(usuario => 
      usuario.correo.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
  }

  usuario={
    nombre:"",
    apellidop:"",
    apellidom:"",
    correo:"",
    contrasena:"",
    direccion:"",
    imagen:"",
    rol:"",
  }

  private Servicio: UsuariosService = inject(UsuariosService);

  constructor(private servicio: UsuariosService, private router: Router) {
    this.obtenerUsuarios(); // Llama a obtenerProductos directamente en el constructor
  }

  rutaImagen(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const nombreArchivo = files[0].name;
      this.usuario.imagen = nombreArchivo;
    }
  }


  agregar(): void{
    this.usuario.imagen = "../../assets/usuarios/" + this.usuario.imagen;

    this.Servicio.agregar(this.usuario).subscribe(
      res=>{
        alert(res.usu_enviar.mensaje);
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
    this.Servicio.eliminar(this.usuario).subscribe(
      res=>{
        alert(res.usu_enviar.mensaje);
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
    this.Servicio.consultar(this.usuario).subscribe(
      res=>{
        alert(res.usu_enviar.mensaje);
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

  obtenerUsuarios(){
    this.Servicio.obtener().subscribe(
      (data: any) => {
        this.usuarios = data.usuarios;
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
    this.usuario.nombre = '';
    this.usuario.apellidop = '';
    this.usuario.apellidom = '';
    this.usuario.correo = '';
    this.usuario.contrasena = '';
    this.usuario.direccion = '';
    this.usuario.imagen = '';
    this.usuario.rol = ''
  }


}

import { Component, inject } from '@angular/core';
import { IniciosesionService } from '../servicios/iniciosesion.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule],   //para utilizar los ngModel en nuestro html y la variables 
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  usuario={
    correo:"",
    contrasena:"",
  }

  private Serviciocambiardatos:IniciosesionService = inject(IniciosesionService);

  nombre = localStorage.getItem("nombre");
  direccion = localStorage.getItem("direccion");
  apellidop = localStorage.getItem("apellidop");
  apellidom = localStorage.getItem("apellidom");
  imagen = localStorage.getItem("imagen");

  cambiarcontrasena(){
    this.Serviciocambiardatos.cambiarcontrasena(this.usuario).subscribe(
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

  limpiarCampos() {
    this.usuario.correo = '';
    this.usuario.contrasena = '';
  }

}

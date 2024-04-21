import { Routes } from '@angular/router';
import { InventarioComponent } from './inventario/inventario.component';
import { ArduinoComponent } from './arduino/arduino.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const routes: Routes = [
    // estamos utilizando un nombre de variable y apunta a un componente como ruta
    {path: "verperfil", component:PerfilComponent},
    {path: "inventario", component:InventarioComponent},
    {path: "arduino", component:ArduinoComponent},
    {path: "usuario", component:UsuariosComponent},

];

import { Routes } from '@angular/router';
// importamos nuestras rutas
import { InicioComponent } from './inicio/inicio.component';
import { DirectivasComponent } from './directivas/directivas.component';
import { ContactoComponent } from './contacto/contacto.component';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';

export const routes: Routes = [
    // estamos utilizando un nombre de variable y apunta a un componente como ruta
    {path:"inicio", component:InicioComponent},
    {path:"directivas", component:DirectivasComponent},
    {path:"contacto", component:ContactoComponent},
    {path:"iniciosesion", component:IniciosesionComponent}

];

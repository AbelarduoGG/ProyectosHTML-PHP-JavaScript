import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';        //recibe la base de donde se toman los archivos http
import { HttpClientModule } from '@angular/common/http';    //paquete para hacer peticiones clientes-servidor en el archivo http

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule)   //establecemos configuracion cliente-servidor
  ]
};

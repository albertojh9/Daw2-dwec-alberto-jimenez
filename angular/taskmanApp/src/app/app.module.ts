import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoComponent } from './contactos/pages/listado/listado.component';
import { EditarComponent } from './contactos/pages/editar/editar.component';
import { VerComponent } from './contactos/pages/ver/ver.component';
import { ContadorComponent } from './ejemplos/components/contador/contador.component';
import { MenuComponent } from './menu/components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    EditarComponent,
    VerComponent,
    ContadorComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

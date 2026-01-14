import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListadoComponent } from './contactos/pages/listado/listado.component';
import { EditarComponent } from './contactos/pages/editar/editar.component';
import { VerComponent } from './contactos/pages/ver/ver.component';
import { ContadorComponent } from './ejemplos/components/contador/contador.component';
import { MenuComponent } from './menu/components/menu/menu.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { TablaContactosComponent } from './contactos/components/tabla-contactos/tabla-contactos.component';
import { BuscadorComponent } from './shared/components/buscador/buscador.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    EditarComponent,
    VerComponent,
    ContadorComponent,
    MenuComponent,
    DashboardComponent,
    TablaContactosComponent,
    BuscadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    // Para los formularios reactivos
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

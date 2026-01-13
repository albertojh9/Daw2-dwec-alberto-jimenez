import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './contactos/pages/listado/listado.component';
import { EditarComponent } from './contactos/pages/editar/editar.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';

const routes: Routes = [
      {
        // contactos
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        // contactos
        path: 'contactos',
        component: ListadoComponent
      },
      {
        // contactos/editar
        path: 'contactos/editar',
        component: EditarComponent
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

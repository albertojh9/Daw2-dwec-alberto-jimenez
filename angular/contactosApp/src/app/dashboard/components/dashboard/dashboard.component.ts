import { Component } from '@angular/core';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(private dialogService: DialogService) { }

  // Prueba el método mostrarMensaje
  probarAlert() {
    this.dialogService.mostrarMensaje('Este es un mensaje de prueba', 'Información');
  }

  // Prueba el método solicitarConfirmacion
  probarConfirmacion() {
    this.dialogService.solicitarConfirmacion(
      '¿Estás seguro de realizar esta acción?',
      'Confirmar',
      () => {
        console.log('Acción confirmada');
        this.dialogService.mostrarToast('Acción realizada correctamente');
      }
    );
  }

  // Prueba el método mostrarToast
  probarToast() {
    this.dialogService.mostrarToast('¡Notificación toast de prueba!');
  }

}

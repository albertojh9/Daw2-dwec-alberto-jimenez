import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contacto } from '../../interfaces/contacto.interface';
import { DialogComponent } from '../../../shared/services/dialog/dialog.component';

@Component({
  selector: 'app-tabla-contactos',
  templateUrl: './tabla-contactos.component.html'
})
export class TablaContactosComponent {

  constructor(
    private dialogService: DialogComponent // Servicio de diálogos
  ) { }

  /**
   * Lista de contactos
   */
  @Input() contactos: Contacto [] = [];
  @Output() onBorrarContacto: EventEmitter<Number> = new EventEmitter();

  /**
   * Borra el contacto en la posición "indice"
   * 
   * @param indice Posición del contacto en la tabla
   */
  borrarContacto(indice : number) : void {
    this.dialogService.mostrarDialogoConfirmacion(
      "¿Seguro que quiere eliminar el contacto?", 
      "ADVERTENCIA", () => {
          this.onBorrarContacto.emit(this.contactos[indice].id );
      }
    ); 
  }

}

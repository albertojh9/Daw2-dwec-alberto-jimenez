import { Component, OnInit } from '@angular/core';
import { ContactosService } from '../../services/contactos.service';
import { Contacto } from '../../interfaces/contacto.interface';
import { DialogComponent } from '../../../shared/services/dialog/dialog.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {
  
  saludar : boolean = false;
  contactos: Contacto[] = [];


  constructor(
  
    private contactosService: ContactosService, // Servicio de contactos
    private dialogService: DialogComponent // Servicio de diálogos

  ) { }  

  /** Inicializa el  */
  ngOnInit(): void {
        
    this.contactosService.get().subscribe( 
      contactos => {
        this.contactos = contactos      
      }
    );  
  }

  onBusquedaEjecutada( termino: string ) : void {
    this.contactosService.get(termino).subscribe( 
      contactos => {
        this.contactos = contactos      
      }
    );  
  }

  onBorrarContacto( idContacto: Number ) : void {
    
    // Elimina el contacto de la lista local. Así no tiene que refrescar la lista desde el servidor
    this.contactos = this.contactos.filter( contacto => contacto.id !== idContacto );

    // Muestra un Toast indicando que el contacto se ha eliminado
    this.dialogService.mostrarToast("Contacto eliminado correctamente");
  }

}

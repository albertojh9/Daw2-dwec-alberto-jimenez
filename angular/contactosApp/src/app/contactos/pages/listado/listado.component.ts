import { Component, OnInit } from '@angular/core';
import { ContactosService } from '../../services/contactos.service';
import { Contacto } from '../../interfaces/contacto.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {
  
  saludar : boolean = false;
  contactos: Contacto[] = [];


  constructor(
  
    private contactosService: ContactosService // Servicio de contactos

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


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Contacto } from '../interfaces/contacto.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  /**
   * Inicializa el servicio
   * 
   * @param httpClient 
   */
  constructor(
    
    // Cliente HTTP de Angular
    private httpClient: HttpClient

  ) { }

  /**
   * Descarga la lista de contactos
   * 
   * @returns 
   */
  get(filtro : string|null = null): Observable<Contacto[]> {

    if(filtro && filtro.trim().length > 0) {
      return this.httpClient.get<Contacto[]>("http://localhost:3000/contactos?q=" + filtro.trim());
    } else {
      return this.httpClient.get<Contacto[]>("http://localhost:3000/contactos");
    }    
  }

}

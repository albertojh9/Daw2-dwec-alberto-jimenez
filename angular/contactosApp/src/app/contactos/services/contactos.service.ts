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

  /**
   * Obtiene un contacto por su id
   * 
   * @param id Id del contacto
   * @returns Observable con el contacto
   */
  getById(id: number): Observable<Contacto> {
    return this.httpClient.get<Contacto>(`http://localhost:3000/contactos/${id}`);
  }

  /**
   * Crea un nuevo contacto
   * 
   * @param contacto Datos del contacto a crear
   * @returns Observable con el contacto creado
   */
  crear(contacto: Contacto): Observable<Contacto> {
    return this.httpClient.post<Contacto>("http://localhost:3000/contactos", contacto);
  }

  /**
   * Actualiza un contacto existente
   * 
   * @param contacto Datos del contacto a actualizar
   * @returns Observable con el contacto actualizado
   */
  actualizar(contacto: Contacto): Observable<Contacto> {
    return this.httpClient.put<Contacto>(`http://localhost:3000/contactos/${contacto.id}`, contacto);
  }

}

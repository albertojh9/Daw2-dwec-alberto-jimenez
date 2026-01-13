import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo = 'contactosApp';

  numero: number = 0;                 // Este atributo lo vamos a utilizar 
                                      // en un ejemplo

  sumar(v : number) {                 // Un par de métodos de ejemplo
    this.numero++;
  }

  restar(v: number) {
    this.numero--;
  }                                   
}

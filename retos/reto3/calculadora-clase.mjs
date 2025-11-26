// calculadora-clase.mjs - Con soporte para OR bit a bit
'use strict';

export default class Calculadora {
  constructor() {
    this.pantalla = '0';
    this._listener = null;
  }

  // Registra el listener que se llama cuando cambia la pantalla
  setPantallaActualidadListener(fn) {
    this._listener = fn;
  }

  _notificar() {
    if (typeof this._listener === 'function') this._listener(this.pantalla);
  }

  // Obtiene valor actual
  getValor() {
    return this.pantalla;
  }

  // Reemplaza pantalla y notifica
  _setPantalla(valor) {
    this.pantalla = String(valor);
    this._notificar();
  }

  // Añadir dígito (como string) al buffer
  appendDigito(digito) {
    if (this.pantalla === '0') this.pantalla = '';
    this.pantalla += String(digito);
    this._notificar();
  }

  // limpiar pantalla a 0
  clear() {
    this._setPantalla('0');
  }

  // operar con operadores binarios - almacenamos temporales
  setOperacion(op) {
    // guardamos acumulador y operador
    if (this._operando != null && this._operador != null) {
      // encadenar operaciones
      this.equals();
    }
    this._operando = Number(this.pantalla);
    this._operador = op;
    this._setPantalla('0');
  }

  equals() {
    if (this._operador == null) return;
    const b = Number(this.pantalla);
    let res = 0;
    switch (this._operador) {
      case '+': res = this._operando + b; break;
      case '-': res = this._operando - b; break;
      case '*': res = this._operando * b; break;
      case '/':
        if (b === 0) throw new Error('División por cero');
        res = this._operando / b; break;
      case '|': 
        // Operación OR bit a bit
        res = Math.floor(this._operando) | Math.floor(b); 
        break;
      default:
        throw new Error('Operador desconocido');
    }
    this._operando = null;
    this._operador = null;
    this._setPantalla(res);
  }

  // signo
  toggleSign() {
    if (this.pantalla.startsWith('-')) this._setPantalla(this.pantalla.slice(1));
    else this._setPantalla('-' + this.pantalla);
  }

  // porcentaje
  percent() {
    const v = Number(this.pantalla);
    this._setPantalla(v / 100);
  }

  // punto decimal
  addDecimal() {
    if (!this.pantalla.includes('.')) {
      this.pantalla += '.';
      this._notificar();
    }
  }
}

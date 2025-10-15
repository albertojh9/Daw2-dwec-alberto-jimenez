// calculadora.mjs - interfaz que usa Calculadora clase
'use strict';

import Calculadora from './calculadora-clase.mjs';

const calc = new Calculadora();

// elementos UI
const pantalla = document.getElementById('pantalla');
const botonesContainer = document.querySelector('.calculadora');

// mapa de símbolos a funciones cuando se usa delegación
const OPERACIONES = {
  '+': () => calc.setOperacion('+'),
  '-': () => calc.setOperacion('-'),
  'x': () => calc.setOperacion('*'),
  '×': () => calc.setOperacion('*'),
  '\u00F7': () => calc.setOperacion('/'),
  '/': () => calc.setOperacion('/'),
  '=': () => { try { calc.equals(); } catch (e) { calc._setPantalla('ERROR'); } },
};

// listener de pantalla de la calculadora
calc.setPantallaActualidadListener((nuevo) => {
  pantalla.value = nuevo;
});

window.addEventListener('DOMContentLoaded', () => {
  // actualizar pantalla inicial
  pantalla.value = calc.getValor();

  // delegación de eventos: un handler para todos los botones
  botonesContainer.addEventListener('click', (ev) => {
    const btn = ev.target;
    if (btn.tagName !== 'BUTTON') return;
    const txt = btn.innerText.trim();

    // controles especiales
    if (txt === 'AC') { calc.clear(); return; }
    if (txt === '+/-') { calc.toggleSign(); return; }
    if (txt === '%') { calc.percent(); return; }
    if (txt === ',') { calc.addDecimal(); return; }

    // dígitos
    if (/^[0-9]$/.test(txt)) { calc.appendDigito(txt); return; }

    // operador/igual
    if (OPERACIONES[txt]) { OPERACIONES[txt](); return; }
  });
});

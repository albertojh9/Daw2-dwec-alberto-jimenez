"use strict";

const { memo } = require('react');

/** Carga el módulo. Función de node.js para */
const promt = require('prompt-sync')();

/** Contiene el valor actual en la memoria de la calculadora */
let pantalla = 0;

/** Permite almacenar el valor actual de la pantalla de la calculadora */
let memoria = 0;

let fin = false;
while(!fin) {

    //Mostrar el valor de la pantalla
    console.log('Pantalla'+ pantalla);

    //Mostrar el menú
    mostrarMenu();

    //Leer la entrada del usuario
    let operación = promt('Introduce la operación')

    //Ejecutar la operación
    pantalla = ejecutarOperacion(pantalla, operación);    
}

function mostrarMenu() {
    console.log('C -> pone la pantalla a cero')
    console.log('M -> guarda el valor en memoria')
    console.log('R -> recupera el valor en memoria')
    console.log('+*-/ -> hace la operación')
}

/**
 * 
 * @param {*} operación 
 */

function ejecutarOperacion(pantalla, operación){

    let resultado = pantalla
    let operando2 = 0;

    switch(operación){
        case 'C':
            resultado = 0;
            break;
        case 'M':
            memoria = pantalla;
            break;
        case 'R':
            resultado = memoria;
            memoria = 0;
            break;
        case '+':
            operando2 = Number (promt("Introduce operando : "));
            resultado += operando2
            break;

        default:
            console.log("Operación no soportada");
            break;



    }

    return resultado;
}
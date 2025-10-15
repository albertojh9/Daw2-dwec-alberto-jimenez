//------------------------------------------------
// Dependencias
//------------------------------------------------



//------------------------------------------------
// Variables globales
//------------------------------------------------
const pantallaCalculadora = document.getElementById("input");
let operando1 = 0;
let operando2 = 0;
let operador = null;


window.addEventListener("load", () => {
    
   
    //Obtengo el array de botones
    const botones  = document.querySelectorAll(".calculadora button");

    //Recorro el array de botones
    for (let boton of botones) {
        //A cada botón le asigno el evento click
        boton.addEventListener("click", onBotonClick);
    }

});


//------------------------------------------------
// Eventos
//------------------------------------------------

/**
 * Proceso el evento click de un botón de la calculadora
 * @param {*} evento
 */
function onBotonClick(evento) {

    //Referencia al boton sobre el que se ha hecho click
    const boton = evento.target;

    //Obtengo el texto del botón
    const textoBoton = boton.innerText;

    //Proceso el botón
    // Dígitos
    if ("0123456789".includes(textoBoton)) {
        pantallaCalculadora.value += textoBoton;

    // Operadores: + - x ÷ (mapeamos símbolos a operadores internos)
    } else if (textoBoton === '+' || textoBoton === '-' || textoBoton === 'x' || textoBoton === '×' || textoBoton === '÷' || textoBoton === '/' ) {
        // Mapear símbolos
        let op = textoBoton;
        if (op === 'x' || op === '×') op = '*';
        if (op === '÷') op = '/';

        // Guardar la operación
        operando1 = Number(pantallaCalculadora.value || 0);
        operador = op;

        // Limpiar la pantalla para introducir segundo operando
        pantallaCalculadora.value = "";

    // Igual
    } else if (textoBoton === '=' || textoBoton === '="') {
        // Guardar segundo operando
        operando2 = Number(pantallaCalculadora.value || 0);

        // Realizar la operación
        const resultado = operar(operando1, operando2, operador);
        pantallaCalculadora.value = resultado;

    // AC - limpiar todo
    } else if (textoBoton === 'AC') {
        pantallaCalculadora.value = '';
        operando1 = 0;
        operando2 = 0;
        operador = null;

    // Cambio de signo
    } else if (textoBoton === '+/-') {
        const val = Number(pantallaCalculadora.value || 0);
        pantallaCalculadora.value = String(-val);

    // Porcentaje: convertir el valor actual en porcentaje
    } else if (textoBoton === '%') {
        const val = Number(pantallaCalculadora.value || 0);
        pantallaCalculadora.value = String(val / 100);

    // Coma decimal (se usa punto internamente)
    } else if (textoBoton === ',') {
        if (!pantallaCalculadora.value.includes('.')) {
            if (pantallaCalculadora.value === '') pantallaCalculadora.value = '0.';
            else pantallaCalculadora.value += '.';
        }
    }

}

//------------------------------------------------
// Funciones de utilidad
//------------------------------------------------
function operar (operando1, operando2, operador) {
    let resultado = 0;
    switch(operador) {

        case "+":
            resultado = operando1 + operando2;
            break;
        case "-":
            resultado = operando1 - operando2;
            break;
        case "*":
            resultado = operando1 * operando2;
            break;
        case "/":
            if (operando2 === 0) {
                return 'ERROR';
            }
            resultado = operando1 / operando2;
            break;

    }
    return resultado;
}
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
    if("0123456789".includes(textoBoton)) {
        pantallaCalculadora.value += textoBoton;

    }else if("+-*/".includes(textoBoton)) {
        //Guardar la operación
        operando1 = Number(pantallaCalculadora.value);
        operador = textoBoton;

        //Limpiar la pantalla
        pantallaCalculadora.value = "";

    } else if(textoBoton === "=") {
        //Guardo el segundo operando
        operando2 = Number(pantallaCalculadora.value);

        //Realizo la operación
        const resultado = operar(operando1, operando2, operador);
        pantallaCalculadora.value = resultado;

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

    }
    return resultado;
}
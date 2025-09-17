"use strict";

const prompt = require('prompt-sync')();
let numero_intentos = 5;
let valor_maximo = 10;

const numero_secreto = Math.floor(Math.random() * (valor_maximo + 1));

let acierto = false;

for (let i = 1; i <= numero_intentos; i++) {
  let intento = parseInt(prompt(`Intento ${i}/${numero_intentos}: Adivina un número entre 0 y ${valor_maximo}`));

  if (intento === numeroSecreto) {
    alert("¡Enorabuena! El número secreto era " + numero_secreto);
    acierto = true;
    break;
  } else if (intento > numero_secreto) {
    alert("El número secreto es MENOR");
  } else {
    alert("El número secreto es MAYOR");
  }
}

if (!acierto) {
  alert("Se acabaron los intentos. El número secreto era " + numero_secreto);
}
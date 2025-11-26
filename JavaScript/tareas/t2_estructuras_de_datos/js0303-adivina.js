// Juego de aciertos numéricos
// Programa que genera números aleatorios y verifica aciertos del usuario

"use strict";

const prompt = require('prompt-sync')();

// Configuración del juego
const LIMITE_SUPERIOR = 20;        // Rango: 0 a 20
const CANTIDAD_GENERADOS = 10;      // Números que genera el sistema
const CANTIDAD_USUARIO = 5;         // Números que debe introducir el usuario

// Array para los números generados por el sistema
let numerosDelSistema = [];

// Generación de números aleatorios (0 a 20)
console.log("Generando números aleatorios...");
// Bucle while: continúa hasta generar 10 números aleatorios
while (numerosDelSistema.length < CANTIDAD_GENERADOS) {
    let numeroRandom = Math.floor(Math.random() * (LIMITE_SUPERIOR + 1));
    numerosDelSistema.push(numeroRandom);
}

console.log("Números generados:", numerosDelSistema);

// Array para almacenar las entradas del usuario
let entradasUsuario = [];

// Solicitar números al usuario
console.log(`\nIntroduce ${CANTIDAD_USUARIO} números entre 0 y ${LIMITE_SUPERIOR}:`);
let contador = 1;
// Bucle while: pide exactamente 5 números al usuario
while (contador <= CANTIDAD_USUARIO) {
    let entrada = parseInt(prompt(`Número ${contador}: `));
    entradasUsuario.push(entrada);
    contador++;
}

// Variables para contar y almacenar aciertos
let totalAciertos = 0;
let listaDeAciertos = [];

// Verificar cada número del usuario contra los generados
entradasUsuario.forEach(function(numeroUsuario) {
    // If: verifica si el número está en los generados Y no está ya contado
    if (numerosDelSistema.includes(numeroUsuario) && !listaDeAciertos.includes(numeroUsuario)) {
        listaDeAciertos.push(numeroUsuario);
        totalAciertos++;
    }
});

// Mostrar resultados finales
console.log("\n=== RESULTADOS DEL JUEGO ===");
console.log("Total de aciertos: " + totalAciertos);

// If: mostrar lista de aciertos solo si hay alguno
if (listaDeAciertos.length > 0) {
    console.log("Números que acertaste: " + listaDeAciertos);
} else {
    console.log("No acertaste ningún número");
}
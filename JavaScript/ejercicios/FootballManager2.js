"use strict";

const readline = require('readline-sync');

const equipo = {};

// === Primera parte: Introducir jugadores ===
console.log('=== Configuración del equipo ===');

while (true) {
    const input = readline.question('Introduce número y nombre del jugador (o pulsa Enter para terminar): ');
    if (input.trim() === '') break;

    const partes = input.split(',');
    if (partes.length !== 2) {
        console.log('Formato incorrecto. Usa "número,nombre".');
        continue;
    }

    const numero = parseInt(partes[0].trim());
    const nombre = partes[1].trim();

    if (isNaN(numero)) {
        console.log('Número no válido.');
        continue;
    }

    equipo[numero] = nombre;
}

console.log('\nConfiguración del equipo completada.\n');

// === Segunda parte: Consultar jugadores ===
console.log('=== Consulta de jugadores ===');

while (true) {
    const input = readline.question('Introduce el número del jugador a consultar (0 para salir): ');
    const numero = parseInt(input.trim());

    if (numero === 0) {
        console.log('¡Hasta luego!');
        break;
    }

    if (equipo[numero]) {
        console.log(`El jugador con número ${numero} es ${equipo[numero]}\n`);
    } else {
        console.log(`No existe jugador con número ${numero}\n`);
    }
}
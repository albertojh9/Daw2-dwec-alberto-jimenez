// Juego de adivinanza de números
// El usuario debe adivinar un número aleatorio en máximo 5 intentos

// Importar prompt para entrada de datos
const prompt = require('prompt-sync')();

// Constantes del juego
const MAXIMO = 100;                    // Límite superior (0-99)
const TOTAL_INTENTOS = 5;              // Intentos permitidos
const NUMERO_OBJETIVO = Math.floor(Math.random() * MAXIMO);  // Número a adivinar

// Variables de control
let haGanado = false;          // Si ya adivinó
let contadorIntentos = 0;      // Intentos usados

// Mostrar información inicial
console.log("¡Empezemos! Adivina el número entre 0 y " + (MAXIMO - 1));
console.log("Tienes " + TOTAL_INTENTOS + " intentos para acertar");

// Bucle principal: mientras tenga intentos y no haya ganado
while (contadorIntentos < TOTAL_INTENTOS && !haGanado) {
    
    // Incrementar contador antes de cada intento
    contadorIntentos++;
    
    // Pedir número al usuario
    const numeroUsuario = parseInt(prompt("Turno " + contadorIntentos + " - Tu número: "));
    
    // Evaluar el intento del usuario
    if (numeroUsuario === NUMERO_OBJETIVO) {
        // Si acierta: mostrar felicitación y marcar como ganado
        console.log("¡Genial! Lo has conseguido en " + contadorIntentos + " intentos");
        haGanado = true; // Esto hace que salga del bucle
    } else if (numeroUsuario > NUMERO_OBJETIVO) {
        // Si es mayor: dar pista para que baje
        console.log("Demasiado alto, prueba con uno menor");
    } else {
        // Si es menor: dar pista para que suba
        console.log("Demasiado bajo, prueba con uno mayor");
    }
}

// Mensaje si no adivinó
if (!haGanado) {
    console.log("¡Ups! Se acabaron los intentos. El número era: " + NUMERO_OBJETIVO);
}

// CONSTANTES del juego
const MAX_INTENTOS = 3;      // Número de intentos
const VALOR_MAXIMO = 10;     // Valor máximo

// Generar número aleatorio entre 0 y VALOR_MAXIMO (incluyendo ambos)
const numeroSecreto = Math.floor(Math.random() * (VALOR_MAXIMO + 1));

// Variables de control
let intentosRealizados = 0;
let adivinado = false;

// Bucle principal del juego
while (intentosRealizados < MAX_INTENTOS && !adivinado) {
    intentosRealizados++;
    
    // Solicitar número usando prompt
    let entrada = prompt(`Intento ${intentosRealizados} de ${MAX_INTENTOS}\nAdivina el número entre 0 y ${VALOR_MAXIMO}:`);
    
    // Convertir entrada a número
    let numeroUsuario = parseInt(entrada);
    
    // Validar entrada
    if (isNaN(numeroUsuario)) {
        alert("Por favor, introduce un número válido");
        intentosRealizados--; // No contar este intento
        continue;
    }
    
    // Comprobar el número
    if (numeroUsuario === numeroSecreto) {
        // Número correcto
        adivinado = true;
        alert(`¡CORRECTO! Has adivinado el número ${numeroSecreto} en ${intentosRealizados} intento${intentosRealizados > 1 ? 's' : ''}`);
    } else if (numeroUsuario > numeroSecreto) {
        // El número es mayor
        alert(`El número secreto es MENOR que ${numeroUsuario}`);
    } else {
        // El número es menor
        alert(`El número secreto es MAYOR que ${numeroUsuario}`);
    }
}

// Mensaje final si no se adivinó
if (!adivinado) {
    alert(`Game Over. Has agotado los ${MAX_INTENTOS} intentos.\nEl número secreto era: ${numeroSecreto}`);
}
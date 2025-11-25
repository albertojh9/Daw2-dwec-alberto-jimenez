const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// CONSTANTES del juego
const MAX_INTENTOS = 3;      // Número de intentos
const VALOR_MAXIMO = 10;     // Valor máximo

// Generar número aleatorio entre 0 y VALOR_MAXIMO (incluyendo ambos)
const numeroSecreto = Math.floor(Math.random() * (VALOR_MAXIMO + 1));

// Variables de control
let intentosRealizados = 0;
let adivinado = false;

// Función para pedir número
function pedirNumero() {
    if (intentosRealizados >= MAX_INTENTOS || adivinado) {
        // Mensaje final si no se adivinó
        if (!adivinado) {
            console.log(`Game Over. Has agotado los ${MAX_INTENTOS} intentos.\nEl número secreto era: ${numeroSecreto}`);
        }
        rl.close();
        return;
    }
    
    intentosRealizados++;
    rl.question(`Intento ${intentosRealizados} de ${MAX_INTENTOS}\nAdivina el número entre 0 y ${VALOR_MAXIMO}: `, (entrada) => {
        // Convertir entrada a número
        let numeroUsuario = parseInt(entrada);
        
        // Validar entrada
        if (isNaN(numeroUsuario)) {
            console.log("Por favor, introduce un número válido");
            intentosRealizados--; // No contar este intento
            return pedirNumero();
        }
        
        // Comprobar el número
        if (numeroUsuario === numeroSecreto) {
            // Número correcto
            adivinado = true;
            console.log(`¡CORRECTO! Has adivinado el número ${numeroSecreto} en ${intentosRealizados} intento${intentosRealizados > 1 ? 's' : ''}`);
        } else if (numeroUsuario > numeroSecreto) {
            // El número es mayor
            console.log(`El número secreto es MENOR que ${numeroUsuario}`);
        } else {
            // El número es menor
            console.log(`El número secreto es MAYOR que ${numeroUsuario}`);
        }
        
        pedirNumero();
    });
}

// Iniciar juego
pedirNumero();
// Constantes del juego
const NUMERO_INTENTOS = 3;
const VALOR_MAXIMO = 10;

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Generar número secreto
const numeroSecreto = Math.floor(Math.random() * (VALOR_MAXIMO + 1));
let intentosRestantes = NUMERO_INTENTOS;

console.log(`¡Bienvenido al juego de adivinar el número!`);
console.log(`Tienes ${intentosRestantes} intentos para adivinar un número entre 0 y ${VALOR_MAXIMO}`);

function hacerPregunta() {
    if (intentosRestantes <= 0) {
        console.log(`¡Se te acabaron los intentos! El número secreto era ${numeroSecreto}.`);
        rl.close();
        return;
    }

    rl.question(`Intento ${NUMERO_INTENTOS - intentosRestantes + 1}/${NUMERO_INTENTOS}. Introduce un número: `, (input) => {
        const numeroUsuario = parseInt(input);

        if (isNaN(numeroUsuario) || numeroUsuario < 0 || numeroUsuario > VALOR_MAXIMO) {
            console.log(`Por favor, introduce un número válido entre 0 y ${VALOR_MAXIMO}.`);
            hacerPregunta();
            return;
        }

        if (numeroUsuario === numeroSecreto) {
            console.log(`¡Felicidades! ¡Has adivinado el número ${numeroSecreto}!`);
            rl.close();
        } else {
            intentosRestantes--;
            
            if (numeroUsuario > numeroSecreto) {
                console.log(`El número secreto es MENOR que ${numeroUsuario}.`);
            } else {
                console.log(`El número secreto es MAYOR que ${numeroUsuario}.`);
            }
            
            if (intentosRestantes > 0) {
                console.log(`Te quedan ${intentosRestantes} intentos.\n`);
                hacerPregunta();
            } else {
                console.log(`¡Se te acabaron los intentos! El número secreto era ${numeroSecreto}.`);
                rl.close();
            }
        }
    });
}

// Iniciar el juego
hacerPregunta();
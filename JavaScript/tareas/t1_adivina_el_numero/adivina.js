// Constantes del juego
const MAX_INTENTOS = 5;
const VALOR_MAXIMO = 10;

// Generar número aleatorio entre 1 y VALOR_MAXIMO
const numeroSecreto = Math.floor(Math.random() * VALOR_MAXIMO) + 1;

// Configurar readline
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let intento = 1;

console.log(`\n¡Adivina el número entre 1 y ${VALOR_MAXIMO}!\n`);

// Función para jugar (recursiva)
function jugar() {
    // Verificar si se acabaron los intentos
    if (intento > MAX_INTENTOS) {
        console.log(`\n Game Over. El número era ${numeroSecreto}\n`);
        return readline.close();
    }

    // Solicitar número al usuario
    readline.question(`Intento ${intento}/${MAX_INTENTOS}. Adivina el número (1-${VALOR_MAXIMO}): `, (respuesta) => {
        const numeroUsuario = parseInt(respuesta);
        
        // Comprobar si ha acertado
        if (numeroUsuario === numeroSecreto) {
            console.log(`\n ¡Correcto! El número era ${numeroSecreto}. Lo adivinaste en ${intento} intentos.\n`);
            return readline.close();
        }
        
        // Indicar si el número es mayor o menor
        console.log(numeroUsuario > numeroSecreto ? "El número secreto es MENOR" : "El número secreto es MAYOR");
        
        // Incrementar intento y continuar jugando
        intento++;
        jugar();
    });
}

// Iniciar el juego
jugar();
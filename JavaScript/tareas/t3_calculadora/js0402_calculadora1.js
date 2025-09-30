const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Variables globales
let pantalla = 0;
let memoria = 0;

// Funciones de operaciones
function sumar(valor) { pantalla += valor; }
function restar(valor) { pantalla -= valor; }
function multiplicar(valor) { pantalla *= valor; }
function dividir(valor) { pantalla /= valor; }
function modulo(valor) { pantalla %= valor; }
function potencia(valor) { 
    rl.question("Introduce el exponente: ", (exp) => {
        pantalla = Math.pow(pantalla, parseFloat(exp));
        console.log("Pantalla:", pantalla);
        menu();
    });
    return true; // Para evitar volver a menu inmediatamente
}
function factorial() {
    if (pantalla < 0 || !Number.isInteger(pantalla)) {
        console.log("Factorial solo definido para enteros no negativos");
    } else {
        let fact = 1;
        for (let i = 1; i <= pantalla; i++) fact *= i;
        pantalla = fact;
    }
}
function guardarMemoria() { memoria = pantalla; }
function recuperarMemoria() { pantalla = memoria; }
function reset() { pantalla = 0; memoria = 0; }

// Menú principal
function menu() {
    console.log("\nPantalla:", pantalla, " | Memoria:", memoria);
    console.log("Operaciones: + - * / % ! ^ M R C (C=reset) S=saliR");
    
    rl.question("Introduce operación: ", (op) => {
        let requiereValor = ["+", "-", "*", "/", "%"].includes(op);

        if (op === "S" || op === "s") {
            console.log("Saliendo...");
            rl.close();
            return;
        } else if (op === "!" ) {
            factorial();
        } else if (op === "^") {
            if (potencia()) return; // La función potencia maneja el menú
        } else if (op === "M") {
            guardarMemoria();
        } else if (op === "R") {
            recuperarMemoria();
        } else if (op === "C") {
            reset();
        } else if (requiereValor) {
            rl.question("Introduce valor: ", (val) => {
                let numero = parseFloat(val);
                switch(op) {
                    case "+": sumar(numero); break;
                    case "-": restar(numero); break;
                    case "*": multiplicar(numero); break;
                    case "/": dividir(numero); break;
                    case "%": modulo(numero); break;
                }
                menu();
            });
            return; // Evitar ejecutar menu dos veces
        } else {
            console.log("Operación no reconocida");
        }

        menu(); // Volver al menú después de la operación
    });
}

// Programa de prueba
function programaPrueba() {
    console.log("=== Programa de prueba ===");
    pantalla = 5; console.log("Pantalla inicial:", pantalla);
    sumar(3); console.log("Suma 3 ->", pantalla);
    restar(2); console.log("Resta 2 ->", pantalla);
    multiplicar(4); console.log("Multiplica por 4 ->", pantalla);
    dividir(3); console.log("Divide por 3 ->", pantalla);
    modulo(5); console.log("Modulo 5 ->", pantalla);
    factorial(); console.log("Factorial ->", pantalla);
    pantalla = 2; potencia(); // Se pedirá exponente
    guardarMemoria(); console.log("Memoria guardada ->", memoria);
    reset(); console.log("Reset -> Pantalla:", pantalla, "Memoria:", memoria);
    recuperarMemoria(); console.log("Recuperar memoria -> Pantalla:", pantalla);
    
    console.log("=== Fin programa de prueba ===\n");
    menu(); // Empezar menú interactivo
}

// Ejecutar programa de prueba
programaPrueba();

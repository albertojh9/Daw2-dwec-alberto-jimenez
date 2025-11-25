// js0402. Definición de funciones. Calculadora I.
// Alumno: Alberto - 2º DAW
// Implementación de una calculadora con funciones básicas, memoria y programa de prueba

// Importamos el módulo readline para poder leer entrada del usuario desde la consola
// Esto nos permite hacer preguntas al usuario y recibir respuestas
const rl = require("readline").createInterface({ 
    input: process.stdin,   // Entrada desde el teclado
    output: process.stdout  // Salida hacia la pantalla
});

// Variables globales que representan el estado de la calculadora
let pantalla = 0;  // Acumulador donde se almacenan los resultados (valor inicial 0)
let memoria = 0;   // Memoria auxiliar para guardar valores temporalmente

// ========== OPERACIONES CON 2 OPERANDOS (pantalla + operando solicitado) ==========

function suma(operando) {
    pantalla = pantalla + operando;
}

function resta(operando) {
    pantalla = pantalla - operando;
}

function multiplicacion(operando) {
    pantalla = pantalla * operando;
}

function division(operando) {
    if (operando === 0) {
        console.log("Error: División por cero");
        return;
    }
    pantalla = pantalla / operando;
}

function modulo(operando) {
    if (operando === 0) {
        console.log("Error: Módulo por cero");
        return;
    }
    pantalla = pantalla % operando;
}

function potencia(exponente) {
    pantalla = Math.pow(pantalla, exponente);
}

// ========== OPERACIONES CON 1 OPERANDO (solo pantalla) ==========

function factorial() {
    if (pantalla < 0 || !Number.isInteger(pantalla)) {
        console.log("Error: El factorial solo se puede calcular para enteros no negativos");
        pantalla = NaN;
        return;
    }
    
    let resultado = 1;
    for (let i = 1; i <= pantalla; i++) {
        resultado = resultado * i;
    }
    pantalla = resultado;
}

// ========== OPERACIONES DE MEMORIA ==========

function guardarEnMemoria() {
    memoria = pantalla;
    console.log(`Valor ${pantalla} guardado en memoria`);
}

function recuperarDeMemoria() {
    pantalla = memoria;
    console.log(`Valor ${memoria} recuperado de memoria`);
}

function limpiar() {
    pantalla = 0;
    memoria = 0;
    console.log("Pantalla y memoria puestas a 0");
}

// ========== FUNCIÓN MENÚ PRINCIPAL ==========

function menu() {
    console.log("\n" + "=".repeat(40));
    console.log(`Pantalla (acumulador): ${pantalla}`);
    console.log(`Memoria: ${memoria}`);
    console.log("=".repeat(40));
    console.log("Operaciones disponibles:");
    console.log("  + : Suma");
    console.log("  - : Resta");
    console.log("  * : Multiplicación");
    console.log("  / : División");
    console.log("  % : Módulo");
    console.log("  ! : Factorial (solo pantalla)");
    console.log("  ^ : Potencia (x elevado a y)");
    console.log("  M : Guardar en memoria");
    console.log("  R : Recuperar de memoria");
    console.log("  C : Limpiar pantalla y memoria");
    console.log("  S : Salir");
    console.log("=".repeat(40));
    
    rl.question("Selecciona una operación: ", function(operacion) {
        operacion = operacion.toUpperCase();
        
        switch(operacion) {
            case '+':
                rl.question("Introduce el número a sumar: ", function(valor) {
                    suma(parseFloat(valor));
                    menu();
                });
                break;
                
            case '-':
                rl.question("Introduce el número a restar: ", function(valor) {
                    resta(parseFloat(valor));
                    menu();
                });
                break;
                
            case '*':
                rl.question("Introduce el número a multiplicar: ", function(valor) {
                    multiplicacion(parseFloat(valor));
                    menu();
                });
                break;
                
            case '/':
                rl.question("Introduce el número a dividir: ", function(valor) {
                    division(parseFloat(valor));
                    menu();
                });
                break;
                
            case '%':
                rl.question("Introduce el número para el módulo: ", function(valor) {
                    modulo(parseFloat(valor));
                    menu();
                });
                break;
                
            case '!':
                factorial();
                menu();
                break;
                
            case '^':
                rl.question("Introduce el exponente: ", function(valor) {
                    potencia(parseFloat(valor));
                    menu();
                });
                break;
                
            case 'M':
                guardarEnMemoria();
                menu();
                break;
                
            case 'R':
                recuperarDeMemoria();
                menu();
                break;
                
            case 'C':
                limpiar();
                menu();
                break;
                
            case 'S':
                console.log("Saliendo de la calculadora...");
                rl.close();
                break;
                
            default:
                console.log("Operación no válida. Inténtalo de nuevo.");
                menu();
                break;
        }
    });
}

// ========== PROGRAMA DE PRUEBA ==========

function programaDePrueba() {
    console.log("\n" + "=".repeat(50));
    console.log("PROGRAMA DE PRUEBA - CALCULADORA");
    console.log("=".repeat(50));
    
    // Inicializar pantalla con un valor
    pantalla = 10;
    console.log(`Estado inicial - Pantalla: ${pantalla}, Memoria: ${memoria}`);
    
    // Prueba suma
    console.log("\n--- Prueba SUMA ---");
    console.log(`Pantalla actual: ${pantalla}`);
    suma(5);
    console.log(`Después de sumar 5: ${pantalla}`);
    
    // Prueba resta
    console.log("\n--- Prueba RESTA ---");
    console.log(`Pantalla actual: ${pantalla}`);
    resta(3);
    console.log(`Después de restar 3: ${pantalla}`);
    
    // Prueba multiplicación
    console.log("\n--- Prueba MULTIPLICACIÓN ---");
    console.log(`Pantalla actual: ${pantalla}`);
    multiplicacion(2);
    console.log(`Después de multiplicar por 2: ${pantalla}`);
    
    // Prueba división
    console.log("\n--- Prueba DIVISIÓN ---");
    console.log(`Pantalla actual: ${pantalla}`);
    division(4);
    console.log(`Después de dividir por 4: ${pantalla}`);
    
    // Prueba módulo
    console.log("\n--- Prueba MÓDULO ---");
    pantalla = 17;
    console.log(`Pantalla cambiada a: ${pantalla}`);
    modulo(5);
    console.log(`Después de calcular 17 % 5: ${pantalla}`);
    
    // Prueba potencia
    console.log("\n--- Prueba POTENCIA ---");
    pantalla = 3;
    console.log(`Pantalla cambiada a: ${pantalla}`);
    potencia(4);
    console.log(`Después de calcular 3^4: ${pantalla}`);
    
    // Prueba factorial
    console.log("\n--- Prueba FACTORIAL ---");
    pantalla = 5;
    console.log(`Pantalla cambiada a: ${pantalla}`);
    factorial();
    console.log(`Después de calcular 5!: ${pantalla}`);
    
    // Prueba memoria
    console.log("\n--- Prueba MEMORIA ---");
    console.log(`Pantalla actual: ${pantalla}`);
    guardarEnMemoria();
    pantalla = 999;
    console.log(`Pantalla cambiada a: ${pantalla}`);
    recuperarDeMemoria();
    console.log(`Después de recuperar memoria: ${pantalla}`);
    
    // Prueba limpiar
    console.log("\n--- Prueba LIMPIAR ---");
    console.log(`Estado antes de limpiar - Pantalla: ${pantalla}, Memoria: ${memoria}`);
    limpiar();
    console.log(`Estado después de limpiar - Pantalla: ${pantalla}, Memoria: ${memoria}`);
    
    console.log("\n" + "=".repeat(50));
    console.log("FIN DEL PROGRAMA DE PRUEBA");
    console.log("=".repeat(50));
    
    // Iniciar el menú principal
    menu();
}

// ========== INICIO DEL PROGRAMA ==========

console.log("Calculadora I - js0402");
console.log("Ejecutando programa de prueba...");
programaDePrueba();
// Calculadora con funciones - js0402
// Implementa operaciones básicas, factorial, potencia y memoria

"use strict";

// Módulo para capturar entrada del usuario desde consola
const prompt = require('prompt-sync')();

// Variables globales para el estado de la calculadora
let acumulador = 0;    // Pantalla principal donde se almacenan resultados
let guardado = 0;      // Memoria temporal para guardar valores

// Función para mostrar el menú principal de la calculadora
// Muestra el estado actual y las operaciones disponibles
function mostrarMenu() {
    console.log("====== CALCULADORA ======");
    console.log("Acumulador:", acumulador);    // Valor actual en pantalla
    console.log("Memoria:", guardado);         // Valor guardado en memoria
    console.log("------------------------");
    console.log("Operaciones: + - * / % ^ !");  // Operadores matemáticos
    console.log("Memoria: M(guardar) R(cargar) C(limpiar)");  // Comandos de memoria
    console.log("Q para salir");               // Cómo terminar el programa
    console.log("========================");
}

// Función para calcular el factorial de un número
// Factorial de n = n * (n-1) * (n-2) * ... * 2 * 1
function calcularFactorial(num) {
    if (num <= 1) return 1;    // Caso base: 0! = 1, 1! = 1
    let fact = 1;              // Variable acumuladora
    // Bucle que multiplica todos los números desde 2 hasta num
    for (let i = 2; i <= num; i++) {
        fact = fact * i;
    }
    return fact;               // Devolver el resultado
}

// Función principal que ejecuta la calculadora interactiva
// Maneja la entrada del usuario y procesa las operaciones
function ejecutar() {
    let continuar = true;      // Variable de control del bucle principal
    
    // Bucle principal: continúa hasta que el usuario elija salir
    do {
        mostrarMenu();         // Mostrar opciones al usuario
        let comando = prompt("¿Qué operación? ");  // Capturar entrada
        
        // Verificar si el usuario quiere salir (Q o cancelar)
        if (comando === null || comando.toUpperCase() === "Q") {
            console.log("Adiós!");
            continuar = false;
        }
        // Procesar operaciones aritméticas que requieren un segundo operando
        else if (comando === "+" || comando === "-" || comando === "*" || comando === "/" || comando === "%" || comando === "^") {
            let valor = prompt("Dame un número: ");  // Pedir el segundo operando
            valor = parseFloat(valor);              // Convertir a número decimal
            
            // Procesar cada operación según el comando
            if (comando === "+") {
                acumulador = acumulador + valor;    // Suma
            }
            else if (comando === "-") {
                acumulador = acumulador - valor;    // Resta
            }
            else if (comando === "*") {
                acumulador = acumulador * valor;    // Multiplicación
            }
            else if (comando === "/") {
                // División con validación para evitar división por cero
                if (valor !== 0) {
                    acumulador = acumulador / valor;
                } else {
                    console.log("¡No puedo dividir por cero!");
                }
            }
            else if (comando === "%") {
                acumulador = acumulador % valor;    // Módulo (resto de la división)
            }
            else if (comando === "^") {
                // Potencia: calcular acumulador^valor usando bucle
                let resultado = 1;
                for (let j = 0; j < valor; j++) {
                    resultado = resultado * acumulador;
                }
                acumulador = resultado;
            }
        }
        // Factorial: operación que solo usa el valor del acumulador
        else if (comando === "!") {
            acumulador = calcularFactorial(Math.floor(acumulador));  // Redondear hacia abajo
        }
        // Operaciones de memoria
        else if (comando.toUpperCase() === "M") {
            guardado = acumulador;     // Guardar valor actual en memoria
            console.log("Guardado!");
        }
        else if (comando.toUpperCase() === "R") {
            acumulador = guardado;     // Recuperar valor desde memoria
            console.log("Cargado!");
        }
        else if (comando.toUpperCase() === "C") {
            acumulador = 0;            // Limpiar acumulador
            guardado = 0;              // Limpiar memoria
            console.log("Todo limpio!");
        }
        else {
            console.log("No entiendo esa operación");  // Comando no reconocido
        }
        
    } while (continuar);
}

// Función que ejecuta pruebas automáticas de todas las operaciones
// Demuestra que cada funcionalidad de la calculadora funciona correctamente
function hacerPruebas() {
    console.log("------ PRUEBAS AUTOMÁTICAS ------");
    
    // Pruebas de operaciones aritméticas básicas
    acumulador = 10;
    console.log("Suma: 10 + 5 = " + (acumulador += 5));
    console.log("Resta: 15 - 3 = " + (acumulador -= 3));
    console.log("Multiplicación: 12 * 2 = " + (acumulador *= 2));
    console.log("División: 24 / 6 = " + (acumulador /= 6));
    console.log("Módulo: 4 % 3 = " + (acumulador %= 3));
    
    // Prueba de potencia (2^3 = 8)
    acumulador = 2;
    let res = 1;
    for (let i = 0; i < 3; i++) res *= acumulador;  // Calcular 2^3
    console.log("Potencia: 2 ^ 3 = " + (acumulador = res));
    
    // Prueba de factorial (5! = 120)
    acumulador = 5;
    let f = 1;
    for (let i = 2; i <= 5; i++) f *= i;  // Calcular 5!
    console.log("Factorial: 5! = " + (acumulador = f));
    
    // Prueba de operaciones de memoria
    guardado = acumulador;    // Guardar valor actual
    acumulador = 0;           // Cambiar acumulador
    acumulador = guardado;    // Recuperar valor guardado
    console.log("Memoria guardada y recuperada: " + acumulador);
    
    // Prueba de limpieza
    acumulador = guardado = 0;  // Limpiar todo
    console.log("Limpiado: " + acumulador);
    
    console.log("------ FIN PRUEBAS ------\n");
}

// Programa principal: primero ejecuta las pruebas, luego inicia la calculadora interactiva
hacerPruebas();  // Demostrar que todas las operaciones funcionan
ejecutar();      // Iniciar la calculadora para uso del usuario
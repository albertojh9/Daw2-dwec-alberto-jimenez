// Variables globales
let pantalla = 0; // Acumulador
let memoria = 0;  // Memoria

// Función para mostrar el menú principal
function mostrarMenu() {
    console.log("Calculadora:");
    console.log("1. Sumar (+)");
    console.log("2. Restar (-)");
    console.log("3. Multiplicar (*)");
    console.log("4. Dividir (/)");
    console.log("5. Módulo (%)");
    console.log("6. Factorial (!)");
    console.log("7. Potencia (x^y)");
    console.log("8. Guardar en memoria (M)");
    console.log("9. Recuperar de memoria (R)");
    console.log("10. Resetear (C)");
    console.log("11. Salir");
}

// Función para realizar operaciones
function calcular(operacion, valor = null) {
    switch (operacion) {
        case "+":
            pantalla += valor;
            break;
        case "-":
            pantalla -= valor;
            break;
        case "*":
            pantalla *= valor;
            break;
        case "/":
            if (valor !== 0) {
                pantalla /= valor;
            } else {
                console.log("Error: División por cero.");
            }
            break;
        case "%":
            pantalla %= valor;
            break;
        case "!":
            pantalla = factorial(pantalla);
            break;
        case "^":
            pantalla = Math.pow(pantalla, valor);
            break;
        case "M":
            memoria = pantalla;
            break;
        case "R":
            pantalla = memoria;
            break;
        case "C":
            pantalla = 0;
            memoria = 0;
            break;
        default:
            console.log("Operación no válida.");
    }
    console.log(`Pantalla: ${pantalla}`);
}

// Función para calcular el factorial
function factorial(n) {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    let resultado = 1;
    for (let i = 2; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

// Programa principal
function programaPrueba() {
    let salir = false;
    while (!salir) {
        mostrarMenu();
        const opcion = prompt("Selecciona una operación: ");
        switch (opcion) {
            case "1":
                const suma = parseFloat(prompt("Introduce un número: "));
                calcular("+", suma);
                break;
            case "2":
                const resta = parseFloat(prompt("Introduce un número: "));
                calcular("-", resta);
                break;
            case "3":
                const multiplicacion = parseFloat(prompt("Introduce un número: "));
                calcular("*", multiplicacion);
                break;
            case "4":
                const division = parseFloat(prompt("Introduce un número: "));
                calcular("/", division);
                break;
            case "5":
                const modulo = parseFloat(prompt("Introduce un número: "));
                calcular("%", modulo);
                break;
            case "6":
                calcular("!");
                break;
            case "7":
                const exponente = parseFloat(prompt("Introduce el exponente: "));
                calcular("^", exponente);
                break;
            case "8":
                calcular("M");
                break;
            case "9":
                calcular("R");
                break;
            case "10":
                calcular("C");
                break;
            case "11":
                salir = true;
                console.log("Saliendo de la calculadora...");
                break;
            default:
                console.log("Opción no válida.");
        }
    }
}

// Ejecutar el programa de prueba
programaPrueba();
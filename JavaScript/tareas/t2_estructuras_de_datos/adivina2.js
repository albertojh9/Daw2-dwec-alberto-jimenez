// js0303. Adivina adivinanza
// Alumno: Alberto - 2º DAW

// Generar 10 números aleatorios de 0 a 20
const numerosAleatorios = [];
for (let i = 0; i < 10; i++) {
    numerosAleatorios.push(Math.floor(Math.random() * 21)); // 0 a 20 inclusive
}

// Array para almacenar los números del usuario
const numerosUsuario = [];

// Array para almacenar los aciertos
const aciertos = [];

// Mostrar mensaje de inicio
alert("¡Bienvenido al juego Adivina Adivinanza!\nHe generado 10 números aleatorios entre 0 y 20.\nTienes que adivinar 5 números.");

// Pedir 5 números al usuario
for (let i = 1; i <= 5; i++) {
    let numero;
    let valido = false;
    
    // Validar entrada
    while (!valido) {
        let entrada = prompt(`Introduce el número ${i} de 5 (entre 0 y 20):`);
        numero = parseInt(entrada);
        
        if (isNaN(numero)) {
            alert("Por favor, introduce un número válido");
        } else if (numero < 0 || numero > 20) {
            alert("El número debe estar entre 0 y 20");
        } else {
            valido = true;
            numerosUsuario.push(numero);
        }
    }
}

// Comprobar aciertos
for (let numeroUsuario of numerosUsuario) {
    if (numerosAleatorios.includes(numeroUsuario)) {
        // Solo añadir si no está ya en aciertos (evitar duplicados)
        if (!aciertos.includes(numeroUsuario)) {
            aciertos.push(numeroUsuario);
        }
    }
}

// Mostrar resultados
let mensaje = "=== RESULTADOS ===\n\n";
mensaje += `Números generados: [${numerosAleatorios.join(", ")}]\n`;
mensaje += `Tus números: [${numerosUsuario.join(", ")}]\n\n`;
mensaje += `Número de aciertos: ${aciertos.length}\n`;

if (aciertos.length > 0) {
    mensaje += `Números acertados: [${aciertos.join(", ")}]`;
} else {
    mensaje += "No has acertado ningún número";
}

alert(mensaje);
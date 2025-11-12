// js0303. Adivina adivinanza

// Función para generar números aleatorios
function generarNumerosAleatorios(cantidad, max) {
    let numeros = [];
    for (let i = 0; i < cantidad; i++) {
        numeros.push(Math.floor(Math.random() * (max + 1)));
    }
    return numeros;
}

// Función para pedir números al usuario
function pedirNumeros(cantidad) {
    let numeros = [];
    for (let i = 0; i < cantidad; i++) {
        let numero = parseInt(prompt(`Introduce el número ${i + 1} de ${cantidad}:`));
        numeros.push(numero);
    }
    return numeros;
}

// Función para comprobar aciertos
function comprobarAciertos(numerosAleatorios, numerosUsuario) {
    let aciertos = 0;
    let numerosAcertados = [];
    
    for (let numero of numerosUsuario) {
        if (numerosAleatorios.includes(numero) && !numerosAcertados.includes(numero)) {
            aciertos++;
            numerosAcertados.push(numero);
        }
    }
    
    return { aciertos, numerosAcertados };
}

// Función para mostrar resultados
function mostrarResultados(numerosAleatorios, numerosUsuario, resultado) {
    console.log(`Números generados: ${numerosAleatorios.join(', ')}`);
    console.log(`Tus números: ${numerosUsuario.join(', ')}`);
    console.log(`Número de aciertos: ${resultado.aciertos}`);
    console.log(`Números acertados: ${resultado.numerosAcertados.join(', ')}`);
}

// Programa principal
function jugar() {
    let numerosAleatorios = generarNumerosAleatorios(10, 20);
    let numerosUsuario = pedirNumeros(5);
    let resultado = comprobarAciertos(numerosAleatorios, numerosUsuario);
    mostrarResultados(numerosAleatorios, numerosUsuario, resultado);
}

// Ejecutar el juego
jugar();
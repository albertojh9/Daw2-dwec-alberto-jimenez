// Nombre del usuario
const nombre = 'Alberto';
console.log(`\n¡Hola ${nombre}!\n`);

// Array con números del 1 al 10
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// BUCLE 1 (while): Leer números y almacenarlos en un array
console.log('Números:', numeros);

// BUCLE 2 (for): Tomar números pares y añadirlos a un Set
const numerosPares = new Set();

for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
        numerosPares.add(numeros[i]);
    }
}

console.log('\n--- Números pares únicos en el Set ---');
console.log('Números pares:', Array.from(numerosPares));

// BUCLE 3: Comprobar cada número del array original en el Set
console.log('\n--- Comprobación de números en el Set ---');

for (let i = 0; i < numeros.length; i++) {
    let numeroConsulta = numeros[i];
    if (numerosPares.has(numeroConsulta)) {
        console.log(` El número ${numeroConsulta} SÍ está en el set de números pares`);
    } else {
        console.log(` El número ${numeroConsulta} NO está en el set de números pares`);
    }
}


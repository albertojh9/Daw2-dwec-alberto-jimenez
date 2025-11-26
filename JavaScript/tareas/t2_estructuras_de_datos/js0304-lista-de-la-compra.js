// Lista de la compra - Sistema de gestión de artículos
// Permite añadir elementos únicos y mostrarlos ordenados

"use strict";

// Importar prompt para entrada de datos desde consola
const prompt = require('prompt-sync')();

// Array para almacenar los artículos de la compra
let articulosCompra = [];
// Variable para capturar la entrada del usuario
let entrada = null;

// Mostrar información inicial al usuario
console.log("=== GESTOR DE LISTA DE COMPRA ===");
console.log("Introduce artículos (cadena vacía para terminar):");

// Bucle principal: do-while ejecuta al menos una vez
// Continúa hasta que el usuario introduzca cadena vacía
do {
    // Solicitar artículo al usuario
    entrada = prompt("Artículo a añadir: ");
    
    // Verificar si el usuario quiere terminar (cadena vacía)
    if (entrada === "") {
        break; // Salir del bucle inmediatamente
    }
    
    // Convertir a minúsculas para comparación insensible a mayúsculas
    let articulo = entrada.toLowerCase();
    
    // Buscar si ya existe el artículo en la lista
    // Usamos bucle for manual en lugar de .includes() para mayor control
    let yaExiste = false;
    for (let i = 0; i < articulosCompra.length; i++) {
        // Comparar cada elemento del array con el nuevo artículo
        if (articulosCompra[i] === articulo) {
            yaExiste = true;
            break; // Salir del bucle cuando encuentre coincidencia
        }
    }
    
    // Procesar el resultado de la búsqueda
    if (yaExiste) {
        // El artículo ya está en la lista - informar al usuario
        console.log("Este artículo ya está en tu lista");
    } else {
        // Artículo nuevo - añadirlo al array
        articulosCompra.push(articulo);
        console.log("Artículo agregado con éxito");
    }
    
} while (entrada !== ""); // Condición: repetir hasta cadena vacía

// Ordenar la lista alfabéticamente antes de mostrar
// .sort() ordena los elementos del array de forma ascendente
articulosCompra.sort();

// Mostrar resultado final al usuario
console.log("\n=== TU LISTA DE COMPRA ORDENADA ===");

// Verificar si hay elementos en la lista
if (articulosCompra.length === 0) {
    // Lista vacía - informar al usuario
    console.log("No hay artículos en la lista");
} else {
    // Lista con elementos - mostrar usando join() para formato limpio
    // .join(", ") une los elementos del array separados por comas
    console.log("Artículos: " + articulosCompra.join(", "));
}
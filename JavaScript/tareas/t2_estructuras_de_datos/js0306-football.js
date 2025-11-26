// Football Manager - Gestión de alineaciones
// 1. Configurar jugadores (número-nombre)
// 2. Consultar jugadores por número

"use strict";

// Importar prompt para entrada de datos
const prompt = require('prompt-sync')();

// Map para almacenar plantilla: número=clave, nombre=valor
const plantillaEquipo = new Map();

console.log("=== FOOTBALL MANAGER ===");
console.log("Sistema de gestión de alineaciones");

// ========== FASE 1: CONFIGURACIÓN ==========
// Añadir jugadores hasta introducir 0 o cadena vacía

console.log("\n--- CONFIGURACIÓN DEL EQUIPO ---");
console.log("Introduce los datos de los jugadores (número 0 para terminar):");

// Variable de control - inicia en -1 para entrar al bucle
let numeroJugador = -1;

// Bucle principal - continúa hasta que se introduzca 0
while (numeroJugador !== 0) {
    // Pedir número de camiseta (convertir a entero)
    numeroJugador = parseInt(prompt("Número de camiseta: "));
    
    // Si es 0, terminar configuración
    if (numeroJugador === 0) {
        break;
    }
    
    // Verificar si el número ya existe
    if (plantillaEquipo.has(numeroJugador)) {
        // Mostrar qué jugador tiene ese número
        console.log("Ese número ya pertenece a: " + plantillaEquipo.get(numeroJugador));
    } else {
        // Pedir nombre del jugador
        let nombreJugador = prompt("Nombre del jugador: ");
        
        // Si está vacío o es null, terminar
        if (nombreJugador === "" || nombreJugador === null) {
            break;
        }
        
        // Guardar jugador en el Map
        plantillaEquipo.set(numeroJugador, nombreJugador);
        console.log("Jugador registrado exitosamente");
    }
}

// ========== FASE 2: CONSULTAS ==========
// Buscar jugadores por número hasta introducir 0

console.log("\n--- CONSULTA DE JUGADORES ---");
console.log("Introduce un número para ver el jugador asignado (0 para salir):");

// Variable de control - inicia en -1 para entrar al bucle
let numeroBusqueda = -1;

// Bucle de consultas hasta introducir 0
while (numeroBusqueda !== 0) {
    // Pedir número a buscar
    numeroBusqueda = parseInt(prompt("Buscar jugador número: "));
    
    // Si es 0, salir
    if (numeroBusqueda === 0) {
        break;
    }
    
    // Buscar jugador en el Map
    let jugadorEncontrado = plantillaEquipo.get(numeroBusqueda);
    
    // Mostrar resultado
    if (jugadorEncontrado) {
        console.log("El jugador con ese número es: " + jugadorEncontrado);
    } else {
        console.log("No existe jugador con el número " + numeroBusqueda);
    }
}

console.log("\n¡Gracias por usar el Football Manager!");
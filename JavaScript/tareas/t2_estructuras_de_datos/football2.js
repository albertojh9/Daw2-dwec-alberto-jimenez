// js0306. Football Manager

// Función para configurar el equipo
function configurarEquipo() {
    let equipo = {};
    console.log("=== CONFIGURACIÓN DEL EQUIPO ===");
    
    while (true) {
        let numero = prompt("Introduce el número del jugador (vacío para terminar):");
        
        // Si es cadena vacía, terminar configuración
        if (numero === "" || numero === null) {
            break;
        }
        
        let nombre = prompt(`Introduce el nombre del jugador con dorsal ${numero}:`);
        equipo[numero] = nombre;
        console.log(`Jugador añadido: ${numero} - ${nombre}`);
    }
    
    return equipo;
}

// Función para buscar jugador por número
function buscarJugador(equipo, numero) {
    if (equipo[numero]) {
        return equipo[numero];
    }
    return null;
}

// Función para consultar jugadores
function consultarJugadores(equipo) {
    console.log("\n=== CONSULTA DE JUGADORES ===");
    
    while (true) {
        let numeroConsulta = prompt("Introduce el número del jugador a consultar (0 para terminar):");
        
        // Si es 0, terminar
        if (numeroConsulta === "0") {
            break;
        }
        
        let jugador = buscarJugador(equipo, numeroConsulta);
        
        if (jugador) {
            alert(`Jugador número ${numeroConsulta}: ${jugador}`);
            console.log(`Jugador número ${numeroConsulta}: ${jugador}`);
        } else {
            alert(`No hay ningún jugador con el número ${numeroConsulta}`);
            console.log(`No hay ningún jugador con el número ${numeroConsulta}`);
        }
    }
}

// Programa principal
function gestionarEquipo() {
    let equipo = configurarEquipo();
    consultarJugadores(equipo);
    console.log("Fin del programa.");
}

// Ejecutar el programa
gestionarEquipo();
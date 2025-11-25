// js0306. Football Manager - Versión para navegador
// Alumno: Alberto - 2º DAW

console.log("⚽ Football Manager - Iniciando aplicación");

// Objeto para almacenar los jugadores (clave: número, valor: nombre)
const equipo = {};

// Mensaje de bienvenida
console.log("⚽ FOOTBALL MANAGER ⚽ - Gestión de alineaciones");
alert("⚽ FOOTBALL MANAGER ⚽\nGestión de alineaciones de fútbol");

// ========== PRIMERA PARTE: CONFIGURACIÓN DEL EQUIPO ==========
console.log("=== FASE 1: CONFIGURACIÓN DEL EQUIPO ===");
alert("=== CONFIGURACIÓN DEL EQUIPO ===\nIntroduce los jugadores del equipo.\n(Deja el nombre vacío para terminar)");

let configurando = true;
let jugadoresAñadidos = 0;

while (configurando) {
    // Pedir número del jugador
    let numero;
    let numeroValido = false;
    
    while (!numeroValido) {
        let entradaNumero = prompt("Introduce el número del jugador (1-99):");
        
        // Si cancela, terminar configuración
        if (entradaNumero === null || entradaNumero === "") {
            configurando = false;
            console.log("🚪 Usuario terminó configuración del equipo");
            break;
        }
        
        numero = parseInt(entradaNumero);
        
        // Validar número
        if (isNaN(numero)) {
            console.log(`❌ Entrada inválida: "${entradaNumero}" (no es número)`);
            alert("Por favor, introduce un número válido");
        } else if (numero < 1 || numero > 99) {
            console.log(`❌ Número fuera de rango: ${numero}`);
            alert("El número debe estar entre 1 y 99");
        } else if (equipo[numero]) {
            console.log(`❌ Número duplicado: ${numero} (${equipo[numero]})`);
            alert(`El número ${numero} ya está asignado a ${equipo[numero]}`);
        } else {
            console.log(`✅ Número válido: ${numero}`);
            numeroValido = true;
        }
    }
    
    // Si se validó el número, pedir el nombre
    if (numeroValido) {
        let nombre = prompt(`Introduce el nombre del jugador con el número ${numero}:`);
        
        // Verificar si es cadena vacía o cancelar
        if (nombre === null || nombre === "") {
            configurando = false;
            console.log("🚪 Usuario terminó configuración del equipo");
        } else {
            nombre = nombre.trim();
            if (nombre !== "") {
                // Añadir jugador al equipo
                equipo[numero] = nombre;
                jugadoresAñadidos++;
                console.log(`⚽ Jugador añadido: #${numero} - ${nombre} (Total: ${jugadoresAñadidos})`);
                alert(`✅ Jugador añadido: #${numero} - ${nombre}`);
            }
        }
    }
}

// Verificar que hay jugadores en el equipo
if (jugadoresAñadidos === 0) {
    console.log("❌ Sin jugadores configurados - Terminando");
    alert("No se ha configurado ningún jugador. El programa terminará.");
} else {
    console.log(`📊 Equipo configurado con ${jugadoresAñadidos} jugadores`);
    
    // Mostrar resumen del equipo
    let resumenEquipo = `=== EQUIPO CONFIGURADO ===\nTotal de jugadores: ${jugadoresAñadidos}\n\n`;
    
    // Ordenar por número de camiseta
    const numerosOrdenados = Object.keys(equipo).map(num => parseInt(num)).sort((a, b) => a - b);
    
    console.log("📋 Plantilla del equipo:");
    resumenEquipo += "Plantilla:\n";
    for (let num of numerosOrdenados) {
        console.log(`#${num} - ${equipo[num]}`);
        resumenEquipo += `#${num} - ${equipo[num]}\n`;
    }
    
    alert(resumenEquipo);
    
    // ========== SEGUNDA PARTE: CONSULTA DE JUGADORES ==========
    console.log("=== FASE 2: CONSULTA DE JUGADORES ===");
    alert("=== CONSULTA DE JUGADORES ===\nIntroduce el número para ver el jugador.\n(Introduce 0 para terminar)");
    
    let consultando = true;
    let consultasRealizadas = 0;
    
    while (consultando) {
        let numeroConsulta = prompt("Introduce el número del jugador a consultar (0 para salir):");
        
        // Si cancela, terminar
        if (numeroConsulta === null) {
            consultando = false;
            console.log("🚪 Usuario canceló consultas");
            continue;
        }
        
        numeroConsulta = parseInt(numeroConsulta);
        
        // Validar entrada
        if (isNaN(numeroConsulta)) {
            console.log(`❌ Consulta inválida: "${numeroConsulta}" (no es número)`);
            alert("Por favor, introduce un número válido");
        } else if (numeroConsulta === 0) {
            // Terminar consultas
            consultando = false;
            console.log(`🏁 Terminando consultas (realizadas: ${consultasRealizadas})`);
        } else if (equipo[numeroConsulta]) {
            // Mostrar jugador
            consultasRealizadas++;
            console.log(`🔍 Consulta ${consultasRealizadas}: #${numeroConsulta} - ${equipo[numeroConsulta]}`);
            alert(`⚽ Jugador #${numeroConsulta}\nNombre: ${equipo[numeroConsulta]}`);
        } else {
            // No existe ese número
            console.log(`❌ Jugador no encontrado: #${numeroConsulta}`);
            alert(`❌ No hay ningún jugador con el número ${numeroConsulta}`);
        }
    }
    
    // Mensaje de despedida
    console.log("👋 Cerrando Football Manager");
    alert("Gracias por usar Football Manager. ¡Hasta pronto!");
}

console.log("🏁 Aplicación Football Manager finalizada");
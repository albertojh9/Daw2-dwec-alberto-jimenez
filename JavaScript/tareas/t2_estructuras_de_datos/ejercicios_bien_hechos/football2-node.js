// Importar el módulo readline para leer entrada del usuario en la terminal
const readline = require('readline');
// Crear interfaz para entrada/salida en la terminal
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("⚽ Football Manager - Iniciando aplicación");

// Objeto para almacenar los jugadores (clave: número, valor: nombre)
// Ejemplo: equipo[10] = "Messi" significa que el jugador #10 es Messi
const equipo = {};

// Mensaje de bienvenida
console.log("⚽ FOOTBALL MANAGER ⚽ - Gestión de alineaciones");
console.log("=== FASE 1: CONFIGURACIÓN DEL EQUIPO ===");
console.log("Introduce los jugadores del equipo (Enter para terminar)\n");

// Contador para saber cuántos jugadores se han añadido
let jugadoresAñadidos = 0;

/**
 * Función para pedir el número del jugador y su nombre
 * Se llama recursivamente hasta que el usuario presiona Enter sin escribir nada
 */
function pedirNumeroJugador() {
    // Preguntar al usuario por el número del jugador
    rl.question("Introduce el número del jugador (1-99) o Enter para terminar: ", (entradaNumero) => {
        // Si el usuario solo presiona Enter (entrada vacía), terminar la configuración
        if (entradaNumero.trim() === "") {
            console.log("🚪 Usuario terminó configuración del equipo");
            return mostrarResumen();
        }
        
        // Convertir la entrada a número entero
        const numero = parseInt(entradaNumero);
        
        // Validar que sea un número válido
        if (isNaN(numero)) {
            console.log(`❌ Entrada inválida: "${entradaNumero}" (no es número)`);
            return pedirNumeroJugador(); // Volver a pedir
        } else if (numero < 1 || numero > 99) {
            // Validar que esté en el rango permitido
            console.log(`❌ Número fuera de rango: ${numero}`);
            return pedirNumeroJugador();
        } else if (equipo[numero]) {
            // Verificar que el número no esté ya asignado
            console.log(`❌ Número duplicado: ${numero} (${equipo[numero]})`);
            return pedirNumeroJugador();
        }
        
        // Si llegamos aquí, el número es válido
        console.log(`✅ Número válido: ${numero}`);
        
        // Ahora pedir el nombre del jugador
        rl.question(`Introduce el nombre del jugador con el número ${numero}: `, (nombre) => {
            // Si el nombre está vacío, terminar configuración
            if (nombre.trim() === "") {
                console.log("🚪 Usuario terminó configuración del equipo");
                return mostrarResumen();
            }
            
            // Guardar el jugador en el objeto equipo
            equipo[numero] = nombre.trim();
            jugadoresAñadidos++;
            console.log(`⚽ Jugador añadido: #${numero} - ${nombre.trim()} (Total: ${jugadoresAñadidos})`);
            
            // Llamar recursivamente para pedir el siguiente jugador
            pedirNumeroJugador();
        });
    });
}

/**
 * Función para mostrar el resumen del equipo configurado
 * y pasar a la fase de consultas
 */
function mostrarResumen() {
    // Si no se añadió ningún jugador, terminar el programa
    if (jugadoresAñadidos === 0) {
        console.log("❌ Sin jugadores configurados - Terminando");
        return rl.close(); // Cerrar la interfaz readline
    }
    
    console.log(`\n📊 Equipo configurado con ${jugadoresAñadidos} jugadores`);
    console.log("=== EQUIPO CONFIGURADO ===");
    
    // Obtener todos los números de jugadores y ordenarlos de menor a mayor
    // Object.keys(equipo) devuelve un array con todas las claves (números)
    // .map() convierte strings a números
    // .sort() los ordena numéricamente
    const numerosOrdenados = Object.keys(equipo).map(num => parseInt(num)).sort((a, b) => a - b);
    
    // Mostrar la plantilla ordenada por número
    console.log("📋 Plantilla del equipo:");
    for (let num of numerosOrdenados) {
        console.log(`#${num} - ${equipo[num]}`);
    }
    
    // Pasar a la fase 2: consultas
    console.log("\n=== FASE 2: CONSULTA DE JUGADORES ===");
    console.log("Introduce el número para ver el jugador (0 para terminar)\n");
    consultarJugador();
}

// Contador de cuántas consultas ha realizado el usuario
let consultasRealizadas = 0;

/**
 * Función para consultar jugadores por su número
 * Se llama recursivamente hasta que el usuario introduce 0
 */
function consultarJugador() {
    // Preguntar al usuario qué número quiere consultar
    rl.question("Introduce el número del jugador a consultar (0 para salir): ", (numeroConsulta) => {
        // Convertir a número
        const num = parseInt(numeroConsulta);
        
        // Validar que sea un número
        if (isNaN(num)) {
            console.log(`❌ Consulta inválida: "${numeroConsulta}" (no es número)`);
            return consultarJugador(); // Volver a preguntar
        }
        
        // Si introduce 0, terminar el programa
        if (num === 0) {
            console.log(`🏁 Terminando consultas (realizadas: ${consultasRealizadas})`);
            console.log("👋 Cerrando Football Manager");
            console.log("🏁 Aplicación Football Manager finalizada");
            return rl.close(); // Cerrar la interfaz readline y terminar
        }
        
        // Buscar si existe un jugador con ese número
        if (equipo[num]) {
            // Si existe, mostrarlo
            consultasRealizadas++;
            console.log(`🔍 Consulta ${consultasRealizadas}: #${num} - ${equipo[num]}`);
        } else {
            // Si no existe, informar al usuario
            console.log(`❌ No hay ningún jugador con el número ${num}`);
        }
        
        // Llamar recursivamente para permitir más consultas
        consultarJugador();
    });
}

// Iniciar el programa llamando a la primera función
pedirNumeroJugador();

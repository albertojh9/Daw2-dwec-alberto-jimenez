// Crea la interfaz para leer desde consola
const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout });

// Objeto para guardar los jugadores
const equipo = {};

// Pide datos de jugadores al usuario
function pedirJugador() {
  rl.question("Número (vacío para terminar): ", n => {
    // Si el número está vacío, pasa a consultar
    if (!n.trim()) return consultar();
    rl.question("Nombre: ", nom => {
      // Guarda el jugador en el objeto
      equipo[n] = nom || "Sin nombre";
      pedirJugador();
    });
  });
}

// Permite consultar jugadores por número
function consultar() {
  rl.question("\nConsulta número (0 para salir): ", n => {
    // Si es 0, termina el programa
    if (n === "0") return rl.close();
    // Muestra el nombre o mensaje si no existe
    console.log(equipo[n] ? `Jugador: ${equipo[n]}` : "No existe ese jugador.");
    consultar();
  });
}

// Inicia el proceso
pedirJugador();
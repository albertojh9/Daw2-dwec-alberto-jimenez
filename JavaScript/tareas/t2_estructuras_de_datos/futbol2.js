
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let equipo = {};

function pedirJugador() {
    rl.question("Número de jugador (vacío para terminar): ", num => {
        if (!num.trim()) {
            console.log("\nEquipo configurado:", equipo);
            return consultarJugador();
        }
        rl.question("Nombre del jugador: ", nombre => {
            equipo[num.trim()] = nombre.trim() || "Sin nombre";
            pedirJugador();
        });
    });
}

function consultarJugador() {
    rl.question("\nConsulta número de jugador (0 para salir): ", num => {
        if (num.trim() === "0") return rl.close();
        console.log(equipo[num.trim()] ? `Jugador: ${equipo[num.trim()]}` : "No existe ese jugador.");
        consultarJugador();
    });
}

pedirJugador();

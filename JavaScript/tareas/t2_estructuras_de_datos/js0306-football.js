const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let equipo = {};

// **Primera parte: Configuración del equipo**
function pedirJugador() {
    rl.question("Introduce el número del jugador (deja vacío para terminar): ", (num) => {
        num = num.trim();

        if (num === "") {
            console.log("\nConfiguración del equipo completada.");
            console.log("Equipos disponibles:", equipo);
            // Pasamos a la segunda parte
            consultarJugador();
        } else if (isNaN(num) || parseInt(num) <= 0) {
            console.log("Número inválido. Debe ser un número positivo.");
            pedirJugador();
        } else {
            rl.question("Introduce el nombre del jugador: ", (nombre) => {
                nombre = nombre.trim();
                if (nombre === "") {
                    console.log("El nombre no puede estar vacío.");
                } else {
                    equipo[num] = nombre;
                    console.log(`Jugador "${nombre}" asignado al número ${num}.`);
                }
                pedirJugador(); // Pedir siguiente jugador
            });
        }
    });
}

// **Segunda parte: Consulta de jugadores**
function consultarJugador() {
    rl.question("\nIntroduce el número del jugador a consultar (0 para terminar): ", (num) => {
        num = num.trim();

        if (num === "0") {
            console.log("Consulta finalizada.");
            rl.close();
        } else if (equipo[num]) {
            console.log(`El jugador con el número ${num} es: ${equipo[num]}`);
            consultarJugador();
        } else {
            console.log(`No hay jugador asignado al número ${num}.`);
            consultarJugador();
        }
    });
}

// Iniciar programa
pedirJugador();

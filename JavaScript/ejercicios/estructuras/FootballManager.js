"use strict";

const mapaDeJugadores = new Map();
const promt = require('promt-sync')();
let end = false;

while(! end) {
    let entrada = promt("Introduce el dorsal y nombre del jugador (Ej: Juanjo, vacio para terminar:): ")

    if (entrada.trim() === "") {
        end = true;
    } else {
        let jugador = entrada.split(" ");
        mapaDeJugadores.set(jugador[0], jugador[i]);
    }

}

end = false;
while (! end) {
    let dorsal = promt ("Introduce un dorsal a consultar: ");

    if (dorsal = )
}



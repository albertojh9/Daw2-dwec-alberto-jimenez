const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let listaCompra = [];

function pedirElemento() {
    rl.question("Introduce un elemento para la lista de la compra (deja vacío para terminar): ", (item) => {
        item = item.trim();
        if (item === "") {
            // Terminar y mostrar lista ordenada
            listaCompra.sort();
            if (listaCompra.length > 0) {
                console.log("Lista de la compra (ordenada alfabéticamente): " + listaCompra.join(", "));
            } else {
                console.log("No se añadieron elementos a la lista.");
            }
            rl.close();
        } else {
            if (listaCompra.includes(item)) {
                console.log(`El elemento "${item}" ya está en la lista.`);
            } else {
                listaCompra.push(item);
                console.log(`Elemento "${item}" añadido a la lista.`);
            }
            pedirElemento(); // Llamar de nuevo para pedir otro
        }
    });
}

// Empezar a pedir elementos
pedirElemento();

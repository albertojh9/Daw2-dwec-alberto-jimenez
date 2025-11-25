// js0304. Lista de la compra - Versión para terminal (Node.js)
// Alumno: Alberto - 2º DAW

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("🛒 Lista de la Compra - Iniciando aplicación");

// Array para almacenar la lista de la compra
const listaCompra = [];

// Mensaje de bienvenida
console.log("=== LISTA DE LA COMPRA ===");
console.log("Introduce los elementos de la lista (Enter para terminar)\n");

let elementosAñadidos = 0;

function pedirElemento() {
    rl.question("Introduce un elemento para la lista de la compra: ", (elemento) => {
        if (elemento.trim() === "") {
            console.log("🚪 Usuario terminó de añadir elementos");
            return mostrarLista();
        }
        
        elemento = elemento.trim();
        
        // Verificar si el elemento ya existe
        let existe = false;
        for (let item of listaCompra) {
            if (item.toLowerCase() === elemento.toLowerCase()) {
                existe = true;
                break;
            }
        }
        
        if (existe) {
            console.log(`⚠️ Elemento duplicado: "${elemento}"`);
            console.log(`⚠️ El elemento "${elemento}" ya existe en la lista.`);
        } else {
            listaCompra.push(elemento);
            elementosAñadidos++;
            console.log(`✅ Añadido: "${elemento}" (Total: ${elementosAñadidos})`);
        }
        
        pedirElemento();
    });
}

function mostrarLista() {
    console.log("\n📋 Procesando lista final...");
    
    if (listaCompra.length === 0) {
        console.log("❌ Lista vacía");
        console.log("La lista de la compra está vacía.");
    } else {
        listaCompra.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        
        console.log("📝 Lista ordenada alfabéticamente:");
        console.log(listaCompra);
        
        console.log("\n=== LISTA DE LA COMPRA FINAL ===");
        console.log(`Total de artículos: ${listaCompra.length}\n`);
        console.log("Artículos (orden alfabético):");
        
        for (let i = 0; i < listaCompra.length; i++) {
            console.log(`${i + 1}. ${listaCompra[i]}`);
        }
    }
    
    console.log("\n🏁 Aplicación Lista de la Compra finalizada");
    rl.close();
}

pedirElemento();

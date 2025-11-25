// js0304. Lista de la compra - Versión para navegador
// Alumno: Alberto - 2º DAW

console.log("🛒 Lista de la Compra - Iniciando aplicación");

// Array para almacenar la lista de la compra
const listaCompra = [];

// Mensaje de bienvenida
console.log("=== LISTA DE LA COMPRA ===");
alert("=== LISTA DE LA COMPRA ===\nIntroduce los elementos de la lista.\n(Pulsa Cancelar o deja vacío para terminar)");

// Bucle para pedir elementos
let continuar = true;
let elementosAñadidos = 0;

while (continuar) {
    // Pedir elemento al usuario
    let elemento = prompt("Introduce un elemento para la lista de la compra:");
    
    // Verificar si es cadena vacía o cancelar
    if (elemento === null || elemento === "") {
        continuar = false;
        console.log("🚪 Usuario terminó de añadir elementos");
    } else {
        // Normalizar el elemento (quitar espacios al inicio/final y convertir a minúsculas para comparación)
        elemento = elemento.trim();
        
        if (elemento !== "") {
            // Verificar si el elemento ya existe (comparación insensible a mayúsculas)
            let existe = false;
            for (let item of listaCompra) {
                if (item.toLowerCase() === elemento.toLowerCase()) {
                    existe = true;
                    break;
                }
            }
            
            if (existe) {
                // El elemento ya existe
                console.log(`⚠️ Elemento duplicado: "${elemento}"`);
                alert(`⚠️ El elemento "${elemento}" ya existe en la lista.`);
            } else {
                // Añadir el elemento a la lista
                listaCompra.push(elemento);
                elementosAñadidos++;
                console.log(`✅ Añadido: "${elemento}" (Total: ${elementosAñadidos})`);
                alert(`✅ "${elemento}" ha sido añadido a la lista.`);
            }
        }
    }
}

console.log("📋 Procesando lista final...");

// Mostrar la lista final
if (listaCompra.length === 0) {
    console.log("❌ Lista vacía");
    alert("La lista de la compra está vacía.");
} else {
    // Ordenar alfabéticamente (insensible a mayúsculas)
    listaCompra.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    
    console.log("📝 Lista ordenada alfabéticamente:");
    console.log(listaCompra);
    
    // Crear mensaje con la lista
    let mensaje = "=== LISTA DE LA COMPRA FINAL ===\n";
    mensaje += `Total de artículos: ${listaCompra.length}\n\n`;
    mensaje += "Artículos (orden alfabético):\n";
    
    for (let i = 0; i < listaCompra.length; i++) {
        mensaje += `${i + 1}. ${listaCompra[i]}\n`;
        console.log(`${i + 1}. ${listaCompra[i]}`);
    }
    
    alert(mensaje);
}

console.log("🏁 Aplicación Lista de la Compra finalizada");
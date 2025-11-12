// js0304. Lista de la compra

// Función para añadir elemento a la lista
function añadirElemento(lista, elemento) {
    if (lista.includes(elemento)) {
        alert(`El artículo "${elemento}" ya está en la lista.`);
        return false;
    } else {
        lista.push(elemento);
        alert(`Artículo "${elemento}" añadido a la lista.`);
        return true;
    }
}

// Función para pedir elementos al usuario
function pedirElementos() {
    let lista = [];
    let elemento;
    
    while (true) {
        elemento = prompt("Introduce un artículo (vacío para terminar):");
        
        // Si es cadena vacía, terminar
        if (elemento === "" || elemento === null) {
            break;
        }
        
        añadirElemento(lista, elemento);
    }
    
    return lista;
}

// Función para mostrar la lista ordenada
function mostrarLista(lista) {
    lista.sort();
    console.log("Lista de la compra:");
    console.log(lista.join(', '));
    alert(`Lista de la compra:\n${lista.join('\n')}`);
}

// Programa principal
function gestionarListaCompra() {
    let listaCompra = pedirElementos();
    mostrarLista(listaCompra);
}

// Ejecutar el programa
gestionarListaCompra();
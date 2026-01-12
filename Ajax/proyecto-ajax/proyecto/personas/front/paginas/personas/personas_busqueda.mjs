import * as http from "../../js/lib/http.mjs";

let todosLasPersonas = [];
let textoBusqueda = '';
let campoOrden = 'nombre';
let direccionOrden = 'asc';

$(document).ready(() => {
    $("#btVolver").on("click", () => window.location = "personas.html");
    $("#btCerrarSesion").on("click", () => cerrarSesion());
    
    let timeoutBusqueda;
    $("#campoBusqueda").on("input", function() {
        clearTimeout(timeoutBusqueda);
        timeoutBusqueda = setTimeout(() => {
            textoBusqueda = $(this).val().toLowerCase();
            aplicarFiltrosYOrden();
        }, 300);
    });
    
    $("#selectorOrden").on("change", function() {
        campoOrden = $(this).val();
        aplicarFiltrosYOrden();
    });
    
    $("#btnAscendente").on("click", function() {
        if (direccionOrden !== 'asc') {
            direccionOrden = 'asc';
            actualizarBotonesOrden();
            aplicarFiltrosYOrden();
        }
    });
    
    $("#btnDescendente").on("click", function() {
        if (direccionOrden !== 'desc') {
            direccionOrden = 'desc';
            actualizarBotonesOrden();
            aplicarFiltrosYOrden();
        }
    });
    
    cargarPersonas();
});

function cargarPersonas() {
    http.get(URL_PERSONAS + "?_limit=1000")
        .then((respuesta) => respuesta.json())
        .then(personas => {
            todosLasPersonas = personas;
            aplicarFiltrosYOrden();
        });
}

function aplicarFiltrosYOrden() {
    let personasFiltradas = filtrarPersonas(todosLasPersonas, textoBusqueda);
    let personasOrdenadas = ordenarPersonas(personasFiltradas, campoOrden, direccionOrden);
    mostrarPersonas(personasOrdenadas);
    actualizarContadorResultados(personasOrdenadas.length);
}

function filtrarPersonas(personas, texto) {
    if (!texto || texto.trim() === '') return personas;
    
    return personas.filter(persona => {
        const nombre = (persona.nombre || '').toLowerCase();
        const apellidos = (persona.apellidos || '').toLowerCase();
        const empresa = (persona.empresa || '').toLowerCase();
        return nombre.includes(texto) || apellidos.includes(texto) || empresa.includes(texto);
    });
}

function ordenarPersonas(personas, campo, direccion) {
    const personasCopia = [...personas];
    personasCopia.sort((a, b) => {
        let valorA = (a[campo] || '').toLowerCase();
        let valorB = (b[campo] || '').toLowerCase();
        let comparacion = valorA > valorB ? 1 : valorA < valorB ? -1 : 0;
        return direccion === 'asc' ? comparacion : -comparacion;
    });
    return personasCopia;
}

function mostrarPersonas(personas) {
    const tbody = $("#personas");
    const sinResultados = $("#sinResultados");
    tbody.empty();
    
    if (personas.length === 0) {
        sinResultados.show();
        return;
    }
    
    sinResultados.hide();
    personas.forEach(persona => {
        tbody.append(`<tr><td>${persona.nombre}</td><td>${persona.apellidos || ''}</td><td>${persona.empresa || ''}</td></tr>`);
    });
}

function actualizarBotonesOrden() {
    if (direccionOrden === 'asc') {
        $("#btnAscendente").addClass("active");
        $("#btnDescendente").removeClass("active");
    } else {
        $("#btnDescendente").addClass("active");
        $("#btnAscendente").removeClass("active");
    }
}

function actualizarContadorResultados(cantidad) {
    $("#numResultados").text(cantidad);
}

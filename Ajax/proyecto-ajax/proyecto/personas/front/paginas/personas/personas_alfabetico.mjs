//--------------------------------------------------------------
// Dependencias
//--------------------------------------------------------------
import * as http from "../../js/lib/http.mjs";

//--------------------------------------------------------------
// Variables globales
//--------------------------------------------------------------
let todosLasPersonas = []; // Todas las personas del servidor
let letraSeleccionada = 'A'; // Letra seleccionada por defecto

//--------------------------------------------------------------
// Inicialización
//--------------------------------------------------------------
$(document).ready(() => {
    // Botón para volver
    $("#btVolver").on("click", () => window.location = "personas.html");
    $("#btCerrarSesion").on("click", () => cerrarSesion());
    
    // Cargar personas y generar botones
    cargarPersonas();
});

//--------------------------------------------------------------
// Funciones principales
//--------------------------------------------------------------

/**
 * Carga todas las personas del servidor
 */
function cargarPersonas() {
    http.get(URL_PERSONAS + "?_limit=1000")
        .then((respuesta) => respuesta.json())
        .then(personas => {
            todosLasPersonas = personas;
            generarBotonesAlfabeticos();
            filtrarPorLetra(letraSeleccionada);
        })
        .catch(error => console.error("Error al cargar personas:", error));
}

/**
 * Genera los botones del alfabeto A-Z
 */
function generarBotonesAlfabeticos() {
    const contenedor = $("#botonesAlfabeticos");
    contenedor.empty();
    
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    
    letras.forEach(letra => {
        const boton = $(`<button class="btn btn-outline-primary boton-letra" data-letra="${letra}">${letra}</button>`);
        
        if (letra === letraSeleccionada) {
            boton.removeClass("btn-outline-primary").addClass("btn-primary");
        }
        
        boton.on("click", function() {
            const nuevaLetra = $(this).data("letra");
            seleccionarLetra(nuevaLetra);
        });
        
        contenedor.append(boton);
    });
}

/**
 * Selecciona una letra y actualiza la visualización
 */
function seleccionarLetra(letra) {
    letraSeleccionada = letra;
    
    $(".boton-letra").removeClass("btn-primary").addClass("btn-outline-primary");
    $(`.boton-letra[data-letra="${letra}"]`).removeClass("btn-outline-primary").addClass("btn-primary");
    
    filtrarPorLetra(letra);
}

/**
 * Filtra los contactos por la letra seleccionada
 */
function filtrarPorLetra(letra) {
    const contactosFiltrados = todosLosContactos.filter(contacto => {
        const nombreMayusculas = contacto.nombre.toUpperCase();
        return nombreMayusculas.startsWith(letra);
    });
    
    mostrarContactos(contactosFiltrados);
}

/**
 * Muestra los contactos en la tabla
 */
function mostrarContactos(contactos) {
    const tbody = $("#contactos");
    const sinResultados = $("#sinResultados");
    
    tbody.empty();
    
    if (contactos.length === 0) {
        sinResultados.show();
        return;
    }
    
    sinResultados.hide();
    
    contactos.forEach(contacto => {
        const fila = $(`
            <tr>
                <td>${contacto.nombre}</td>
                <td>${contacto.apellidos || ''}</td>
                <td>${contacto.empresa || ''}</td>
            </tr>
        `);
        tbody.append(fila);
    });
}

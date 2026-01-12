// Importar módulos necesarios
import * as moduloTabla from "../../js/componentes/tabla.mjs";
import * as moduloPaginador from "../../js/componentes/paginador.mjs";
import * as moduloBuscador from "../../js/componentes/buscador.mjs";
import * as moduloToast from "../../js/componentes/toast.mjs";
import * as moduloModalPregunta from "../../js/componentes/modal-pregunta.mjs";
import * as moduloModalMensaje from "../../js/componentes/modal-mensaje.mjs";
import * as http from "../../js/lib/http.mjs";

// Plantilla para mostrar las filas de la tabla
const JSON2HTML_PLANTILLA_TABLA = {
      '<>': 'tr','html': [
        {'<>': 'td','html': '${nombre}'},
        {'<>': 'td','html': '${apellidos}'},
        {'<>': 'td','html': '${empresa}'},
        {'<>':'td','html':'<button name="btEditar" class="btn btn-info bi bi-pencil-fill" value="${id}"></button>'},
        {'<>':'td','html':'<button name="btEliminar" class="btn btn-danger bi bi-trash-fill" value="${id}"></button>'}
      ]
};

// Variable para controlar el orden de la tabla
let ordenActual = 'asc';

// Crear los componentes que vamos a usar
const TABLA_PERSONAS = new moduloTabla.Tabla(URL_PERSONAS, "#personas", JSON2HTML_PLANTILLA_TABLA);
const PAGINADOR = new moduloPaginador.Paginador(
    "#paginador", 
    () => TABLA_PERSONAS.navegarPaginaSiguiente(), 
    () => TABLA_PERSONAS.navegarPaginaAnterior(), 
);
const BUSCADOR = new moduloBuscador.Buscador(
    "#buscador",
    (filtro) => { TABLA_PERSONAS.añadirFiltro(filtro); }
);
const TOAST = new moduloToast.Toast();
const MODAL_PREGUNTA = new moduloModalPregunta.ModalPregunta();
const MODAL_MENSAJE = new moduloModalMensaje.ModalMensaje();

// Cuando la página esté lista, configurar eventos
$(document).ready(() => {
    renderizarComponentes();
    
    // Botón para crear nueva persona
    $("#btAnadir").on("click", () => window.location = "personas_crear.html");

    // Botón para cerrar sesión
    $("#btCerrarSesion").on("click", onCerrarSesion);

    // Botón para cambiar ordenación ascendente/descendente
    $("#btOrdenar").on("click", cambiarOrdenacion);

    // Asigna los eventos asociados a botones de los registros en la tabla
    $("#personas").on("click", "[name=btEditar]", onEditarPersona);
    $("#personas").on("click", "[name=btEliminar]", onEliminarPersona);
});

// Funciones para manejar los eventos

/**
 * Se ejecuta cuando se hace click en editar una persona
 */
function onEditarContacto() {

  const id = $(this).val();
  window.location = "personas_modificar.html?id="+id;
}

/**
 * Se ejecuta cuando se hace click en eliminar una persona
 */
function onEliminarPersona() {
  
  const id = $(this).val();

  // Pide confirmación para eliminar el contacto
  MODAL_PREGUNTA.preguntar(
    "Atención", 
    "¿Está seguro de que desea eliminar el contacto?", 
    () => {

      // Invocar al eliminar.
      eliminarPersona(id);      
    }
  );

  console.log("eliminar persona" + id);
}

/**
 * Cierra la sesión en la aplicación
 */
function onCerrarSesion() {
  cerrarSesion();
}

/**
 * Cambia el orden de los resultados entre ascendente y descendente
 * Esta función alterna entre orden ascendente (A-Z) y descendente (Z-A)
 */
function cambiarOrdenacion() {
  // Cambiamos el orden actual
  if (ordenActual === 'asc') {
    ordenActual = 'desc';
    // Actualizamos el texto del botón
    $("#btOrdenar").html('<i class="bi bi-sort-alpha-up"></i> Descendente');
  } else {
    ordenActual = 'asc';
    // Actualizamos el texto del botón
    $("#btOrdenar").html('<i class="bi bi-sort-alpha-down"></i> Ascendente');
  }
  
  // Recargamos la tabla con el nuevo orden
  // Nota: Esta es una implementación simplificada
  // En una versión más avanzada, modificaríamos el componente Tabla
  // para que acepte parámetros de ordenación
  TABLA_CONTACTOS.renderizar();
}

//--------------------------------------------------------------
// Funciones de utilidad
//--------------------------------------------------------------

/**
 * Muestra el listado de personas.
 */
function renderizarComponentes() {
  TABLA_CONTACTOS.renderizar();
  PAGINADOR.renderizar();
  BUSCADOR.renderizar();
}

/**
 * Elimina la persona pasada como argumento
 * 
 * @param {*} id - El ID de la persona a eliminar
 */
function eliminarPersona(id) {

    // Elimina la persona pasada como argumento
    http.del(URL_PERSONAS, id)
    .then(() => {    

      // Mostrar un mensaje indicando que se ha eliminado.
      TOAST.mostrar("La persona se ha eliminado");

      // Recarga los registros en la tabla
      TABLA_PERSONAS.renderizar();
    });
}



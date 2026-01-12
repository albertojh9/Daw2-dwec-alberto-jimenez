//--------------------------------------------------------------
// Dependencias
//--------------------------------------------------------------
import * as http from "../../js/lib/http.mjs";
import * as formularioModule from "../../js/lib/formulario.mjs";
import * as toastModule from "../../js/componentes/toast.mjs";

//--------------------------------------------------------------
// Constantes
//--------------------------------------------------------------
const toast = new toastModule.Toast();

//--------------------------------------------------------------
// Variables
//--------------------------------------------------------------
let id = -1;

//--------------------------------------------------------------
// Inicialización
//--------------------------------------------------------------
$(document).ready(() => {   
    
    // Obtenemos el ID
    id = Number(window.location.search.split("=")[1]);

    console.debug("ID = "+id);
       
    // Evento para volver a la página con el listado de personas
    $("#btnVolver").on("click", () => window.location = "personas.html");

    // Inicializamos el formulario
    const formulario = new formularioModule.Formulario(
        "#formularioPersonas",
        onPersonaSubmit
    ); 
    
 // Guarda la persona
    http.get(URL_PERSONAS+"/"+id)
    .then((respuesta) => respuesta.json())
    .then(persona => {
        formulario.inicializarCampos(persona);
    });    
});


//--------------------------------------------------
// Eventos
//-------------------------------------------------
function onPersonaSubmit(persona) {
    modificarPersona(persona);
}

//--------------------------------------------------------------
// Funciones de utilidad
//--------------------------------------------------------------

/**
 * Almacena la persona en el servidor
 */
function modificarPersona(persona) {
    
    // Muestra la persona que se va a crear
    console.debug(persona);

    // Guarda la persona
    http.put(URL_PERSONAS+"/"+id, persona)
    .then(() => {
        toast.mostrar("Se ha creado la persona correctamente");        
    });
}

  


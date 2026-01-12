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
// Inicialización
//--------------------------------------------------------------
$(document).ready(() => {   
    
    // Evento para volver a la página con el listado de personas
    $("#btnVolver").on("click", () => window.location = "personas.html");

    // Inicializamos el formulario
    const formulario = new formularioModule.Formulario(
        "#formularioPersonas",
        onPersonaSubmit
    );
});


//--------------------------------------------------
// Eventos
//-------------------------------------------------
function onPersonaSubmit(persona) {
    crearPersona(persona);
}

//--------------------------------------------------------------
// Funciones de utilidad
//--------------------------------------------------------------

/**
 * Almacena la persona en el servidor
 */
function crearPersona(persona) {

    // Muestra la persona que se va a crear
    console.debug(persona);

    // Guarda la persona
    http.post(URL_PERSONAS, persona)
    .then(() => {
        toast.mostrar("Se ha creado la persona correctamente");        
    });
}

  


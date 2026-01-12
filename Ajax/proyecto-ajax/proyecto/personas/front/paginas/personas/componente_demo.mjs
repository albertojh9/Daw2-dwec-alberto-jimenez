import { SelectorContactos } from "./selector-contactos.mjs";

let selector1, selector2, selector3;

$(document).ready(() => {
    // Selector 1: INPUT - configuración básica, OUTPUT - callback onChange
    selector1 = new SelectorContactos('#selector1', {
        label: 'Contacto Principal',
        placeholder: 'Selecciona un contacto...',
        required: true,
        campoMostrar: 'nombre',
        onChange: (id, contacto) => { // OUTPUT del componente
            console.log('Selector 1 - ID:', id, 'Contacto:', contacto);
        }
    });
    
    // Selector 2: INPUT - configuración diferente
    selector2 = new SelectorContactos('#selector2', {
        label: 'Contacto Secundario (nombre completo)',
        placeholder: 'Opcional...',
        required: false,
        campoMostrar: 'completo',
        onChange: (id, contacto) => { // OUTPUT del componente
            console.log('Selector 2 - ID:', id, 'Contacto:', contacto);
        }
    });
    
    // Selector 3: INPUT - configuración por empresa
    selector3 = new SelectorContactos('#selector3', {
        label: 'Filtrar por Empresa',
        placeholder: 'Selecciona una empresa...',
        required: false,
        campoMostrar: 'empresa',
        onChange: (id, contacto) => { // OUTPUT del componente
            console.log('Selector 3 - ID:', id, 'Contacto:', contacto);
        }
    });
    
    $("#btnObtenerValor").on("click", mostrarContactoSeleccionado);
    $("#btnLimpiar").on("click", limpiarSelectores);
    $("#btnVolver").on("click", () => window.location = "contactos.html");
    $("#btCerrarSesion").on("click", () => cerrarSesion());
});

function mostrarContactoSeleccionado() {
    const contacto = selector1.obtenerContactoSeleccionado();
    if (contacto) {
        $("#infoSeleccion").show();
        $("#datosContacto").text(JSON.stringify(contacto, null, 2));
    } else {
        alert('Por favor, selecciona un contacto primero');
    }
}

function limpiarSelectores() {
    selector1.limpiar();
    selector2.limpiar();
    selector3.limpiar();
    $("#infoSeleccion").hide();
}

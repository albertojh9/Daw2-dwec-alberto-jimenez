/**
 * Módulo principal del formulario
 * Gestiona eventos, validaciones, ayuda y envío del formulario
 */

// Importar funciones de validación desde el módulo de validaciones
import {
    validarObligatorio,
    validarDNI,
    validarEmail,
    validarPasswordsIguales
} from './formulario-validaciones.mjs';

/**
 * Array asociativo con los textos de ayuda para cada campo
 * La clave es el ID del campo
 */
const textosAyuda = {
    'nombre': 'Introduce tu nombre (campo obligatorio)',
    'apellidos': 'Introduce tus apellidos (campo obligatorio)',
    'dni': 'Introduce tu DNI con 8 números y una letra (ejemplo: 12345678A)',
    'email': 'Introduce tu dirección de correo electrónico (debe contener @)',
    'password1': 'Introduce una contraseña para tu cuenta',
    'password2': 'Repite la misma contraseña para confirmar'
};

/**
 * Mapa que asocia cada campo con su función de validación
 * La clave es el ID del campo
 */
const validaciones = {
    'nombre': {
        funcion: validarObligatorio,
        mensaje: 'El nombre es obligatorio y no puede estar vacío o contener solo espacios'
    },
    'apellidos': {
        funcion: validarObligatorio,
        mensaje: 'Los apellidos son obligatorios y no pueden estar vacíos o contener solo espacios'
    },
    'dni': {
        funcion: validarDNI,
        mensaje: 'El DNI no es válido. Debe tener 8 números y una letra correcta'
    },
    'email': {
        funcion: validarEmail,
        mensaje: 'El email debe contener el símbolo @'
    },
    'password1': {
        funcion: validarObligatorio,
        mensaje: 'La contraseña es obligatoria'
    },
    'password2': {
        funcion: (valor) => {
            const password1 = $('#password1').val();
            return validarPasswordsIguales(password1, valor);
        },
        mensaje: 'Las contraseñas no coinciden. Deben ser iguales'
    }
};

/**
 * Muestra un texto de ayuda en el div de ayuda
 * @param {string} mensaje - Mensaje de ayuda a mostrar
 */
function mostrarAyuda(mensaje) {
    const $divAyuda = $('#ayuda');
    
    // Quitar clase de error si la tiene
    $divAyuda.removeClass('error-message');
    
    // Si hay mensaje, mostrarlo; si no, limpiar el div
    if (mensaje) {
        $divAyuda.find('p').text(mensaje);
    } else {
        $divAyuda.find('p').text('');
    }
}

/**
 * Muestra un mensaje de error en el div de ayuda y marca el campo con error
 * @param {jQuery} $campo - Campo jQuery que tiene el error
 * @param {string} mensajeError - Mensaje de error a mostrar
 */
function mostrarError($campo, mensajeError) {
    const $divAyuda = $('#ayuda');
    
    // Añadir clase de error al campo
    $campo.addClass('error');
    
    // Añadir clase de error al div de ayuda
    $divAyuda.addClass('error-message');
    
    // Mostrar mensaje de error
    $divAyuda.find('p').text(mensajeError);
}

/**
 * Limpia el mensaje de error de un campo
 * @param {jQuery} $campo - Campo jQuery del que limpiar el error
 */
function limpiarError($campo) {
    const $divAyuda = $('#ayuda');
    
    // Quitar clase de error del campo
    $campo.removeClass('error');
    
    // Quitar clase de error del div de ayuda
    $divAyuda.removeClass('error-message');
    
    // Limpiar el mensaje
    $divAyuda.find('p').text('');
}

/**
 * Valida un campo individual
 * @param {jQuery} $campo - Campo jQuery a validar
 * @returns {boolean} - true si es válido, false si no lo es
 */
function validarCampo($campo) {
    const campoId = $campo.attr('id');
    const valor = $campo.val();
    
    // Verificar si el campo tiene validación
    if (!validaciones[campoId]) {
        return true;
    }
    
    const validacion = validaciones[campoId];
    
    // Ejecutar función de validación
    const esValido = validacion.funcion(valor);
    
    if (!esValido) {
        // Mostrar error
        mostrarError($campo, validacion.mensaje);
        return false;
    } else {
        // Limpiar error
        limpiarError($campo);
        return true;
    }
}

/**
 * Valida todo el formulario
 * @returns {object} - Objeto con isValid (boolean) y primerCampoError (jQuery o null)
 */
function validarFormulario() {
    let primerCampoError = null;
    let todosValidos = true;
    
    // Validar todos los campos del formulario
    $('#formularioCliente input[type="text"], #formularioCliente input[type="email"], #formularioCliente input[type="password"]').each(function() {
        const $campo = $(this);
        const esValido = validarCampo($campo);
        
        if (!esValido && !primerCampoError) {
            primerCampoError = $campo;
            todosValidos = false;
        } else if (!esValido) {
            todosValidos = false;
        }
    });
    
    // Validación especial: las contraseñas deben ser iguales
    // Si no lo son, el error se marca en el primer campo
    const password1 = $('#password1').val();
    const password2 = $('#password2').val();
    
    if (password1 !== password2) {
        const $password1 = $('#password1');
        mostrarError($password1, 'Las contraseñas no coinciden. Por favor, introduce la contraseña en ambos campos de nuevo');
        
        if (!primerCampoError) {
            primerCampoError = $password1;
        }
        todosValidos = false;
    }
    
    return {
        isValid: todosValidos,
        primerCampoError: primerCampoError
    };
}

/**
 * Limpia todos los campos del formulario
 */
function limpiarFormulario() {
    // Limpiar todos los campos
    $('#formularioCliente')[0].reset();
    
    // Limpiar todos los errores
    $('#formularioCliente input').removeClass('error');
    
    // Limpiar el div de ayuda
    $('#ayuda').removeClass('error-message').find('p').text('');
}

/**
 * Inicializa todos los eventos del formulario
 */
function inicializarEventos() {
    // Evento focus: cuando se entra en un campo, mostrar su ayuda
    $('#formularioCliente input').on('focus', function() {
        const campoId = $(this).attr('id');
        const ayuda = textosAyuda[campoId];
        
        // Limpiar error si lo tiene
        limpiarError($(this));
        
        // Mostrar ayuda si existe, si no limpiar el div
        mostrarAyuda(ayuda || '');
    });
    
    // Evento blur: cuando se sale de un campo, validarlo
    $('#formularioCliente input').on('blur', function() {
        validarCampo($(this));
    });
    
    // Evento submit: validar todo el formulario antes de enviar
    $('#formularioCliente').on('submit', function(event) {
        event.preventDefault();
        
        const resultado = validarFormulario();
        
        if (!resultado.isValid) {
            // Si hay errores, poner el foco en el primer campo con error
            if (resultado.primerCampoError) {
                resultado.primerCampoError.focus();
            }
        } else {
            // Si todo es válido, procesar el formulario
            alert('Formulario válido. Datos enviados correctamente.');
            
            // Aquí se podría enviar el formulario mediante AJAX
            // Por ahora solo mostramos los datos en consola
            console.log('Datos del formulario:');
            console.log('Nombre:', $('#nombre').val());
            console.log('Apellidos:', $('#apellidos').val());
            console.log('DNI:', $('#dni').val());
            console.log('Email:', $('#email').val());
            console.log('Contraseña:', $('#password1').val());
        }
    });
    
    // Evento click del botón limpiar
    $('#btnLimpiar').on('click', function() {
        limpiarFormulario();
    });
}

/**
 * Función principal que se ejecuta cuando el DOM está listo
 */
$(document).ready(function() {
    inicializarEventos();
    console.log('Formulario jQuery inicializado correctamente');
});

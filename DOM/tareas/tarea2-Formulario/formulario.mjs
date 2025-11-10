/**
 * Módulo principal del formulario
 * Gestiona la ayuda, validación y eventos del formulario de registro
 */

import {
    validarCampoObligatorio,
    validarEmail,
    validarDNI,
    validarPasswordsIguales
} from './formulario-validaciones.mjs';

// ==================== CONFIGURACIÓN ====================

/**
 * Array asociativo con los mensajes de ayuda para cada campo
 * La clave es el id del campo
 */
const ayudas = {
    nombre: 'Introduzca su nombre. Este campo es obligatorio.',
    apellidos: 'Introduzca sus apellidos. Este campo es obligatorio.',
    dni: 'Introduzca su DNI con 8 dígitos y la letra (ejemplo: 12345678Z). El DNI debe ser válido.',
    email: 'Introduzca su dirección de correo electrónico. Debe contener una @.',
    password1: 'Introduzca una contraseña para su cuenta. Este campo es obligatorio.',
    password2: 'Repita la contraseña introducida anteriormente. Debe coincidir con la primera contraseña.'
};

/**
 * Mapa que asocia cada campo con su función de validación correspondiente
 * La clave es el id del campo y el valor es un objeto con la función y el mensaje de error
 */
const validaciones = {
    nombre: {
        funcion: validarCampoObligatorio,
        mensaje: 'El nombre es obligatorio y no puede estar vacío ni contener solo espacios.'
    },
    apellidos: {
        funcion: validarCampoObligatorio,
        mensaje: 'Los apellidos son obligatorios y no pueden estar vacíos ni contener solo espacios.'
    },
    dni: {
        funcion: validarDNI,
        mensaje: 'El DNI no es válido. Debe tener 8 dígitos y una letra correcta (ejemplo: 12345678Z).'
    },
    email: {
        funcion: validarEmail,
        mensaje: 'El email debe contener al menos una arroba (@).'
    },
    password1: {
        funcion: validarCampoObligatorio,
        mensaje: 'La contraseña es obligatoria y no puede estar vacía.'
    },
    password2: {
        funcion: (valor) => {
            const password1 = document.getElementById('password1').value;
            return validarPasswordsIguales(password1, valor);
        },
        mensaje: 'Las contraseñas no coinciden. Por favor, asegúrese de que ambas sean iguales.'
    }
};

// ==================== FUNCIONES DE AYUDA ====================

/**
 * Muestra un mensaje de ayuda en el div de ayuda
 * @param {string} mensaje - El mensaje de ayuda a mostrar
 */
function mostrarAyuda(mensaje) {
    const divAyuda = document.getElementById('ayuda');
    const parrafo = divAyuda.querySelector('p');
    
    // Limpiar clases de error si existieran
    divAyuda.classList.remove('error-message');
    
    if (mensaje) {
        parrafo.textContent = mensaje;
    } else {
        parrafo.textContent = '';
    }
}

// ==================== FUNCIONES DE VALIDACIÓN Y ERRORES ====================

/**
 * Muestra un mensaje de error para un campo específico
 * @param {HTMLElement} campo - El elemento del campo que tiene el error
 * @param {string} mensaje - El mensaje de error a mostrar
 */
function mostrarError(campo, mensaje) {
    // Cambiar el estilo del campo (fondo rojo)
    campo.classList.add('error');
    
    // Mostrar el mensaje de error en el div de ayuda
    const divAyuda = document.getElementById('ayuda');
    const parrafo = divAyuda.querySelector('p');
    
    divAyuda.classList.add('error-message');
    parrafo.textContent = mensaje;
}

/**
 * Limpia el mensaje de error de un campo
 * @param {HTMLElement} campo - El elemento del campo del cual limpiar el error
 */
function limpiarError(campo) {
    // Quitar el estilo de error del campo
    campo.classList.remove('error');
    
    // Limpiar el div de ayuda
    const divAyuda = document.getElementById('ayuda');
    const parrafo = divAyuda.querySelector('p');
    
    divAyuda.classList.remove('error-message');
    parrafo.textContent = '';
}

/**
 * Valida un campo individual según su configuración
 * @param {HTMLElement} campo - El elemento del campo a validar
 * @returns {boolean} - true si es válido, false si no
 */
function validarCampo(campo) {
    const idCampo = campo.id;
    const valor = campo.value;
    
    // Verificar si el campo tiene validación configurada
    if (!validaciones[idCampo]) {
        return true;
    }
    
    const configuracion = validaciones[idCampo];
    const esValido = configuracion.funcion(valor);
    
    if (!esValido) {
        mostrarError(campo, configuracion.mensaje);
        return false;
    } else {
        limpiarError(campo);
        return true;
    }
}

// ==================== EVENTOS DE AYUDA ====================

/**
 * Maneja el evento de entrada (focus) en un campo
 * Muestra la ayuda correspondiente al campo
 */
function manejarEntradaCampo(event) {
    const campo = event.target;
    const idCampo = campo.id;
    
    // Limpiar cualquier error previo
    limpiarError(campo);
    
    // Mostrar ayuda si existe, sino limpiar el div
    if (ayudas[idCampo]) {
        mostrarAyuda(ayudas[idCampo]);
    } else {
        mostrarAyuda('');
    }
}

/**
 * Maneja el evento de salida (blur) de un campo
 * Valida el campo cuando el usuario sale de él
 */
function manejarSalidaCampo(event) {
    const campo = event.target;
    
    // Solo validar si el campo tiene algún valor o si está configurado para validación
    if (campo.value.trim() !== '' || validaciones[campo.id]) {
        validarCampo(campo);
    }
}

// ==================== VALIDACIÓN DEL FORMULARIO ====================

/**
 * Valida todo el formulario antes de enviarlo
 * @param {Event} event - El evento de submit del formulario
 */
function validarFormulario(event) {
    event.preventDefault();
    
    const formulario = document.getElementById('formularioCliente');
    const campos = formulario.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    
    let primerCampoConError = null;
    let todosValidos = true;
    
    // Validar todos los campos
    campos.forEach(campo => {
        const esValido = validarCampo(campo);
        
        if (!esValido) {
            todosValidos = false;
            
            // Guardar el primer campo con error
            if (!primerCampoConError) {
                primerCampoConError = campo;
            }
        }
    });
    
    // Validación especial: las contraseñas deben ser iguales
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');
    
    if (!validarPasswordsIguales(password1.value, password2.value)) {
        todosValidos = false;
        
        // Marcar el error en el primer campo de contraseña
        mostrarError(password1, 'Las contraseñas no coinciden. Por favor, introduzca la contraseña en ambos campos de nuevo.');
        
        if (!primerCampoConError) {
            primerCampoConError = password1;
        }
        
        // También marcar el segundo campo como erróneo visualmente
        password2.classList.add('error');
    }
    
    // Si hay errores, poner el foco en el primer campo con error
    if (!todosValidos && primerCampoConError) {
        primerCampoConError.focus();
        return false;
    }
    
    // Si todo es válido, aquí se enviaría el formulario
    if (todosValidos) {
        alert('Formulario válido. Los datos se enviarían correctamente.');
        // formulario.submit(); // Descomentar para enviar realmente
    }
    
    return todosValidos;
}

/**
 * Limpia todos los campos del formulario y los mensajes de ayuda/error
 */
function limpiarFormulario() {
    const formulario = document.getElementById('formularioCliente');
    const campos = formulario.querySelectorAll('input');
    
    // Limpiar todos los campos
    campos.forEach(campo => {
        campo.value = '';
        limpiarError(campo);
    });
    
    // Limpiar el div de ayuda
    mostrarAyuda('');
    
    // Poner el foco en el primer campo
    document.getElementById('nombre').focus();
}

// ==================== INICIALIZACIÓN ====================

/**
 * Inicializa todos los eventos del formulario
 */
function inicializar() {
    const formulario = document.getElementById('formularioCliente');
    const btnLimpiar = document.getElementById('btnLimpiar');
    const campos = formulario.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    
    // Agregar eventos focus a todos los campos para mostrar ayuda
    campos.forEach(campo => {
        campo.addEventListener('focus', manejarEntradaCampo);
        campo.addEventListener('blur', manejarSalidaCampo);
    });
    
    // Evento de submit del formulario
    formulario.addEventListener('submit', validarFormulario);
    
    // Evento del botón limpiar
    btnLimpiar.addEventListener('click', limpiarFormulario);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);

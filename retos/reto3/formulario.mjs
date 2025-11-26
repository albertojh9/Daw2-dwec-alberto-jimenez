/**
 * Módulo principal del formulario con validación de código de 4 dígitos
 */

import {
    validarObligatorio,
    validarDNI,
    validarEmail,
    validarPasswordsIguales,
    validarCodigo4Digitos
} from './formulario-validaciones.mjs';

// Textos de ayuda para cada campo
const textosAyuda = {
    'nombre': 'Introduce tu nombre (campo obligatorio)',
    'apellidos': 'Introduce tus apellidos (campo obligatorio)',
    'dni': 'Introduce tu DNI con 8 números y una letra (ejemplo: 12345678A)',
    'codigo': 'Introduce un código de exactamente 4 dígitos (ejemplo: 0001, 1234)',
    'email': 'Introduce tu dirección de correo electrónico (debe contener @)',
    'password1': 'Introduce una contraseña para tu cuenta',
    'password2': 'Repite la misma contraseña para confirmar'
};

// Mapa de validaciones
const validaciones = {
    'nombre': {
        funcion: validarObligatorio,
        mensaje: 'El nombre es obligatorio'
    },
    'apellidos': {
        funcion: validarObligatorio,
        mensaje: 'Los apellidos son obligatorios'
    },
    'dni': {
        funcion: validarDNI,
        mensaje: 'El DNI no es válido'
    },
    'codigo': {
        funcion: validarCodigo4Digitos,
        mensaje: 'El código debe tener exactamente 4 dígitos (ejemplo: 0001, 1234, 9999)'
    },
    'email': {
        funcion: validarEmail,
        mensaje: 'El email debe contener @'
    },
    'password1': {
        funcion: validarObligatorio,
        mensaje: 'La contraseña es obligatoria'
    },
    'password2': {
        funcion: (valor) => {
            const password1 = document.getElementById('password1').value;
            return validarPasswordsIguales(password1, valor);
        },
        mensaje: 'Las contraseñas no coinciden'
    }
};

// Mostrar ayuda
function mostrarAyuda(mensaje) {
    const divAyuda = document.getElementById('ayuda');
    divAyuda.classList.remove('error-message');
    
    if (mensaje) {
        divAyuda.querySelector('p').textContent = mensaje;
    } else {
        divAyuda.querySelector('p').textContent = '';
    }
}

// Mostrar error
function mostrarError(campo, mensajeError) {
    const divAyuda = document.getElementById('ayuda');
    campo.classList.add('error');
    divAyuda.classList.add('error-message');
    divAyuda.querySelector('p').textContent = mensajeError;
}

// Limpiar error
function limpiarError(campo) {
    const divAyuda = document.getElementById('ayuda');
    campo.classList.remove('error');
    divAyuda.classList.remove('error-message');
    divAyuda.querySelector('p').textContent = '';
}

// Validar un campo individual
function validarCampo(campo) {
    const campoId = campo.id;
    const valor = campo.value;
    
    if (!validaciones[campoId]) {
        return true;
    }
    
    const validacion = validaciones[campoId];
    const esValido = validacion.funcion(valor);
    
    if (!esValido) {
        mostrarError(campo, validacion.mensaje);
        return false;
    } else {
        limpiarError(campo);
        return true;
    }
}

// Validar todo el formulario
function validarFormulario() {
    let primerCampoError = null;
    let todosValidos = true;
    
    const campos = document.querySelectorAll('#formularioCliente input[type="text"], #formularioCliente input[type="email"], #formularioCliente input[type="password"]');
    
    campos.forEach(campo => {
        const esValido = validarCampo(campo);
        
        if (!esValido && !primerCampoError) {
            primerCampoError = campo;
            todosValidos = false;
        } else if (!esValido) {
            todosValidos = false;
        }
    });
    
    return {
        isValid: todosValidos,
        primerCampoError: primerCampoError
    };
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById('formularioCliente').reset();
    document.querySelectorAll('#formularioCliente input').forEach(input => {
        input.classList.remove('error');
    });
    document.getElementById('ayuda').classList.remove('error-message');
    document.querySelector('#ayuda p').textContent = '';
}

// Inicializar eventos
function inicializarEventos() {
    // Evento focus
    document.querySelectorAll('#formularioCliente input').forEach(input => {
        input.addEventListener('focus', function() {
            const ayuda = textosAyuda[this.id];
            limpiarError(this);
            mostrarAyuda(ayuda || '');
        });
    });
    
    // Evento blur
    document.querySelectorAll('#formularioCliente input').forEach(input => {
        input.addEventListener('blur', function() {
            validarCampo(this);
        });
    });
    
    // Evento submit - CORREGIDO: Cancelar evento correctamente
    document.getElementById('formularioCliente').addEventListener('submit', function(event) {
        // IMPORTANTE: Cancelar el evento por defecto para evitar el envío
        event.preventDefault();
        event.stopPropagation();
        
        const resultado = validarFormulario();
        
        if (!resultado.isValid) {
            if (resultado.primerCampoError) {
                resultado.primerCampoError.focus();
            }
        } else {
            alert('✅ Formulario válido. Datos enviados correctamente.');
            console.log('Datos:', {
                nombre: document.getElementById('nombre').value,
                apellidos: document.getElementById('apellidos').value,
                dni: document.getElementById('dni').value,
                codigo: document.getElementById('codigo').value,
                email: document.getElementById('email').value
            });
        }
        
        // Asegurar que no se envíe el formulario
        return false;
    });
    
    // Botón limpiar
    document.getElementById('btnLimpiar').addEventListener('click', limpiarFormulario);
}

// Inicializar cuando cargue el DOM
document.addEventListener('DOMContentLoaded', inicializarEventos);

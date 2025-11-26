/**
 * Formulario jQuery con evento de submit correctamente cancelado
 * CORRECCIÓN: Se añade preventDefault() para evitar el envío del formulario
 */

// Validaciones básicas
function validarObligatorio(valor) {
    return valor.trim().length > 0;
}

function validarDNI(dni) {
    dni = dni.trim().toUpperCase();
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    if (!dniRegex.test(dni)) return false;
    
    const numero = parseInt(dni.substr(0, 8), 10);
    const letraIntroducida = dni.charAt(8);
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const letraCalculada = letras.charAt(numero % 23);
    
    return letraIntroducida === letraCalculada;
}

function validarEmail(email) {
    if (email.trim().length === 0) return false;
    return email.includes('@');
}

// Textos de ayuda
const textosAyuda = {
    'nombre': 'Introduce tu nombre (campo obligatorio)',
    'apellidos': 'Introduce tus apellidos (campo obligatorio)',
    'dni': 'Introduce tu DNI con 8 números y una letra',
    'email': 'Introduce tu email (debe contener @)',
    'password1': 'Introduce una contraseña',
    'password2': 'Repite la misma contraseña'
};

// Validaciones
const validaciones = {
    'nombre': { funcion: validarObligatorio, mensaje: 'El nombre es obligatorio' },
    'apellidos': { funcion: validarObligatorio, mensaje: 'Los apellidos son obligatorios' },
    'dni': { funcion: validarDNI, mensaje: 'El DNI no es válido' },
    'email': { funcion: validarEmail, mensaje: 'El email debe contener @' },
    'password1': { funcion: validarObligatorio, mensaje: 'La contraseña es obligatoria' },
    'password2': {
        funcion: (valor) => {
            const password1 = $('#password1').val();
            return password1 === valor && valor.trim().length > 0;
        },
        mensaje: 'Las contraseñas no coinciden'
    }
};

function mostrarAyuda(mensaje) {
    const $divAyuda = $('#ayuda');
    $divAyuda.removeClass('error-message');
    $divAyuda.find('p').text(mensaje || '');
}

function mostrarError($campo, mensajeError) {
    $campo.addClass('error');
    $('#ayuda').addClass('error-message').find('p').text(mensajeError);
}

function limpiarError($campo) {
    $campo.removeClass('error');
    $('#ayuda').removeClass('error-message').find('p').text('');
}

function validarCampo($campo) {
    const campoId = $campo.attr('id');
    const valor = $campo.val();
    
    if (!validaciones[campoId]) return true;
    
    const validacion = validaciones[campoId];
    const esValido = validacion.funcion(valor);
    
    if (!esValido) {
        mostrarError($campo, validacion.mensaje);
        return false;
    } else {
        limpiarError($campo);
        return true;
    }
}

function validarFormulario() {
    let primerCampoError = null;
    let todosValidos = true;
    
    $('#formularioCliente input').each(function() {
        const $campo = $(this);
        const esValido = validarCampo($campo);
        
        if (!esValido && !primerCampoError) {
            primerCampoError = $campo;
            todosValidos = false;
        } else if (!esValido) {
            todosValidos = false;
        }
    });
    
    return { isValid: todosValidos, primerCampoError: primerCampoError };
}

function limpiarFormulario() {
    $('#formularioCliente')[0].reset();
    $('#formularioCliente input').removeClass('error');
    $('#ayuda').removeClass('error-message').find('p').text('');
}

// Inicializar eventos
$(document).ready(function() {
    // Evento focus
    $('#formularioCliente input').on('focus', function() {
        const campoId = $(this).attr('id');
        const ayuda = textosAyuda[campoId];
        limpiarError($(this));
        mostrarAyuda(ayuda || '');
    });
    
    // Evento blur
    $('#formularioCliente input').on('blur', function() {
        validarCampo($(this));
    });
    
    // CORRECCIÓN: Evento submit con preventDefault()
    $('#formularioCliente').on('submit', function(event) {
        // IMPORTANTE: Cancelar el evento por defecto
        event.preventDefault();
        
        const resultado = validarFormulario();
        
        if (!resultado.isValid) {
            if (resultado.primerCampoError) {
                resultado.primerCampoError.focus();
            }
        } else {
            alert('✅ Formulario válido. Datos procesados correctamente.');
            console.log('Datos:', {
                nombre: $('#nombre').val(),
                apellidos: $('#apellidos').val(),
                dni: $('#dni').val(),
                email: $('#email').val()
            });
        }
        
        // Asegurar que no se envíe
        return false;
    });
    
    // Botón limpiar
    $('#btnLimpiar').on('click', limpiarFormulario);
    
    console.log('✅ Formulario jQuery inicializado - Evento submit cancelado correctamente');
});

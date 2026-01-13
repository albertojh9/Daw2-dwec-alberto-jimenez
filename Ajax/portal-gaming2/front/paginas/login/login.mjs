// Pagina de login con JWT
// Alberto Jimenez - 2º DAW

// variables globales
let intentosLogin = 0;
const MAX_INTENTOS = 3;

// cuando se carga la pagina
$(document).ready(function() {
    console.log('Iniciando login con JWT...');
    
    // configurar el formulario
    $('#frmlogin').on('submit', function(e) {
        e.preventDefault();
        realizarLogin();
    });
    
    // poner foco en email
    $('#email').focus();
});

// funcion de login con JWT
function realizarLogin() {
    const email = $('#email').val().trim();
    const password = $('#password').val();
    
    // validacion basica
    if (!email || !password) {
        alert('Por favor, rellena todos los campos');
        return;
    }
    
    // crear objeto de login
    const datosLogin = {
        email: email,
        password: password
    };
    
    // enviar peticion de login al servidor
    fetch(URL_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosLogin)
    })
    .then(respuesta => {
        if (respuesta.ok) {
            respuesta.json().then(resultado => {
                // guardar token JWT
                const token = resultado.accessToken;
                localStorage.setItem('jwtToken', token);
                
                // ir a la pagina principal
                window.location.href = '/paginas/videojuegos/videojuegos.html';
            });
        } else {
            intentosLogin++;
            if (intentosLogin >= MAX_INTENTOS) {
                alert('Demasiados intentos fallidos. Recarga la página.');
                $('#frmlogin')[0].reset();
                intentosLogin = 0;
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        }
    })
    .catch(error => {
        alert('Error de conexión con el servidor');
        console.error('Error:', error);
    });
}
}

/**
 * Verifica si ya hay una sesión activa
 */
function verificarSesionExistente() {
    const token = sessionStorage.getItem('token');
    
    if (token) {
        console.log('🔍 Token encontrado, verificando validez...');
        mostrarNotificacion('Redirigiendo...', 'info');
        
        // Redirigir a la página principal
        setTimeout(() => {
            window.location.href = '../videojuegos/videojuegos.html';
        }, 1000);
    }
}

/**
 * Realiza el proceso de login
 */
async function realizarLogin() {
    
    // Validar formulario antes de enviar
    if (!validarFormulario()) {
        mostrarNotificacion('Por favor, corrige los errores del formulario', 'error');
        return;
    }
    
    // Obtener datos del formulario
    const email = $('#email').val().trim();
    const password = $('#password').val();
    
    // Datos para enviar al servidor
    const datosLogin = {
        email: email,
        password: password
    };
    
    try {
        // Mostrar indicador de carga
        mostrarCargandoLogin(true);
        
        console.log('🔐 Iniciando proceso de login...');
        
        const response = await fetch(`${environment.apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosLogin)
        });
        
        if (response.ok) {
            const resultado = await response.json();
            
            // Login exitoso
            const token = resultado.accessToken;
            const usuario = resultado.user;
            
            // Almacenar datos de la sesión
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
            
            console.log('✅ Login exitoso');
            mostrarNotificacion('¡Bienvenido a GameHub Manager!', 'success');
            
            // Redirigir después de un breve delay
            setTimeout(() => {
                window.location.href = '../videojuegos/videojuegos.html';
            }, 1500);
            
        } else {
            // Login fallido
            intentosLogin++;
            
            const mensajeError = await response.text();
            console.log(`❌ Login fallido (intento ${intentosLogin}/${MAX_INTENTOS})`);
            
            manejarErrorLogin(mensajeError);
        }
        
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        mostrarNotificacion('No se puede conectar con el servidor. Verifica tu conexión.', 'error');
        
    } finally {
        mostrarCargandoLogin(false);
    }
}

/**
 * Maneja los errores de login
 */
function manejarErrorLogin(mensajeError) {
    
    // Limpiar contraseña por seguridad
    $('#password').val('');
    
    if (intentosLogin >= MAX_INTENTOS) {
        // Bloquear formulario temporalmente
        bloquearFormulario();
        mostrarNotificacion(`Demasiados intentos fallidos. Formulario bloqueado por 30 segundos.`, 'error');
    } else {
        const intentosRestantes = MAX_INTENTOS - intentosLogin;
        mostrarNotificacion(`Credenciales incorrectas. Te quedan ${intentosRestantes} intentos.`, 'error');
        
        // Agregar clase de error a los campos
        $('#email, #password').addClass('is-invalid');
        
        // Focus en email para reintentar
        $('#email').focus();
    }
}

/**
 * Bloquea el formulario temporalmente
 */
function bloquearFormulario() {
    $('#btnLogin').prop('disabled', true);
    $('#email, #password').prop('disabled', true);
    
    // Cuenta regresiva de 30 segundos
    let contador = 30;
    const originalText = $('#btnLogin').html();
    
    const interval = setInterval(() => {
        $('#btnLogin').html(`<i class=\"bi bi-lock\"></i> Bloqueado (${contador}s)`);
        contador--;
        
        if (contador < 0) {
            clearInterval(interval);
            desbloquearFormulario();
            $('#btnLogin').html(originalText);
        }
    }, 1000);
}

/**
 * Desbloquea el formulario
 */
function desbloquearFormulario() {
    $('#btnLogin').prop('disabled', false);
    $('#email, #password').prop('disabled', false);
    $('#email, #password').removeClass('is-invalid');
    intentosLogin = 0;
    
    mostrarNotificacion('Formulario desbloqueado. Puedes intentar de nuevo.', 'info');
}

/**
 * Muestra/oculta indicador de carga en el botón de login
 */
function mostrarCargandoLogin(mostrar) {
    const boton = $('#btnLogin');
    
    if (mostrar) {
        boton.prop('disabled', true);
        boton.html('<span class="spinner-border spinner-border-sm me-2"></span>Iniciando sesión...');
    } else {
        boton.prop('disabled', false);
        boton.html('<i class="bi bi-box-arrow-in-right me-1"></i> Iniciar Sesión');
    }
}

/**
 * Alterna la visibilidad de la contraseña
 */
function togglePasswordVisibility() {
    const passwordField = $('#password');
    const toggleButton = $('#togglePassword i');
    
    if (passwordField.attr('type') === 'password') {
        passwordField.attr('type', 'text');
        toggleButton.removeClass('bi-eye').addClass('bi-eye-slash');
    } else {
        passwordField.attr('type', 'password');
        toggleButton.removeClass('bi-eye-slash').addClass('bi-eye');
    }
}

/**
 * Valida el campo de email
 */
function validarEmail() {
    const email = $('#email').val().trim();
    const emailField = $('#email');
    
    // Regex básica para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        emailField.removeClass('is-valid').addClass('is-invalid');
        return false;
    } else if (!emailRegex.test(email)) {
        emailField.removeClass('is-valid').addClass('is-invalid');
        return false;
    } else {
        emailField.removeClass('is-invalid').addClass('is-valid');
        return true;
    }
}

/**
 * Valida el campo de contraseña
 */
function validarPassword() {
    const password = $('#password').val();
    const passwordField = $('#password');
    
    if (!password || password.length < 6) {
        passwordField.removeClass('is-valid').addClass('is-invalid');
        return false;
    } else {
        passwordField.removeClass('is-invalid').addClass('is-valid');
        return true;
    }
}

/**
 * Valida todo el formulario
 */
function validarFormulario() {
    const emailValido = validarEmail();
    const passwordValida = validarPassword();
    
    return emailValido && passwordValida;
}

/**
 * Muestra una notificación toast
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
    const toast = $('#toastLogin');
    const body = toast.find('.toast-body');
    const header = toast.find('.toast-header i');
    
    // Configurar icono según el tipo
    switch (tipo) {
        case 'success':
            header.removeClass().addClass('bi bi-check-circle text-success me-2');
            break;
        case 'error':
            header.removeClass().addClass('bi bi-exclamation-triangle text-danger me-2');
            break;
        default:
            header.removeClass().addClass('bi bi-controller text-primary me-2');
    }
    
    body.text(mensaje);
    
    const bsToast = new bootstrap.Toast(toast[0]);
    bsToast.show();
}


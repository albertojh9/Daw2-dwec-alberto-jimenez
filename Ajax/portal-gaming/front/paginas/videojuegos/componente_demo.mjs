/**
 * DEMOSTRACIÓN DEL COMPONENTE REUTILIZABLE
 * Implementa y demuestra el uso del RatingSelector
 * Autor: Alberto Jiménez - 2º DAW
 * Fecha: Enero 2026
 */

// Importar el componente reutilizable
import { RatingSelector } from './rating-selector.mjs';

// Variables globales para las instancias del componente
let ratingBasico;
let ratingInicial;
let ratingLectura;

/**
 * Inicialización cuando se carga el DOM
 */
$(document).ready(function() {
    console.log('⚙️ Iniciando demostración del componente...');
    
    configurarEventListeners();
    inicializarComponentes();
    
    logEvento('Demostración iniciada correctamente');
});

/**
 * Configura los event listeners de la página
 */
function configurarEventListeners() {
    
    // Botón para probar funcionalidades
    $('#btProbarComponente').on('click', function() {
        probarFuncionalidades();
    });
    
    // Botón para reiniciar valores
    $('#btReiniciar').on('click', function() {
        reiniciarComponentes();
    });
    
    // Botón cerrar sesión
    $('#btCerrarSesion').on('click', function() {
        cerrarSesion();
    });
    
    console.log('✅ Event listeners configurados');
}

/**
 * Inicializa todas las instancias del componente
 */
function inicializarComponentes() {
    
    // Componente básico (interactivo)
    ratingBasico = new RatingSelector('#rating1', {
        valor: 0,
        readonly: false,
        onChange: function(valor) {
            $('#valor1').text(valor);
            logEvento(`Componente básico cambiado a: ${valor}`);
            mostrarNotificacion(`Puntuación seleccionada: ${valor}`, 'info');
        }
    });
    
    // Componente con valor inicial
    ratingInicial = new RatingSelector('#rating2', {
        valor: 7.5,
        readonly: false,
        onChange: function(valor) {
            $('#valor2').text(valor);
            logEvento(`Componente con valor inicial cambiado a: ${valor}`);
        }
    });
    
    // Componente de solo lectura
    ratingLectura = new RatingSelector('#rating3', {
        valor: 8.8,
        readonly: true,
        onChange: function(valor) {
            // No debería ejecutarse nunca al ser readonly
            logEvento(`⚠️ Evento inesperado en componente readonly: ${valor}`);
        }
    });
    
    logEvento('Componentes inicializados correctamente');
    console.log('✅ Componentes RatingSelector inicializados');
}

/**
 * Prueba las funcionalidades del componente programáticamente
 */
function probarFuncionalidades() {
    logEvento('Iniciando prueba automática de funcionalidades...');
    
    let paso = 0;
    const pasos = [
        () => {
            ratingBasico.setValue(3.5);
            logEvento('Paso 1: Establecer valor 3.5 en componente básico');
        },
        () => {
            ratingInicial.setValue(9.2);
            logEvento('Paso 2: Establecer valor 9.2 en componente inicial');
        },
        () => {
            const valor1 = ratingBasico.getValue();
            const valor2 = ratingInicial.getValue();
            logEvento(`Paso 3: Valores actuales - Básico: ${valor1}, Inicial: ${valor2}`);
        },
        () => {
            ratingBasico.setValue(6.0);
            ratingInicial.setValue(4.5);
            logEvento('Paso 4: Cambiar valores finales');
        },
        () => {
            logEvento('✅ Prueba automática completada');
            mostrarNotificacion('Prueba de funcionalidades completada', 'success');
        }
    ];
    
    // Ejecutar pasos con delay para visualizar los cambios
    function ejecutarPaso() {
        if (paso < pasos.length) {
            pasos[paso]();
            paso++;
            setTimeout(ejecutarPaso, 1000);
        }
    }
    
    ejecutarPaso();
}

/**
 * Reinicia todos los componentes a sus valores iniciales
 */
function reiniciarComponentes() {
    ratingBasico.setValue(0);
    ratingInicial.setValue(7.5);
    // El de lectura no se cambia
    
    $('#valor1').text('0');
    $('#valor2').text('7.5');
    
    logEvento('🔄 Componentes reiniciados a valores iniciales');
    mostrarNotificacion('Componentes reiniciados', 'info');
}

/**
 * Registra un evento en el log
 */
function logEvento(mensaje) {
    const timestamp = new Date().toLocaleTimeString();
    const logElement = $('#logEventos');
    
    const eventoHtml = `<div class="mb-1"><small class="text-muted">[${timestamp}]</small> ${mensaje}</div>`;
    logElement.append(eventoHtml);
    
    // Scroll automático al final
    logElement.scrollTop(logElement[0].scrollHeight);
}

/**
 * Muestra una notificación toast
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
    const toast = $('#toastNotificacion');
    const body = toast.find('.toast-body');
    const header = toast.find('.toast-header i');
    
    switch (tipo) {
        case 'success':
            header.removeClass().addClass('bi bi-check-circle text-success me-2');
            break;
        case 'error':
            header.removeClass().addClass('bi bi-exclamation-triangle text-danger me-2');
            break;
        default:
            header.removeClass().addClass('bi bi-info-circle text-primary me-2');
    }
    
    body.text(mensaje);
    
    const bsToast = new bootstrap.Toast(toast[0]);
    bsToast.show();
}

/**
 * Cierra la sesión del usuario
 */
function cerrarSesion() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    
    mostrarNotificacion('Sesión cerrada correctamente', 'success');
    
    setTimeout(() => {
        window.location.href = '../login/login.html';
    }, 1000);
    
    console.log('👋 Sesión cerrada');
}
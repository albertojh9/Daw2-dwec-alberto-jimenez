// Busqueda alfabetica de videojuegos
// navegar por las letras del abecedario
// Alberto Jimenez - 2º DAW

// variables globales
let videojuegos = [];           // todos los videojuegos
let letraSeleccionada = null;   // que letra esta seleccionada
let contadorPorLetra = {};      // cuantos videojuegos hay por cada letra

// cuando se carga la pagina
$(document).ready(function() {
    console.log('Iniciando busqueda alfabetica...');
    
    configurarEventListeners();
    generarPanelAlfabeto();
    cargarVideojuegos();
});

// configurar los event listeners
function configurarEventListeners() {
    // boton cerrar sesion
    $('#btCerrarSesion').on('click', function() {
        cerrarSesion();
    });
    
    console.log('✅ Event listeners configurados');
}

/**
 * Genera el panel con todas las letras del alfabeto
 */
function generarPanelAlfabeto() {
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const panel = $('#panelAlfabeto');
    panel.empty();
    
    alfabeto.forEach(letra => {
        const boton = `
            <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-2">
                <button type="button" 
                        class="btn btn-outline-primary w-100 btn-letra" 
                        data-letra="${letra}">
                    <strong>${letra}</strong>
                    <small class="d-block contador-letra" id="contador-${letra}">0</small>
                </button>
            </div>
        `;
        panel.append(boton);
    });
    
    // Configurar eventos de los botones de letra
    $('.btn-letra').on('click', function() {
        const letra = $(this).data('letra');
        seleccionarLetra(letra);
    });
    
    console.log('✅ Panel alfabético generado');
}

/**
 * Carga todos los videojuegos desde la API
 */
async function cargarVideojuegos() {
    try {
        mostrarCargando();
        
        const response = await fetch(`${environment.apiUrl}/videojuegos`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        videojuegos = await response.json();
        
        // Calcular contador por letra
        calcularContadorPorLetra();
        
        // Actualizar contadores en el panel
        actualizarContadores();
        
        console.log(`📦 Cargados ${videojuegos.length} videojuegos`);
        
    } catch (error) {
        console.error('❌ Error cargando videojuegos:', error);
        mostrarError('Error al cargar los videojuegos');
    }
}

/**
 * Calcula cuántos videojuegos hay por cada letra
 */
function calcularContadorPorLetra() {
    contadorPorLetra = {};
    
    // Inicializar contadores en 0
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letra => {
        contadorPorLetra[letra] = 0;
    });
    
    // Contar videojuegos por letra inicial
    videojuegos.forEach(videojuego => {
        const primeraLetra = videojuego.titulo.charAt(0).toUpperCase();
        if (contadorPorLetra.hasOwnProperty(primeraLetra)) {
            contadorPorLetra[primeraLetra]++;
        }
    });
    
    console.log('📊 Contadores por letra calculados:', contadorPorLetra);
}

/**
 * Actualiza los contadores visibles en los botones
 */
function actualizarContadores() {
    Object.keys(contadorPorLetra).forEach(letra => {
        const contador = contadorPorLetra[letra];
        const elementoContador = $(`#contador-${letra}`);
        elementoContador.text(contador);
        
        // Deshabilitar botones que no tienen videojuegos
        const boton = $(`.btn-letra[data-letra=\"${letra}\"]`);
        if (contador === 0) {
            boton.addClass('disabled').prop('disabled', true);
            boton.removeClass('btn-outline-primary').addClass('btn-outline-secondary');
        } else {
            boton.removeClass('disabled btn-outline-secondary').addClass('btn-outline-primary').prop('disabled', false);
        }
    });
    
    console.log('✅ Contadores actualizados en la interfaz');
}

/**
 * Selecciona una letra y muestra los videojuegos correspondientes
 */
function seleccionarLetra(letra) {
    letraSeleccionada = letra;
    
    // Actualizar estado visual de los botones
    $('.btn-letra').removeClass('btn-primary').addClass('btn-outline-primary');
    $(`.btn-letra[data-letra=\"${letra}\"]`).removeClass('btn-outline-primary').addClass('btn-primary');
    
    // Filtrar videojuegos por la letra seleccionada
    const videojuegosFiltrados = videojuegos.filter(videojuego => {
        return videojuego.titulo.charAt(0).toUpperCase() === letra;
    });
    
    // Ordenar alfabéticamente
    videojuegosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
    
    // Mostrar información de la selección
    mostrarInfoSeleccion(letra, videojuegosFiltrados.length);
    
    // Mostrar resultados
    mostrarResultados(videojuegosFiltrados);
    
    console.log(`🔤 Letra seleccionada: ${letra}, encontrados: ${videojuegosFiltrados.length} videojuegos`);
}

/**
 * Muestra la información de la letra seleccionada
 */
function mostrarInfoSeleccion(letra, numResultados) {
    $('#letraActual').text(letra);
    $('#numeroResultados').text(numResultados);
    $('#infoSeleccion').fadeIn();
}

/**
 * Muestra los resultados en la tabla
 */
function mostrarResultados(videojuegosFiltrados) {
    const tbody = $('#resultadosAlfabeticos');
    tbody.empty();
    
    if (videojuegosFiltrados.length === 0) {
        tbody.append(`
            <tr>
                <td colspan="7" class="text-center py-5">
                    <i class="bi bi-inbox display-1 text-muted"></i>
                    <p class="mt-3 text-muted">No hay videojuegos que empiecen por la letra \"${letraSeleccionada}\"</p>
                </td>
            </tr>
        `);
        return;
    }
    
    videojuegosFiltrados.forEach(videojuego => {
        const fila = generarFilaVideojuego(videojuego);
        tbody.append(fila);
    });
}

/**
 * Genera una fila para la tabla de resultados
 */
function generarFilaVideojuego(videojuego) {
    return `
        <tr class="fade-in">
            <td>
                <div class="d-flex align-items-center">
                    <i class="bi bi-joystick me-2 text-primary"></i>
                    <strong>${videojuego.titulo}</strong>
                </div>
            </td>
            <td>${videojuego.desarrolladora}</td>
            <td><span class="badge bg-secondary">${videojuego.genero}</span></td>
            <td>${videojuego.anoLanzamiento}</td>
            <td><span class="text-success fw-bold">${videojuego.precio}€</span></td>
            <td>
                <div class="d-flex align-items-center">
                    ${generarEstrellas(videojuego.puntuacion)}
                    <small class="ms-1 text-muted">(${videojuego.puntuacion}/10)</small>
                </div>
            </td>
            <td>
                <div class="btn-group btn-group-sm" role="group">
                    ${videojuego.web ? `
                        <a href="${videojuego.web}" target="_blank" class="btn btn-outline-info" 
                           title="Ver página web">
                            <i class="bi bi-globe"></i>
                        </a>
                    ` : ''}
                    <a href="videojuegos.html" class="btn btn-outline-primary" 
                       title="Ver en gestión principal">
                        <i class="bi bi-eye"></i>
                    </a>
                </div>
            </td>
        </tr>
    `;
}

/**
 * Genera estrellas visuales para la puntuación
 */
function generarEstrellas(puntuacion) {
    const estrellasCompletas = Math.floor(puntuacion);
    const mediaEstrella = puntuacion % 1 >= 0.5;
    let html = '';
    
    for (let i = 0; i < estrellasCompletas; i++) {
        html += '<i class="bi bi-star-fill text-warning"></i>';
    }
    
    if (mediaEstrella) {
        html += '<i class="bi bi-star-half text-warning"></i>';
    }
    
    const estrellasVacias = 5 - estrellasCompletas - (mediaEstrella ? 1 : 0);
    for (let i = 0; i < estrellasVacias; i++) {
        html += '<i class="bi bi-star text-muted"></i>';
    }
    
    return html;
}

/**
 * Muestra indicador de carga
 */
function mostrarCargando() {
    $('#resultadosAlfabeticos').html(`
        <tr>
            <td colspan="7" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-2">Cargando videojuegos...</p>
            </td>
        </tr>
    `);
}

/**
 * Muestra error en la tabla
 */
function mostrarError(mensaje) {
    $('#resultadosAlfabeticos').html(`
        <tr>
            <td colspan="7" class="text-center py-5">
                <i class="bi bi-exclamation-triangle display-1 text-danger"></i>
                <p class="mt-3 text-danger">${mensaje}</p>
                <button class="btn btn-outline-primary" onclick="cargarVideojuegos()">
                    <i class="bi bi-arrow-clockwise"></i> Reintentar
                </button>
            </td>
        </tr>
    `);
}

/**
 * Muestra una notificación toast
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
    const toast = $('#toastNotificacion');
    const body = toast.find('.toast-body');
    const header = toast.find('.toast-header i');
    
    // Configurar el icono según el tipo
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
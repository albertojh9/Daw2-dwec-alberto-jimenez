// Busqueda avanzada de videojuegos
// con filtros por desarrolladora, genero, año, etc
// Alberto Jimenez - 2º DAW

// variables globales
let videojuegos = [];              // todos los videojuegos
let desarrolladoras = [];          // desarrolladoras disponibles
let generos = [];                  // generos disponibles
let resultadosFiltrados = [];      // resultados tras filtrar
let ultimaBusqueda = {};           // para recordar la ultima busqueda

// cuando se carga la pagina
$(document).ready(function() {
    console.log('Iniciando busqueda avanzada...');
    
    configurarEventListeners();
    cargarDatosIniciales();
});

// configurar event listeners
function configurarEventListeners() {
    
    // boton de busqueda
    $('#btBuscar').on('click', function() {
        realizarBusqueda();
    });
    
    // Botón para limpiar filtros
    $('#btLimpiarFiltros').on('click', function() {
        limpiarFiltros();
    });
    
    // Botón cerrar sesión
    $('#btCerrarSesion').on('click', function() {
        cerrarSesion();
    });
    
    // Búsqueda automática cuando cambia el texto
    $('#filtroTexto').on('input', function() {
        // Realizar búsqueda automática después de una pausa
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            if (hayFiltrosActivos()) {
                realizarBusqueda();
            }
        }, 500);
    });
    
    // Búsqueda automática cuando cambian los selects
    $('#filtroGenero, #filtroDesarrolladora, #ordenarPor').on('change', function() {
        if (hayFiltrosActivos()) {
            realizarBusqueda();
        }
    });
    
    console.log('✅ Event listeners configurados');
}

/**
 * Carga todos los datos necesarios
 */
async function cargarDatosIniciales() {
    try {
        mostrarCargando();
        
        // Cargar datos en paralelo para mejor rendimiento
        await Promise.all([
            cargarVideojuegos(),
            cargarDesarrolladoras(),
            cargarGeneros()
        ]);
        
        console.log('✅ Datos iniciales cargados correctamente');
        mostrarMensajeInicial();
        
    } catch (error) {
        console.error('❌ Error cargando datos:', error);
        mostrarError('Error al cargar los datos iniciales');
    }
}

/**
 * Carga la lista completa de videojuegos
 */
async function cargarVideojuegos() {
    try {
        const response = await fetch(`${environment.apiUrl}/videojuegos`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        videojuegos = await response.json();
        console.log(`📦 Cargados ${videojuegos.length} videojuegos`);
        
    } catch (error) {
        console.error('❌ Error cargando videojuegos:', error);
        throw error;
    }
}

/**
 * Carga las desarrolladoras para el select
 */
async function cargarDesarrolladoras() {
    try {
        const response = await fetch(`${environment.apiUrl}/desarrolladoras`);
        desarrolladoras = await response.json();
        
        // Llenar el select
        const select = $('#filtroDesarrolladora');
        desarrolladoras.forEach(dev => {
            select.append(`<option value=\"${dev.nombre}\">${dev.nombre}</option>`);
        });
        
        console.log(`🏢 Cargadas ${desarrolladoras.length} desarrolladoras`);
        
    } catch (error) {
        console.error('❌ Error cargando desarrolladoras:', error);
    }
}

/**
 * Carga los géneros para el select
 */
async function cargarGeneros() {
    try {
        const response = await fetch(`${environment.apiUrl}/generos`);
        generos = await response.json();
        
        // Llenar el select
        const select = $('#filtroGenero');
        generos.forEach(genero => {
            select.append(`<option value=\"${genero.nombre}\">${genero.nombre}</option>`);
        });
        
        console.log(`🎯 Cargados ${generos.length} géneros`);
        
    } catch (error) {
        console.error('❌ Error cargando géneros:', error);
    }
}

/**
 * Realiza la búsqueda con los filtros actuales
 */
function realizarBusqueda() {
    // Recopilar criterios de búsqueda
    const criterios = {
        texto: $('#filtroTexto').val().trim().toLowerCase(),
        genero: $('#filtroGenero').val(),
        desarrolladora: $('#filtroDesarrolladora').val(),
        anoMin: parseInt($('#anoMin').val()) || null,
        anoMax: parseInt($('#anoMax').val()) || null,
        precioMin: parseFloat($('#precioMin').val()) || null,
        precioMax: parseFloat($('#precioMax').val()) || null,
        ordenarPor: $('#ordenarPor').val()
    };
    
    // Guardar criterios para referencia
    ultimaBusqueda = criterios;
    
    console.log('🔎 Realizando búsqueda con criterios:', criterios);
    
    // Aplicar filtros
    resultadosFiltrados = aplicarFiltros(criterios);
    
    // Aplicar ordenación
    aplicarOrdenacion(resultadosFiltrados, criterios.ordenarPor);
    
    // Mostrar resultados
    mostrarResultados(resultadosFiltrados);
    mostrarInfoResultados(criterios, resultadosFiltrados.length);
    
    console.log(`✅ Búsqueda completada: ${resultadosFiltrados.length} resultados`);
}

/**
 * Aplica todos los filtros a la lista de videojuegos
 */
function aplicarFiltros(criterios) {
    return videojuegos.filter(videojuego => {
        
        // Filtro por texto en el título
        if (criterios.texto && !videojuego.titulo.toLowerCase().includes(criterios.texto)) {
            return false;
        }
        
        // Filtro por género
        if (criterios.genero && videojuego.genero !== criterios.genero) {
            return false;
        }
        
        // Filtro por desarrolladora
        if (criterios.desarrolladora && videojuego.desarrolladora !== criterios.desarrolladora) {
            return false;
        }
        
        // Filtro por rango de años
        if (criterios.anoMin && videojuego.anoLanzamiento < criterios.anoMin) {
            return false;
        }
        if (criterios.anoMax && videojuego.anoLanzamiento > criterios.anoMax) {
            return false;
        }
        
        // Filtro por rango de precios
        if (criterios.precioMin && videojuego.precio < criterios.precioMin) {
            return false;
        }
        if (criterios.precioMax && videojuego.precio > criterios.precioMax) {
            return false;
        }
        
        return true;
    });
}

/**
 * Aplica la ordenación seleccionada a los resultados
 */
function aplicarOrdenacion(resultados, ordenarPor) {
    switch (ordenarPor) {
        case 'titulo':
            resultados.sort((a, b) => a.titulo.localeCompare(b.titulo));
            break;
        case 'titulo-desc':
            resultados.sort((a, b) => b.titulo.localeCompare(a.titulo));
            break;
        case 'ano':
            resultados.sort((a, b) => a.anoLanzamiento - b.anoLanzamiento);
            break;
        case 'ano-desc':
            resultados.sort((a, b) => b.anoLanzamiento - a.anoLanzamiento);
            break;
        case 'precio':
            resultados.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio-desc':
            resultados.sort((a, b) => b.precio - a.precio);
            break;
        case 'puntuacion':
            resultados.sort((a, b) => a.puntuacion - b.puntuacion);
            break;
        case 'puntuacion-desc':
            resultados.sort((a, b) => b.puntuacion - a.puntuacion);
            break;
        default:
            // Por defecto ordenar por título
            resultados.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }
}

/**
 * Muestra los resultados de la búsqueda
 */
function mostrarResultados(resultados) {
    const tbody = $('#resultadosBusqueda');
    tbody.empty();
    
    if (resultados.length === 0) {
        tbody.append(`
            <tr>
                <td colspan="7" class="text-center py-5">
                    <i class="bi bi-search display-1 text-muted"></i>
                    <p class="mt-3 text-muted">No se encontraron videojuegos que coincidan con los criterios de búsqueda</p>
                    <button class="btn btn-outline-primary" onclick="limpiarFiltros()">
                        <i class="bi bi-x-circle"></i> Limpiar filtros
                    </button>
                </td>
            </tr>
        `);
        return;
    }
    
    resultados.forEach(videojuego => {
        const fila = generarFilaVideojuego(videojuego);
        tbody.append(fila);
    });
}

/**
 * Genera una fila para la tabla de resultados
 */
function generarFilaVideojuego(videojuego) {
    // Resaltar el texto buscado si existe
    let tituloMostrado = videojuego.titulo;
    if (ultimaBusqueda.texto) {
        const regex = new RegExp(`(${ultimaBusqueda.texto})`, 'gi');
        tituloMostrado = videojuego.titulo.replace(regex, '<mark>$1</mark>');
    }
    
    return `
        <tr class="fade-in">
            <td>
                <div class="d-flex align-items-center">
                    <i class="bi bi-joystick me-2 text-primary"></i>
                    <strong>${tituloMostrado}</strong>
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
 * Muestra información sobre los resultados de la búsqueda
 */
function mostrarInfoResultados(criterios, numResultados) {
    let texto = `Se encontraron <strong>${numResultados}</strong> videojuegos`;
    
    // Agregar información sobre los filtros aplicados
    const filtrosAplicados = [];
    
    if (criterios.texto) {
        filtrosAplicados.push(`texto: \"${criterios.texto}\"`);
    }
    if (criterios.genero) {
        filtrosAplicados.push(`género: ${criterios.genero}`);
    }
    if (criterios.desarrolladora) {
        filtrosAplicados.push(`desarrolladora: ${criterios.desarrolladora}`);
    }
    if (criterios.anoMin || criterios.anoMax) {
        const anoTexto = criterios.anoMin && criterios.anoMax ? 
            `${criterios.anoMin}-${criterios.anoMax}` :
            criterios.anoMin ? `desde ${criterios.anoMin}` : `hasta ${criterios.anoMax}`;
        filtrosAplicados.push(`años: ${anoTexto}`);
    }
    if (criterios.precioMin || criterios.precioMax) {
        const precioTexto = criterios.precioMin && criterios.precioMax ? 
            `${criterios.precioMin}€-${criterios.precioMax}€` :
            criterios.precioMin ? `desde ${criterios.precioMin}€` : `hasta ${criterios.precioMax}€`;
        filtrosAplicados.push(`precio: ${precioTexto}`);
    }
    
    if (filtrosAplicados.length > 0) {
        texto += ` con filtros: ${filtrosAplicados.join(', ')}`;
    }
    
    $('#textoResultados').html(texto);
    $('#infoResultados').fadeIn();
}

/**
 * Verifica si hay filtros activos
 */
function hayFiltrosActivos() {
    return $('#filtroTexto').val().trim() !== '' ||
           $('#filtroGenero').val() !== '' ||
           $('#filtroDesarrolladora').val() !== '' ||
           $('#anoMin').val() !== '' ||
           $('#anoMax').val() !== '' ||
           $('#precioMin').val() !== '' ||
           $('#precioMax').val() !== '';
}

/**
 * Limpia todos los filtros
 */
function limpiarFiltros() {
    $('#formularioFiltros')[0].reset();
    $('#ordenarPor').val('titulo');
    $('#infoResultados').fadeOut();
    
    mostrarMensajeInicial();
    
    console.log('🧹 Filtros limpiados');
    mostrarNotificacion('Filtros limpiados correctamente', 'info');
}

/**
 * Muestra el mensaje inicial
 */
function mostrarMensajeInicial() {
    $('#resultadosBusqueda').html(`
        <tr>
            <td colspan="7" class="text-center py-5">
                <i class="bi bi-funnel display-1 text-muted"></i>
                <p class="mt-3 text-muted">Configura los filtros y haz clic en "Buscar" para ver resultados</p>
                <p class="text-muted">También puedes escribir en el campo de título para búsqueda automática</p>
            </td>
        </tr>
    `);
}

/**
 * Muestra indicador de carga
 */
function mostrarCargando() {
    $('#resultadosBusqueda').html(`
        <tr>
            <td colspan="7" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-2">Cargando datos...</p>
            </td>
        </tr>
    `);
}

/**
 * Muestra error
 */
function mostrarError(mensaje) {
    $('#resultadosBusqueda').html(`
        <tr>
            <td colspan="7" class="text-center py-5">
                <i class="bi bi-exclamation-triangle display-1 text-danger"></i>
                <p class="mt-3 text-danger">${mensaje}</p>
                <button class="btn btn-outline-primary" onclick="cargarDatosIniciales()">
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
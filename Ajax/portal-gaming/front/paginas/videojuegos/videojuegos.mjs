// Pagina de videojuegos - CRUD basico y simple
// Alberto Jimenez - 2º DAW 

// variables globales
let videojuegos = [];              
let videojuegosFiltrados = [];     
let desarrolladoras = [];          
let generos = [];                  
let paginaActual = 1;              
let elementosPorPagina = 5;        
let ordenAscendente = true;        
let terminoBusqueda = '';          

// cuando se carga la pagina
$(document).ready(function() {
    console.log('Iniciando la app de videojuegos...');
    
    configurarEventListeners();
    cargarDatosIniciales();
});

// configurar event listeners basicos
function configurarEventListeners() {
    
    // boton de añadir
    $('#btAnadir').on('click', function() {
        crearVideojuego();
    });
    
    // boton para ordenar
    $('#btOrdenar').on('click', function() {
        cambiarOrden();
    });
    
    // buscador
    $('#inputBuscador').on('input', function() {
        const termino = $(this).val().trim();
        buscarVideojuegos(termino);
    });
    
    // cerrar sesion
    $('#btCerrarSesion').on('click', function() {
        cerrarSesion();
    });
    
    console.log('Event listeners listos');
}

// verificar sesion y cargar datos
function cargarDatosIniciales() {
    if (!localStorage.getItem('usuario_logueado')) {
        window.location.href = '/paginas/login/login.html';
        return;
    }
    
    cargarDesarrolladoras();
    cargarGeneros();
    cargarVideojuegos();
}

// cargar videojuegos del servidor
function cargarVideojuegos() {
    fetch(`${environment.apiUrl}/videojuegos`)
        .then(response => response.json())
        .then(data => {
            videojuegos = data;
            videojuegosFiltrados = [...videojuegos];
            
            console.log(`Cargados ${videojuegos.length} videojuegos`);
            
            aplicarOrden();
            mostrarVideojuegos();
        })
        .catch(error => {
            console.error('Error cargando videojuegos:', error);
            alert('Error al cargar los videojuegos');
        });
}

// cargar desarrolladoras
function cargarDesarrolladoras() {
    fetch(`${environment.apiUrl}/desarrolladoras`)
        .then(response => response.json())
        .then(data => {
            desarrolladoras = data;
            console.log(`Cargadas ${desarrolladoras.length} desarrolladoras`);
        })
        .catch(error => {
            console.error('Error cargando desarrolladoras:', error);
        });
}

// cargar generos
function cargarGeneros() {
    fetch(`${environment.apiUrl}/generos`)
        .then(response => response.json())
        .then(data => {
            generos = data;
            console.log(`Cargados ${generos.length} generos`);
        })
        .catch(error => {
            console.error('Error cargando generos:', error);
        });
}

// mostrar videojuegos en tabla con paginacion
function mostrarVideojuegos() {
    const tbody = $('#resultados');
    tbody.empty();
    
    // calcular paginacion
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const videojuegosPagina = videojuegosFiltrados.slice(inicio, fin);
    
    if (videojuegosPagina.length === 0) {
        tbody.append('<tr><td colspan="8" class="text-center">No se encontraron videojuegos</td></tr>');
        return;
    }
    
    // generar filas
    videojuegosPagina.forEach(videojuego => {
        const fila = generarFilaVideojuego(videojuego);
        tbody.append(fila);
    });
    
    configurarEventosAcciones();
    actualizarPaginacion();
    
    console.log(`Mostrando ${videojuegosPagina.length} videojuegos (pagina ${paginaActual})`);
}

// generar HTML de cada fila
function generarFilaVideojuego(videojuego) {
    return `
        <tr>
            <td>#${videojuego.id}</td>
            <td><strong>${videojuego.titulo}</strong></td>
            <td>${videojuego.desarrolladora}</td>
            <td>${videojuego.genero}</td>
            <td>${videojuego.anoLanzamiento}</td>
            <td>${videojuego.precio}€</td>
            <td>${videojuego.puntuacion}/10</td>
            <td>
                ${videojuego.web ? `<a href="${videojuego.web}" target="_blank">Web</a> | ` : ''}
                <button class="btn btn-sm btn-primary bt-editar" data-id="${videojuego.id}">Editar</button>
                <button class="btn btn-sm btn-danger bt-eliminar" data-id="${videojuego.id}" data-titulo="${videojuego.titulo}">Borrar</button>
            </td>
        </tr>
    `;
}

// configurar eventos de botones de accion
function configurarEventosAcciones() {
    // botones editar
    $('.bt-editar').off('click').on('click', function() {
        const id = parseInt($(this).data('id'));
        editarVideojuego(id);
    });
    
    // botones eliminar
    $('.bt-eliminar').off('click').on('click', function() {
        const id = parseInt($(this).data('id'));
        const titulo = $(this).data('titulo');
        eliminarVideojuego(id, titulo);
    });
}

// buscar videojuegos por termino
function buscarVideojuegos(termino) {
    terminoBusqueda = termino.toLowerCase();
    
    if (terminoBusqueda === '') {
        videojuegosFiltrados = [...videojuegos];
    } else {
        videojuegosFiltrados = videojuegos.filter(videojuego => {
            return videojuego.titulo.toLowerCase().includes(terminoBusqueda) ||
                   videojuego.desarrolladora.toLowerCase().includes(terminoBusqueda) ||
                   videojuego.genero.toLowerCase().includes(terminoBusqueda);
        });
    }
    
    paginaActual = 1;
    aplicarOrden();
    mostrarVideojuegos();
    
    console.log(`Busqueda "${termino}": ${videojuegosFiltrados.length} resultados`);
}

// cambiar orden A-Z / Z-A
function cambiarOrden() {
    ordenAscendente = !ordenAscendente;
    
    const botonOrden = $('#btOrdenar');
    botonOrden.text(ordenAscendente ? 'Orden: A-Z' : 'Orden: Z-A');
    
    aplicarOrden();
    mostrarVideojuegos();
    
    console.log(`Orden cambiado a: ${ordenAscendente ? 'Ascendente' : 'Descendente'}`);
}

// aplicar orden actual
function aplicarOrden() {
    videojuegosFiltrados.sort((a, b) => {
        const comparison = a.titulo.localeCompare(b.titulo);
        return ordenAscendente ? comparison : -comparison;
    });
}

// actualizar paginacion
function actualizarPaginacion() {
    const totalPaginas = Math.ceil(videojuegosFiltrados.length / elementosPorPagina);
    const paginacion = $('#paginacion');
    paginacion.empty();
    
    if (totalPaginas <= 1) return;
    
    // boton anterior
    if (paginaActual > 1) {
        paginacion.append(`<button class="btn btn-outline-primary btn-sm me-1" onclick="cambiarPagina(${paginaActual - 1})">Anterior</button>`);
    }
    
    // numero de pagina actual
    paginacion.append(`<span class="btn btn-primary btn-sm me-1">Página ${paginaActual} de ${totalPaginas}</span>`);
    
    // boton siguiente
    if (paginaActual < totalPaginas) {
        paginacion.append(`<button class="btn btn-outline-primary btn-sm" onclick="cambiarPagina(${paginaActual + 1})">Siguiente</button>`);
    }
}

// cambiar de pagina
function cambiarPagina(nuevaPagina) {
    paginaActual = nuevaPagina;
    mostrarVideojuegos();
}

// CRUD: crear videojuego con prompts simples
function crearVideojuego() {
    const titulo = prompt('Título del videojuego:');
    if (!titulo) return;
    
    const desarrolladora = prompt('Desarrolladora:');
    if (!desarrolladora) return;
    
    const genero = prompt('Género:');
    if (!genero) return;
    
    const anoLanzamiento = parseInt(prompt('Año de lanzamiento:'));
    if (!anoLanzamiento || anoLanzamiento < 1970 || anoLanzamiento > 2030) {
        alert('Año inválido');
        return;
    }
    
    const precio = parseFloat(prompt('Precio:'));
    if (isNaN(precio) || precio < 0) {
        alert('Precio inválido');
        return;
    }
    
    const puntuacion = parseFloat(prompt('Puntuación (0-10):'));
    if (isNaN(puntuacion) || puntuacion < 0 || puntuacion > 10) {
        alert('Puntuación inválida');
        return;
    }
    
    const web = prompt('Web (opcional):') || '';
    
    const nuevoVideojuego = {
        titulo,
        desarrolladora,
        genero,
        anoLanzamiento,
        precio,
        puntuacion,
        web
    };
    
    // enviar al servidor
    fetch(`${environment.apiUrl}/videojuegos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoVideojuego)
    })
    .then(response => response.json())
    .then(data => {
        alert('Videojuego creado correctamente');
        cargarVideojuegos();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al crear el videojuego');
    });
}

// CRUD: editar videojuego
function editarVideojuego(id) {
    const videojuego = videojuegos.find(v => v.id === id);
    if (!videojuego) {
        alert('Videojuego no encontrado');
        return;
    }
    
    const titulo = prompt('Título:', videojuego.titulo);
    if (!titulo) return;
    
    const desarrolladora = prompt('Desarrolladora:', videojuego.desarrolladora);
    if (!desarrolladora) return;
    
    const genero = prompt('Género:', videojuego.genero);
    if (!genero) return;
    
    const anoLanzamiento = parseInt(prompt('Año de lanzamiento:', videojuego.anoLanzamiento));
    if (!anoLanzamiento || anoLanzamiento < 1970 || anoLanzamiento > 2030) {
        alert('Año inválido');
        return;
    }
    
    const precio = parseFloat(prompt('Precio:', videojuego.precio));
    if (isNaN(precio) || precio < 0) {
        alert('Precio inválido');
        return;
    }
    
    const puntuacion = parseFloat(prompt('Puntuación (0-10):', videojuego.puntuacion));
    if (isNaN(puntuacion) || puntuacion < 0 || puntuacion > 10) {
        alert('Puntuación inválida');
        return;
    }
    
    const web = prompt('Web:', videojuego.web || '') || '';
    
    const videojuegoActualizado = {
        id,
        titulo,
        desarrolladora,
        genero,
        anoLanzamiento,
        precio,
        puntuacion,
        web
    };
    
    // enviar al servidor
    fetch(`${environment.apiUrl}/videojuegos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videojuegoActualizado)
    })
    .then(response => response.json())
    .then(data => {
        alert('Videojuego actualizado correctamente');
        cargarVideojuegos();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al actualizar el videojuego');
    });
}

// CRUD: eliminar videojuego
function eliminarVideojuego(id, titulo) {
    if (!confirm(`¿Seguro que quieres eliminar "${titulo}"?`)) {
        return;
    }
    
    fetch(`${environment.apiUrl}/videojuegos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Videojuego eliminado correctamente');
            cargarVideojuegos();
        } else {
            alert('Error al eliminar el videojuego');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al eliminar el videojuego');
    });
}

// variables globales (ya se que no es lo mejor pero asi funciona)
let videojuegos = [];              // todos los videojuegos
let videojuegosFiltrados = [];     // los que se muestran tras filtrar
let desarrolladoras = [];          // lista de desarrolladoras
let generos = [];                  // lista de generos
let paginaActual = 1;              // en que pagina estamos
let elementosPorPagina = 5;        // cuantos por pagina
let ordenAscendente = true;        // si van de a-z o z-a
let terminoBusqueda = '';          // lo que busca el usuario
let videojuegoAEliminar = null;    // cual vamos a borrar

// cuando se carga la pagina
$(document).ready(function() {
    console.log('Iniciando la app de videojuegos...');
    
    // poner los listeners de los botones
    configurarEventListeners();
    
    // cargar los datos del servidor
    cargarDatosIniciales();
});

// pone todos los event listeners
function configurarEventListeners() {
    
    // boton de añadir
    $('#btAnadir').on('click', function() {
        abrirModalCreacion();
    });
    
    // boton para ordenar
    $('#btOrdenar').on('click', function() {
        cambiarOrden();
    });
    
    // buscador en tiempo real
    $('#inputBuscador').on('input', function() {
        const termino = $(this).val().trim();
        buscarVideojuegos(termino);
    });
    
    // Botón para guardar el videojuego (crear o editar)
    $('#btGuardarVideojuego').on('click', function() {
        guardarVideojuego();
    });
    
    // boton para confirmar borrar
    $('#btConfirmarEliminar').on('click', function() {
        eliminarVideojuego();
    });
    
    // boton de cerrar sesion
    $('#btCerrarSesion').on('click', function() {
        cerrarSesion();
    });
    
    console.log('Event listeners listos');
}

// carga todos los datos al principio
function cargarDatosIniciales() {
    // verificar que hay sesion
    if (!localStorage.getItem('usuario_logueado')) {
        window.location.href = '/paginas/login/login.html';
        return;
    }
    
    // cargo desarrolladoras y generos para los selects
    cargarDesarrolladoras();
    cargarGeneros();
    
    // luego cargo los videojuegos
    cargarVideojuegos();
    
    console.log('Datos cargados');
}

// funcion para cargar videojuegos del servidor
function cargarVideojuegos() {
    fetch(`${environment.apiUrl}/videojuegos`)
        .then(response => response.json())
        .then(data => {
            videojuegos = data;
            videojuegosFiltrados = [...videojuegos];
            
            console.log(`Cargados ${videojuegos.length} videojuegos`);
            
            // ordenar y mostrar
            aplicarOrden();
            mostrarVideojuegos();
        })
        .catch(error => {
            console.error('Error cargando videojuegos:', error);
            alert('Error al cargar los videojuegos');
        });
}

/**
 * Carga la lista de desarrolladoras para el select
 */
async function cargarDesarrolladoras() {
    try {
        const response = await fetch(`${environment.apiUrl}/desarrolladoras`);
        desarrolladoras = await response.json();
        
        // Rellenar el select de desarrolladoras
        const selectDesarrolladora = $('#desarrolladora');
        selectDesarrolladora.empty();
        selectDesarrolladora.append('<option value=\"\">Seleccionar desarrolladora...</option>');
        
        desarrolladoras.forEach(dev => {
            selectDesarrolladora.append(`<option value=\"${dev.nombre}\">${dev.nombre} (${dev.pais})</option>`);
        });
        
        console.log(`🏢 Cargadas ${desarrolladoras.length} desarrolladoras`);
        
    } catch (error) {
        console.error('❌ Error cargando desarrolladoras:', error);
    }
}

/**
 * Carga la lista de géneros para el select
 */
async function cargarGeneros() {
    try {
        const response = await fetch(`${environment.apiUrl}/generos`);
        generos = await response.json();
        
        // Rellenar el select de géneros
        const selectGenero = $('#genero');
        selectGenero.empty();
        selectGenero.append('<option value=\"\">Seleccionar género...</option>');
        
        generos.forEach(genero => {
            selectGenero.append(`<option value=\"${genero.nombre}\">${genero.nombre}</option>`);
        });
        
        console.log(`🎯 Cargados ${generos.length} géneros`);
        
    } catch (error) {
        console.error('❌ Error cargando géneros:', error);
    }
}

// muestra los videojuegos en la tabla con paginacion
function mostrarVideojuegos() {
    const tbody = $('#resultados');
    tbody.empty();
    
    // calcular paginacion
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const videojuegosPagina = videojuegosFiltrados.slice(inicio, fin);
    
    if (videojuegosPagina.length === 0) {
        tbody.append('<tr><td colspan="8" class="text-center">No se encontraron videojuegos</td></tr>');
        return;
    }
    
    // generar filas de la tabla
    videojuegosPagina.forEach(videojuego => {
        const fila = generarFilaVideojuego(videojuego);
        tbody.append(fila);
    });
    
    // configurar eventos para los botones
    configurarEventosAcciones();
    
    // actualizar paginacion
    actualizarPaginacion();
    
    console.log(`Mostrando ${videojuegosPagina.length} videojuegos (pagina ${paginaActual})`);
}

/**
// genera una fila de la tabla para cada videojuego
function generarFilaVideojuego(videojuego) {
    return `
        <tr>
            <td>#${videojuego.id}</td>
            <td><strong>${videojuego.titulo}</strong></td>
            <td>${videojuego.desarrolladora}</td>
            <td>${videojuego.genero}</td>
            <td>${videojuego.anoLanzamiento}</td>
            <td>${videojuego.precio}€</td>
            <td>${videojuego.puntuacion}/10</td>
            <td>
                ${videojuego.web ? `<a href="${videojuego.web}" target="_blank">Web</a> | ` : ''}
                <button class="btn btn-sm btn-primary bt-editar" data-id="${videojuego.id}">Editar</button>
                <button class="btn btn-sm btn-danger bt-eliminar" data-id="${videojuego.id}" data-titulo="${videojuego.titulo}">Borrar</button>
            </td>
        </tr>
    `;
}

// funcion para mostrar estrellas segun la puntuacion
// me quedo bastante bien esta parte
function generarEstrellas(puntuacion) {
    const estrellasCompletas = Math.floor(puntuacion);
    const mediaEstrella = puntuacion % 1 >= 0.5;
    let html = '';
    
    for (let i = 0; i < estrellasCompletas; i++) {
        html += '<i class=\"bi bi-star-fill text-warning\"></i>';
    }
    
    if (mediaEstrella) {
        html += '<i class=\"bi bi-star-half text-warning\"></i>';
    }
    
    const estrellasVacias = 5 - estrellasCompletas - (mediaEstrella ? 1 : 0);
    for (let i = 0; i < estrellasVacias; i++) {
        html += '<i class=\"bi bi-star text-muted\"></i>';
    }
    
    return html;
}

/**
 * Configura los eventos para los botones de editar y eliminar
 */
function configurarEventosAcciones() {
    
    // Botones de editar
    $('.bt-editar').on('click', function() {
        const id = parseInt($(this).data('id'));
        abrirModalEdicion(id);
    });
    
    // Botones de eliminar
    $('.bt-eliminar').on('click', function() {
        const id = parseInt($(this).data('id'));
        const titulo = $(this).data('titulo');
        mostrarModalEliminar(id, titulo);
    });
}

/**
 * Busca videojuegos por título, desarrolladora o género
 */
function buscarVideojuegos(termino) {
    terminoBusqueda = termino.toLowerCase();
    
    if (terminoBusqueda === '') {
        videojuegosFiltrados = [...videojuegos];
    } else {
        videojuegosFiltrados = videojuegos.filter(videojuego => {
            return videojuego.titulo.toLowerCase().includes(terminoBusqueda) ||
                   videojuego.desarrolladora.toLowerCase().includes(terminoBusqueda) ||
                   videojuego.genero.toLowerCase().includes(terminoBusqueda);
        });
    }
    
    // volver a la primera pagina y mostrar resultados
    paginaActual = 1;
    aplicarOrden();
    mostrarVideojuegos();
    
    console.log(`Busqueda "${termino}": ${videojuegosFiltrados.length} resultados`);
}

// cambia el orden de ascendente a descendente y viceversa
function cambiarOrden() {
    ordenAscendente = !ordenAscendente;
    
    const botonOrden = $('#btOrdenar');
    
    // cambio el texto del boton
    if (ordenAscendente) {
        botonOrden.text('Orden: A-Z');
    } else {
        botonOrden.text('Orden: Z-A');
    }
    
    aplicarOrden();
    mostrarVideojuegos();
    
    console.log(`Orden cambiado a: ${ordenAscendente ? 'Ascendente' : 'Descendente'}`);
}

// ordena los videojuegos segun el orden actual
function aplicarOrden() {
    videojuegosFiltrados.sort((a, b) => {
        const comparison = a.titulo.localeCompare(b.titulo);
        return ordenAscendente ? comparison : -comparison;
    });
}

// actualiza los numeros de paginacion
// TODO: podria mejorarse para mostrar mas botones de paginas
function actualizarPaginacion() {
    const totalPaginas = Math.ceil(videojuegosFiltrados.length / elementosPorPagina);
    const paginacion = $('#paginacion');
    paginacion.empty();
    
    if (totalPaginas <= 1) return;
    
    // Botón anterior
    const anteriorClass = paginaActual === 1 ? 'disabled' : '';
    paginacion.append(`
        <li class=\"page-item ${anteriorClass}\">
            <button class=\"page-link\" data-pagina=\"${paginaActual - 1}\" ${paginaActual === 1 ? 'disabled' : ''}>
                <i class=\"bi bi-chevron-left\"></i> Anterior
            </button>
        </li>
    `);
    
    // Números de página
    for (let i = 1; i <= totalPaginas; i++) {
        const activeClass = i === paginaActual ? 'active' : '';
        paginacion.append(`
            <li class=\"page-item ${activeClass}\">
                <button class=\"page-link\" data-pagina=\"${i}\">${i}</button>
            </li>
        `);
    }
    
    // Botón siguiente
    const siguienteClass = paginaActual === totalPaginas ? 'disabled' : '';
    paginacion.append(`
        <li class=\"page-item ${siguienteClass}\">
            <button class=\"page-link\" data-pagina=\"${paginaActual + 1}\" ${paginaActual === totalPaginas ? 'disabled' : ''}>
                Siguiente <i class=\"bi bi-chevron-right\"></i>
            </button>
        </li>
    `);
    
    // Configurar eventos de paginación
    $('.page-link').on('click', function() {
        const nuevaPagina = parseInt($(this).data('pagina'));
        if (nuevaPagina && nuevaPagina !== paginaActual) {
            paginaActual = nuevaPagina;
            mostrarVideojuegos();
        }
    });
}

/**
 * Abre el modal para crear un nuevo videojuego
 */
function abrirModalCreacion() {
    $('#modalVideojuegoLabel').html('<i class=\"bi bi-plus-circle\"></i> Añadir Nuevo Videojuego');
    $('#videojuegoId').val('');
    limpiarFormulario();
    $('#modalVideojuego').modal('show');
    
    console.log('➕ Abriendo modal de creación');
}

/**
 * Abre el modal para editar un videojuego existente
 */
function abrirModalEdicion(id) {
    const videojuego = videojuegos.find(v => v.id === id);
    
    if (!videojuego) {
        mostrarNotificacion('Videojuego no encontrado', 'error');
        return;
    }
    
    $('#modalVideojuegoLabel').html('<i class=\"bi bi-pencil-square\"></i> Editar Videojuego');
    cargarDatosFormulario(videojuego);
    $('#modalVideojuego').modal('show');
    
    console.log(`✏️ Abriendo modal de edición para: ${videojuego.titulo}`);
}

/**
 * Carga los datos de un videojuego en el formulario
 */
function cargarDatosFormulario(videojuego) {
    $('#videojuegoId').val(videojuego.id);
    $('#titulo').val(videojuego.titulo);
    $('#desarrolladora').val(videojuego.desarrolladora);
    $('#genero').val(videojuego.genero);
    $('#anoLanzamiento').val(videojuego.anoLanzamiento);
    $('#precio').val(videojuego.precio);
    $('#puntuacion').val(videojuego.puntuacion);
    $('#web').val(videojuego.web || '');
}

/**
 * Limpia todos los campos del formulario
 */
function limpiarFormulario() {
    $('#formularioVideojuego')[0].reset();
    $('.form-control, .form-select').removeClass('is-invalid is-valid');
}

/**
 * Guarda un videojuego (crear o editar)
 */
async function guardarVideojuego() {
    
    // Validar formulario
    if (!validarFormulario()) {
        mostrarNotificacion('Por favor, corrige los errores del formulario', 'error');
        return;
    }
    
    // Recopilar datos del formulario
    const datos = {
        titulo: $('#titulo').val().trim(),
        desarrolladora: $('#desarrolladora').val(),
        genero: $('#genero').val(),
        anoLanzamiento: parseInt($('#anoLanzamiento').val()),
        precio: parseFloat($('#precio').val()),
        puntuacion: parseFloat($('#puntuacion').val()),
        web: $('#web').val().trim() || null
    };
    
    const id = $('#videojuegoId').val();
    const esEdicion = id !== '';
    
    try {
        // Mostrar indicador de carga en el botón
        const botonGuardar = $('#btGuardarVideojuego');
        const textoOriginal = botonGuardar.html();
        botonGuardar.html('<span class=\"loading\"></span> Guardando...');
        botonGuardar.prop('disabled', true);
        
        let response;
        
        if (esEdicion) {
            // Actualizar videojuego existente
            response = await fetch(`${environment.apiUrl}/videojuegos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(datos)
            });
        } else {
            // Crear nuevo videojuego
            response = await fetch(`${environment.apiUrl}/videojuegos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(datos)
            });
        }
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // Cerrar modal y recargar datos
        $('#modalVideojuego').modal('hide');
        await cargarVideojuegos();
        
        const mensaje = esEdicion ? 'Videojuego actualizado correctamente' : 'Videojuego creado correctamente';
        mostrarNotificacion(mensaje, 'success');
        
        console.log(`✅ Videojuego ${esEdicion ? 'actualizado' : 'creado'}: ${datos.titulo}`);
        
    } catch (error) {
        console.error('❌ Error guardando videojuego:', error);
        mostrarNotificacion('Error al guardar el videojuego', 'error');
        
    } finally {
        // Restaurar botón
        const botonGuardar = $('#btGuardarVideojuego');
        botonGuardar.html(textoOriginal);
        botonGuardar.prop('disabled', false);
    }
}

/**
 * Valida el formulario de videojuego
 */
function validarFormulario() {
    let valido = true;
    
    // Validar título
    const titulo = $('#titulo');
    if (titulo.val().trim().length < 2) {
        titulo.addClass('is-invalid');
        valido = false;
    } else {
        titulo.removeClass('is-invalid').addClass('is-valid');
    }
    
    // Validar desarrolladora
    const desarrolladora = $('#desarrolladora');
    if (!desarrolladora.val()) {
        desarrolladora.addClass('is-invalid');
        valido = false;
    } else {
        desarrolladora.removeClass('is-invalid').addClass('is-valid');
    }
    
    // Validar género
    const genero = $('#genero');
    if (!genero.val()) {
        genero.addClass('is-invalid');
        valido = false;
    } else {
        genero.removeClass('is-invalid').addClass('is-valid');
    }
    
    // Validar año
    const ano = $('#anoLanzamiento');
    const anoValor = parseInt(ano.val());
    if (isNaN(anoValor) || anoValor < 1970 || anoValor > 2026) {
        ano.addClass('is-invalid');
        valido = false;
    } else {
        ano.removeClass('is-invalid').addClass('is-valid');
    }
    
    // Validar precio
    const precio = $('#precio');
    const precioValor = parseFloat(precio.val());
    if (isNaN(precioValor) || precioValor < 0 || precioValor > 200) {
        precio.addClass('is-invalid');
        valido = false;
    } else {
        precio.removeClass('is-invalid').addClass('is-valid');
    }
    
    // Validar puntuación
    const puntuacion = $('#puntuacion');
    const puntuacionValor = parseFloat(puntuacion.val());
    if (isNaN(puntuacionValor) || puntuacionValor < 0 || puntuacionValor > 10) {
        puntuacion.addClass('is-invalid');
        valido = false;
    } else {
        puntuacion.removeClass('is-invalid').addClass('is-valid');
    }
    
    // Validar web (opcional pero si se proporciona debe ser URL válida)
    const web = $('#web');
    if (web.val().trim() && !esURLValida(web.val())) {
        web.addClass('is-invalid');
        valido = false;
    } else {
        web.removeClass('is-invalid').addClass('is-valid');
    }
    
    return valido;
}

/**
 * Valida si una cadena es una URL válida
 */
function esURLValida(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Muestra el modal de confirmación para eliminar
 */
function mostrarModalEliminar(id, titulo) {
    videojuegoAEliminar = id;
    $('#videojuegoAEliminar').text(titulo);
    $('#modalEliminar').modal('show');
    
    console.log(`🗑️ Solicitando eliminación de: ${titulo}`);
}

/**
 * Elimina un videojuego
 */
async function eliminarVideojuego() {
    if (!videojuegoAEliminar) return;
    
    try {
        // Mostrar indicador de carga
        const botonEliminar = $('#btConfirmarEliminar');
        const textoOriginal = botonEliminar.html();
        botonEliminar.html('<span class=\"loading\"></span> Eliminando...');
        botonEliminar.prop('disabled', true);
        
        const response = await fetch(`${environment.apiUrl}/videojuegos/${videojuegoAEliminar}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // Cerrar modal y recargar datos
        $('#modalEliminar').modal('hide');
        await cargarVideojuegos();
        
        mostrarNotificacion('Videojuego eliminado correctamente', 'success');
        console.log(`✅ Videojuego eliminado: ID ${videojuegoAEliminar}`);
        
    } catch (error) {
        console.error('❌ Error eliminando videojuego:', error);
        mostrarNotificacion('Error al eliminar el videojuego', 'error');
        
    } finally {
        // Restaurar botón
        const botonEliminar = $('#btConfirmarEliminar');
        botonEliminar.html(textoOriginal);
        botonEliminar.prop('disabled', false);
        videojuegoAEliminar = null;
    }
}

/**
 * Muestra un indicador de carga en la tabla
 */
function mostrarIndicadorCarga() {
    $('#resultados').html(`
        <tr>
            <td colspan=\"8\" class=\"text-center py-4\">
                <div class=\"spinner-border text-primary\" role=\"status\">
                    <span class=\"visually-hidden\">Cargando...</span>
                </div>
                <p class=\"mt-2\">Cargando videojuegos...</p>
            </td>
        </tr>
    `);
}

/**
 * Muestra un error en la tabla
 */
function mostrarError(mensaje) {
    $('#resultados').html(`
        <tr>
            <td colspan=\"8\" class=\"text-center py-4\">
                <i class=\"bi bi-exclamation-triangle display-1 text-danger\"></i>
                <p class=\"mt-3 text-danger\">${mensaje}</p>
                <button class=\"btn btn-outline-primary\" onclick=\"cargarVideojuegos()\">
                    <i class=\"bi bi-arrow-clockwise\"></i> Reintentar
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
    
    // Configurar el icono y color según el tipo
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
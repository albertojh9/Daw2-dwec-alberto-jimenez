/**
 * TRES EN RAYA - El perdedor empieza la siguiente ronda
 * Modificación: Cuando hay un ganador, el perdedor empieza la próxima partida
 */

// Variables globales
let tablero = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let jugadorActual = 'X';
let puntos = { X: 0, O: 0 };
let juegoActivo = true;
let ultimoPerdedor = null; // NUEVO: Guardar quién perdió la última ronda

// Inicializar juego
$(document).ready(function() {
    $('.celda').on('click', hacerJugada);
    $('#reiniciar').on('click', reiniciarTodo);
    console.log('✅ Tres en Raya iniciado - El perdedor empieza la siguiente ronda');
});

/**
 * Hacer una jugada en el tablero
 */
function hacerJugada() {
    if (!juegoActivo) return;
    
    const $celda = $(this);
    if ($celda.hasClass('ocupada')) return;
    
    // Obtener posición
    const fila = parseInt($celda.data('fila'));
    const col = parseInt($celda.data('col'));
    
    // Marcar celda
    tablero[fila][col] = jugadorActual;
    $celda.text(jugadorActual);
    $celda.addClass('ocupada ' + jugadorActual.toLowerCase());
    
    // Verificar ganador
    if (verificarGanador()) {
        finalizarPartida(jugadorActual + ' ha ganado!', jugadorActual);
    } else if (tableroLleno()) {
        finalizarPartida('Empate!', null);
    } else {
        cambiarTurno();
    }
}

/**
 * Verificar si hay tres en raya
 */
function verificarGanador() {
    // Verificar filas
    for (let i = 0; i < 3; i++) {
        if (tablero[i][0] !== '' && 
            tablero[i][0] === tablero[i][1] && 
            tablero[i][1] === tablero[i][2]) {
            marcarGanadoras(i, 0, i, 1, i, 2);
            return true;
        }
    }
    
    // Verificar columnas
    for (let j = 0; j < 3; j++) {
        if (tablero[0][j] !== '' && 
            tablero[0][j] === tablero[1][j] && 
            tablero[1][j] === tablero[2][j]) {
            marcarGanadoras(0, j, 1, j, 2, j);
            return true;
        }
    }
    
    // Diagonal principal
    if (tablero[0][0] !== '' && 
        tablero[0][0] === tablero[1][1] && 
        tablero[1][1] === tablero[2][2]) {
        marcarGanadoras(0, 0, 1, 1, 2, 2);
        return true;
    }
    
    // Diagonal secundaria
    if (tablero[0][2] !== '' && 
        tablero[0][2] === tablero[1][1] && 
        tablero[1][1] === tablero[2][0]) {
        marcarGanadoras(0, 2, 1, 1, 2, 0);
        return true;
    }
    
    return false;
}

/**
 * Marcar visualmente las celdas ganadoras
 */
function marcarGanadoras(f1, c1, f2, c2, f3, c3) {
    $(`.celda[data-fila="${f1}"][data-col="${c1}"]`).addClass('ganadora');
    $(`.celda[data-fila="${f2}"][data-col="${c2}"]`).addClass('ganadora');
    $(`.celda[data-fila="${f3}"][data-col="${c3}"]`).addClass('ganadora');
}

/**
 * Verificar si el tablero está lleno
 */
function tableroLleno() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tablero[i][j] === '') return false;
        }
    }
    return true;
}

/**
 * Cambiar turno del jugador
 */
function cambiarTurno() {
    jugadorActual = (jugadorActual === 'X') ? 'O' : 'X';
    $('#turno-actual').text(jugadorActual);
}

/**
 * Finalizar la partida
 * MODIFICACIÓN: El perdedor será quien empiece la siguiente ronda
 */
function finalizarPartida(mensaje, ganador) {
    juegoActivo = false;
    
    // Actualizar puntuación si hay ganador
    if (ganador) {
        puntos[ganador]++;
        if (ganador === 'X') {
            $('#puntos-x').text(puntos.X);
            ultimoPerdedor = 'O'; // O perdió, empezará la siguiente
        } else {
            $('#puntos-o').text(puntos.O);
            ultimoPerdedor = 'X'; // X perdió, empezará la siguiente
        }
    } else {
        // En caso de empate, mantener el orden actual
        ultimoPerdedor = null;
    }
    
    // Mostrar mensaje
    alert(mensaje);
    
    // Reiniciar tablero después de un momento
    setTimeout(limpiarTablero, 500);
}

/**
 * Limpiar el tablero para nueva partida
 * MODIFICACIÓN: El perdedor empieza la siguiente ronda
 */
function limpiarTablero() {
    tablero = [['', '', ''], ['', '', ''], ['', '', '']];
    $('.celda').text('').removeClass('ocupada x o ganadora');
    
    // NUEVO: Si hay un perdedor anterior, él empieza
    if (ultimoPerdedor !== null) {
        jugadorActual = ultimoPerdedor;
        console.log(`El perdedor (${ultimoPerdedor}) empieza esta ronda`);
    } else {
        // Si no hay perdedor (empate o primera partida), empieza X
        jugadorActual = 'X';
    }
    
    $('#turno-actual').text(jugadorActual);
    juegoActivo = true;
}

/**
 * Reiniciar todo el juego (incluye puntuaciones y reglas)
 */
function reiniciarTodo() {
    if (confirm('¿Reiniciar todas las partidas y puntuaciones?')) {
        limpiarTablero();
        puntos.X = 0;
        puntos.O = 0;
        $('#puntos-x').text(0);
        $('#puntos-o').text(0);
        ultimoPerdedor = null; // Resetear perdedor
        jugadorActual = 'X';
        $('#turno-actual').text('X');
    }
}

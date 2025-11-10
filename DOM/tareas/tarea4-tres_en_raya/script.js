/**
 * TRES EN RAYA - Versión Simple
 * Tarea 4 - jQuery
 * @author Alberto
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

// Inicializar juego
$(document).ready(function() {
    $('.celda').on('click', hacerJugada);
    $('#reiniciar').on('click', reiniciarTodo);
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
        finalizarPartida(jugadorActual + ' ha ganado!');
    } else if (tableroLleno()) {
        finalizarPartida('Empate!');
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
 */
function finalizarPartida(mensaje) {
    juegoActivo = false;
    
    // Actualizar puntuación si hay ganador
    if (mensaje.includes('X')) {
        puntos.X++;
        $('#puntos-x').text(puntos.X);
    } else if (mensaje.includes('O')) {
        puntos.O++;
        $('#puntos-o').text(puntos.O);
    }
    
    // Mostrar mensaje
    alert(mensaje);
    
    // Reiniciar tablero después de un momento
    setTimeout(limpiarTablero, 500);
}

/**
 * Limpiar el tablero para nueva partida
 */
function limpiarTablero() {
    tablero = [['', '', ''], ['', '', ''], ['', '', '']];
    $('.celda').text('').removeClass('ocupada x o ganadora');
    jugadorActual = 'X';
    $('#turno-actual').text('X');
    juegoActivo = true;
}

/**
 * Reiniciar todo el juego (incluye puntuaciones)
 */
function reiniciarTodo() {
    if (confirm('¿Reiniciar todas las partidas?')) {
        limpiarTablero();
        puntos.X = 0;
        puntos.O = 0;
        $('#puntos-x').text(0);
        $('#puntos-o').text(0);
    }
}

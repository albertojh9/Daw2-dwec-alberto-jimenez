// Ejecutar cuando el DOM esté completamente cargado
$(document).ready(function() {
    // Variables globales del juego
    let score,              // Puntuación acumulada del jugador
        currentSize,        // Tamaño actual del bloque en píxeles
        currentTime,        // Tiempo restante para hacer click
        difficulty,         // Nivel de dificultad actual (easy/normal/hard)
        countdownInterval,  // Referencia al intervalo del temporizador
        gameActive;         // Flag que indica si el juego está activo

    // Configuración para cada nivel de dificultad
    const config = {
        // Fácil: bloque grande, más tiempo, disminuye poco
        easy: { initialSize: 200, initialTime: 5.0, sizeDecrement: 5, timeDecrement: 0.1 },
        // Normal: valores intermedios
        normal: { initialSize: 150, initialTime: 3.0, sizeDecrement: 8, timeDecrement: 0.15 },
        // Difícil: bloque pequeño, menos tiempo, disminuye rápido
        hard: { initialSize: 100, initialTime: 2.0, sizeDecrement: 10, timeDecrement: 0.2 }
    };

    // Event listeners para los botones de dificultad y reinicio
    $('#easyBtn').click(() => startGame('easy'));      // Botón fácil
    $('#normalBtn').click(() => startGame('normal'));  // Botón normal
    $('#hardBtn').click(() => startGame('hard'));      // Botón difícil
    $('#restartBtn').click(resetGame);                 // Botón volver al menú

    // Función que inicia el juego con la dificultad seleccionada
    function startGame(diff) {
        difficulty = diff;                              // Guardar dificultad elegida
        score = 0;                                      // Reiniciar puntuación
        currentSize = config[diff].initialSize;         // Tamaño inicial del bloque
        currentTime = config[diff].initialTime;         // Tiempo inicial disponible
        gameActive = true;                              // Activar el juego

        // Ocultar menús y mostrar pantalla de juego
        $('#menuScreen, #gameOverScreen').hide();
        $('#gameScreen').show();
        updateDisplay();                                // Actualizar displays
        showBlock();                                    // Mostrar primer bloque
    }

    // Función que muestra el bloque en posición aleatoria
    function showBlock() {
        if (!gameActive) return;                        // No hacer nada si el juego no está activo

        // Calcular límites para que el bloque no se salga del área de juego (600x400px)
        const maxX = 600 - currentSize;                 // Límite horizontal
        const maxY = 400 - currentSize;                 // Límite vertical

        // Posicionar el bloque en lugar aleatorio con el tamaño actual
        $('#clickBlock').css({
            width: currentSize + 'px',                  // Ancho del bloque
            height: currentSize + 'px',                 // Alto del bloque
            left: Math.floor(Math.random() * maxX) + 'px',  // Posición X aleatoria
            top: Math.floor(Math.random() * maxY) + 'px',   // Posición Y aleatoria
            display: 'block'                            // Hacer visible el bloque
        });

        // Calcular tiempo disponible basado en el score actual (se reduce progresivamente)
        currentTime = config[difficulty].initialTime - (score * config[difficulty].timeDecrement);

        // Verificar condiciones de fin de juego
        if (currentTime <= 0 || currentSize <= 0) {
            // Determinar razón del fin de juego
            endGame(currentTime <= 0 ? 'El tiempo disponible llegó a 0 segundos' : 'El tamaño del bloque llegó a 0 pixels');
            return;
        }

        updateDisplay();                                // Actualizar displays
        startCountdown();                               // Iniciar cuenta atrás
    }

    // Función que inicia la cuenta atrás del tiempo
    function startCountdown() {
        clearInterval(countdownInterval);               // Limpiar intervalo anterior si existe
        countdownInterval = setInterval(() => {
            currentTime -= 0.01;                        // Reducir tiempo cada centésima de segundo
            if (currentTime <= 0) {                     // Si se acaba el tiempo
                currentTime = 0;                        // No permitir valores negativos
                updateDisplay();
                endGame('¡Se acabó el tiempo! No hiciste click a tiempo');
            }
            updateDisplay();                            // Actualizar display constantemente
        }, 10); // Intervalo de 10ms para suavidad visual
    }

    // Event listener para cuando se hace click en el bloque
    $('#clickBlock').click(function(e) {
        e.stopPropagation();                           // Evitar que el evento se propague
        if (!gameActive) return;                       // No procesar si el juego no está activo

        clearInterval(countdownInterval);              // Parar la cuenta atrás inmediatamente
        score += parseFloat(currentTime.toFixed(2));   // Sumar puntos = tiempo restante
        $('#message').text('¡ACIERTO! +' + currentTime.toFixed(2) + ' puntos');

        currentSize -= config[difficulty].sizeDecrement; // Reducir tamaño según dificultad

        // Verificar si el bloque llegó a tamaño 0 (condición de victoria)
        if (currentSize <= 0) {
            currentSize = 0;                           // No permitir tamaños negativos
            updateDisplay();
            setTimeout(() => endGame('¡Increíble! El bloque llegó a 0 pixels'), 500);
            return;
        }

        // Calcular si el siguiente tiempo sería válido
        const nextTime = config[difficulty].initialTime - ((score / currentTime.toFixed(2)) * config[difficulty].timeDecrement);
        if (nextTime <= 0) {                          // Si no queda tiempo para el siguiente round
            setTimeout(() => endGame('¡Increíble! El tiempo disponible llegó a 0 segundos'), 500);
            return;
        }

        updateDisplay();                              // Actualizar información en pantalla
        // Esperar medio segundo antes de mostrar el siguiente bloque
        setTimeout(() => {
            $('#message').text('');                   // Limpiar mensaje de acierto
            showBlock();                              // Mostrar siguiente bloque
        }, 500);
    });

    // Función que actualiza los elementos de la interfaz
    function updateDisplay() {
        $('#timeDisplay').text(currentTime.toFixed(2) + 's');  // Mostrar tiempo con 2 decimales
        $('#scoreDisplay').text(score.toFixed(2));             // Mostrar score con 2 decimales
        $('#sizeDisplay').text(currentSize + 'px');            // Mostrar tamaño actual en píxeles
    }

    // Función que termina el juego y muestra la pantalla de game over
    function endGame(reason) {
        gameActive = false;                            // Desactivar el juego
        clearInterval(countdownInterval);              // Parar cualquier temporizador activo
        $('#clickBlock').hide();                       // Ocultar el bloque inmediatamente
        
        // Esperar un poco antes de mostrar la pantalla de fin (efecto visual)
        setTimeout(() => {
            $('#gameScreen').hide();                   // Ocultar pantalla de juego
            $('#finalScore').text(score.toFixed(2));   // Mostrar puntuación final
            $('#gameOverReason').text(reason);         // Mostrar razón del fin
            $('#gameOverScreen').show();               // Mostrar pantalla de game over
        }, 300);
    }

    // Función que reinicia el juego y vuelve al menú principal
    function resetGame() {
        $('#gameOverScreen, #gameScreen').hide();      // Ocultar todas las pantallas de juego
        $('#menuScreen').show();                       // Mostrar menú principal
        $('#message').text('');                        // Limpiar mensajes
        clearInterval(countdownInterval);              // Limpiar cualquier temporizador
    }
});
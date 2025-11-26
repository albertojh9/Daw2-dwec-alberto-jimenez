/**
 * JUEGO 2D - Modo fácil con DOS cuadrados
 * MODIFICACIÓN: En modo fácil aparecen 2 bloques simultáneamente
 */

$(document).ready(function() {
    // Variables globales del juego
    let score = 0;
    let currentSize = 0;
    let currentTime = 0;
    let difficulty = '';
    let countdownInterval = null;
    let gameActive = false;
    let blocksToClick = 0; // NUEVO: Contador de bloques pendientes por hacer click

    // Configuración para cada nivel de dificultad
    const config = {
        easy: { 
            initialSize: 200, 
            initialTime: 5.0, 
            sizeDecrement: 5, 
            timeDecrement: 0.1,
            numBlocks: 2  // NUEVO: 2 bloques en modo fácil
        },
        normal: { 
            initialSize: 150, 
            initialTime: 3.0, 
            sizeDecrement: 8, 
            timeDecrement: 0.15,
            numBlocks: 1  // 1 bloque en modo normal
        },
        hard: { 
            initialSize: 100, 
            initialTime: 2.0, 
            sizeDecrement: 10, 
            timeDecrement: 0.2,
            numBlocks: 1  // 1 bloque en modo difícil
        }
    };

    // Event listeners
    $('#easyBtn').click(() => startGame('easy'));
    $('#normalBtn').click(() => startGame('normal'));
    $('#hardBtn').click(() => startGame('hard'));
    $('#restartBtn').click(resetGame);

    // Iniciar juego
    function startGame(diff) {
        difficulty = diff;
        score = 0;
        currentSize = config[diff].initialSize;
        currentTime = config[diff].initialTime;
        gameActive = true;

        $('#menuScreen, #gameOverScreen').hide();
        $('#gameScreen').show();
        updateDisplay();
        showBlocks();
    }

    // Mostrar bloques según la dificultad
    function showBlocks() {
        if (!gameActive) return;

        const numBlocks = config[difficulty].numBlocks;
        blocksToClick = numBlocks; // Establecer cuántos bloques hay que hacer click

        // Calcular límites
        const maxX = 600 - currentSize;
        const maxY = 400 - currentSize;

        // Calcular tiempo disponible
        currentTime = config[difficulty].initialTime - (score * config[difficulty].timeDecrement);

        // Verificar condiciones de fin
        if (currentTime <= 0 || currentSize <= 0) {
            endGame(currentTime <= 0 ? 'El tiempo disponible llegó a 0 segundos' : 'El tamaño del bloque llegó a 0 pixels');
            return;
        }

        // Mostrar primer bloque
        $('#clickBlock').css({
            width: currentSize + 'px',
            height: currentSize + 'px',
            left: Math.floor(Math.random() * maxX) + 'px',
            top: Math.floor(Math.random() * maxY) + 'px',
            display: 'block'
        });

        // Mostrar segundo bloque SOLO en modo fácil
        if (numBlocks === 2) {
            $('#clickBlock2').css({
                width: currentSize + 'px',
                height: currentSize + 'px',
                left: Math.floor(Math.random() * maxX) + 'px',
                top: Math.floor(Math.random() * maxY) + 'px',
                display: 'block'
            });
        } else {
            $('#clickBlock2').hide();
        }

        updateDisplay();
        startCountdown();
    }

    // Iniciar cuenta atrás
    function startCountdown() {
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            currentTime -= 0.01;
            if (currentTime <= 0) {
                currentTime = 0;
                updateDisplay();
                endGame('¡Se acabó el tiempo! No hiciste click a tiempo');
            }
            updateDisplay();
        }, 10);
    }

    // Event listener para click en bloques
    $('.block').click(function(e) {
        e.stopPropagation();
        if (!gameActive) return;

        // Ocultar el bloque clickeado
        $(this).hide();
        blocksToClick--;

        // Mostrar mensaje de acierto
        $('#message').text('¡ACIERTO! +' + currentTime.toFixed(2) + ' puntos');

        // Si aún quedan bloques por hacer click, no hacer nada más
        if (blocksToClick > 0) {
            return;
        }

        // Todos los bloques fueron clickeados
        clearInterval(countdownInterval);
        score += parseFloat(currentTime.toFixed(2));
        
        currentSize -= config[difficulty].sizeDecrement;

        // Verificar si el bloque llegó a tamaño 0
        if (currentSize <= 0) {
            currentSize = 0;
            updateDisplay();
            setTimeout(() => endGame('¡Increíble! El bloque llegó a 0 pixels'), 500);
            return;
        }

        // Calcular siguiente tiempo
        const nextTime = config[difficulty].initialTime - ((score / currentTime.toFixed(2)) * config[difficulty].timeDecrement);
        if (nextTime <= 0) {
            setTimeout(() => endGame('¡Increíble! El tiempo disponible llegó a 0 segundos'), 500);
            return;
        }

        updateDisplay();
        
        // Esperar antes de mostrar siguientes bloques
        setTimeout(() => {
            $('#message').text('');
            showBlocks();
        }, 500);
    });

    // Actualizar displays
    function updateDisplay() {
        $('#timeDisplay').text(currentTime.toFixed(2) + 's');
        $('#scoreDisplay').text(score.toFixed(2));
        $('#sizeDisplay').text(currentSize + 'px');
    }

    // Terminar juego
    function endGame(reason) {
        gameActive = false;
        clearInterval(countdownInterval);
        $('.block').hide();
        
        setTimeout(() => {
            $('#gameScreen').hide();
            $('#finalScore').text(score.toFixed(2));
            $('#gameOverReason').text(reason);
            $('#gameOverScreen').show();
        }, 300);
    }

    // Reiniciar juego
    function resetGame() {
        $('#gameOverScreen, #gameScreen').hide();
        $('#menuScreen').show();
        $('#message').text('');
        clearInterval(countdownInterval);
        $('.block').hide();
    }

    console.log('✅ Juego 2D iniciado - Modo fácil con 2 bloques');
});

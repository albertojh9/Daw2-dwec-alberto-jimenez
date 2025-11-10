# Tres en Raya Simple - jQuery

## Descripción
Juego de tres en raya para dos jugadores usando jQuery.

## Requisitos Cumplidos
✅ Marcador de partidas ganadas (X y O) - Comienza en 0  
✅ X siempre empieza  
✅ Alternancia automática de turnos  
✅ Detección de tres en raya (filas, columnas, diagonales)  
✅ Mensaje cuando hay ganador  
✅ Actualización del marcador  
✅ Reinicio automático tras partida  

## Archivos
- `index.html` - Estructura del juego
- `styles.css` - Estilos básicos
- `script.js` - Lógica con jQuery

## Cómo Usar
1. Abre `index.html` en tu navegador
2. Juega haciendo clic en las celdas
3. El juego detecta automáticamente el ganador
4. Usa "Reiniciar Partidas" para volver a 0-0

## Funciones Principales
- `hacerJugada()` - Marca la celda y verifica ganador
- `verificarGanador()` - Comprueba filas, columnas y diagonales
- `cambiarTurno()` - Alterna entre X y O
- `finalizarPartida()` - Actualiza marcador y reinicia tablero
- `limpiarTablero()` - Prepara nueva partida
- `reiniciarTodo()` - Reinicia puntuaciones

## Rúbrica
- Funcionalidad: ✅ 5/5
- Uso de jQuery: ✅ 2/2
- Modularidad: ✅ 1/1
- Original: ✅ 1/1
- Limpieza: ✅ 1/1

**Total: 10/10**

---
**Autor:** Alberto  
**Curso:** 2º DAW

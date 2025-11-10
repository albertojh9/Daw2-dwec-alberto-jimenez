'use strict';

/**
 * Clase Calculadora - Implementa operaciones básicas con sistema de eventos
 */
class Calculadora {
    constructor() {
        this.pantallaValor = '0';
        this.operandoAnterior = null;
        this.operador = null;
        this.esperandoNuevoOperando = false;
        this.listenerPantallaActualizada = null;
        
        // Array asociativo de operaciones matemáticas
        this.operaciones = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            'x': (a, b) => a * b,
            '÷': (a, b) => b === 0 ? (() => { throw new Error('División por cero'); })() : a / b
        };
    }

    // Establece el listener para actualizar la pantalla
    setPantallaActualizadaListener(listener) {
        this.listenerPantallaActualizada = listener;
    }

    // Notifica cambios en la pantalla al listener
    notificarCambioPantalla() {
        if (this.listenerPantallaActualizada) {
            this.listenerPantallaActualizada(this.pantallaValor);
        }
    }

    // Ejecuta una acción y maneja errores automáticamente
    ejecutar(accion) {
        try {
            accion();
            this.notificarCambioPantalla();
        } catch (error) {
            this.pantallaValor = 'ERROR';
            this.operandoAnterior = null;
            this.operador = null;
            this.esperandoNuevoOperando = true;
            this.notificarCambioPantalla();
        }
    }

    // Añade un dígito a la pantalla
    agregarDigito(digito) {
        this.ejecutar(() => {
            if (this.esperandoNuevoOperando) {
                this.pantallaValor = digito;
                this.esperandoNuevoOperando = false;
            } else {
                this.pantallaValor = this.pantallaValor === '0' ? digito : this.pantallaValor + digito;
            }
        });
    }

    // Añade el punto decimal
    agregarPunto() {
        this.ejecutar(() => {
            if (this.esperandoNuevoOperando) {
                this.pantallaValor = '0,';
                this.esperandoNuevoOperando = false;
            } else if (!this.pantallaValor.includes(',')) {
                this.pantallaValor += ',';
            }
        });
    }

    // Resetea la calculadora
    limpiar() {
        this.ejecutar(() => {
            this.pantallaValor = '0';
            this.operandoAnterior = null;
            this.operador = null;
            this.esperandoNuevoOperando = false;
        });
    }

    // Cambia el signo del número en pantalla
    cambiarSigno() {
        this.ejecutar(() => {
            if (this.pantallaValor !== '0') {
                this.pantallaValor = this.pantallaValor.startsWith('-') 
                    ? this.pantallaValor.substring(1) 
                    : '-' + this.pantallaValor;
            }
        });
    }

    // Convierte el número a porcentaje
    porcentaje() {
        this.ejecutar(() => {
            const valor = parseFloat(this.pantallaValor.replace(',', '.'));
            this.pantallaValor = (valor / 100).toString().replace('.', ',');
        });
    }

    // Establece el operador y gestiona operaciones encadenadas
    establecerOperador(operadorNuevo) {
        this.ejecutar(() => {
            const valorActual = parseFloat(this.pantallaValor.replace(',', '.'));
            
            if (this.operandoAnterior === null) {
                this.operandoAnterior = valorActual;
            } else if (this.operador && !this.esperandoNuevoOperando) {
                const resultado = this.operaciones[this.operador](this.operandoAnterior, valorActual);
                this.pantallaValor = resultado.toString().replace('.', ',');
                this.operandoAnterior = resultado;
            }
            
            this.operador = operadorNuevo;
            this.esperandoNuevoOperando = true;
        });
    }

    // Realiza el cálculo final
    calcular() {
        this.ejecutar(() => {
            if (this.operador && this.operandoAnterior !== null) {
                const valorActual = parseFloat(this.pantallaValor.replace(',', '.'));
                const resultado = this.operaciones[this.operador](this.operandoAnterior, valorActual);
                this.pantallaValor = resultado.toString().replace('.', ',');
                this.operandoAnterior = null;
                this.operador = null;
                this.esperandoNuevoOperando = true;
            }
        });
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    const calculadora = new Calculadora();
    const inputPantalla = document.getElementById('input');
    
    // Conecta la pantalla con el input del DOM
    calculadora.setPantallaActualizadaListener((nuevoValor) => {
        inputPantalla.value = nuevoValor;
    });
    
    // Mapeo de botones a sus acciones correspondientes
    const accionesBotones = {
        'AC': () => calculadora.limpiar(),
        '+/-': () => calculadora.cambiarSigno(),
        '%': () => calculadora.porcentaje(),
        '÷': () => calculadora.establecerOperador('÷'),
        'x': () => calculadora.establecerOperador('x'),
        '-': () => calculadora.establecerOperador('-'),
        '+': () => calculadora.establecerOperador('+'),
        '=': () => calculadora.calcular(),
        ',': () => calculadora.agregarPunto(),
        '0': () => calculadora.agregarDigito('0'),
        '1': () => calculadora.agregarDigito('1'),
        '2': () => calculadora.agregarDigito('2'),
        '3': () => calculadora.agregarDigito('3'),
        '4': () => calculadora.agregarDigito('4'),
        '5': () => calculadora.agregarDigito('5'),
        '6': () => calculadora.agregarDigito('6'),
        '7': () => calculadora.agregarDigito('7'),
        '8': () => calculadora.agregarDigito('8'),
        '9': () => calculadora.agregarDigito('9')
    };
    
    // Asigna eventos a todos los botones de la calculadora
    document.querySelectorAll('.calculadora button').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const accion = accionesBotones[e.target.textContent.trim()];
            if (accion) accion();
        });
    });
    
    // Inicializa la pantalla
    calculadora.notificarCambioPantalla();
});
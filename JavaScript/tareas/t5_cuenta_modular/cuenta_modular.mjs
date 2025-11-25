// cuenta.mjs
// Módulo que contiene la clase Cuenta
// Alumno: Alberto - 2º DAW

/**
 * Clase Cuenta con funcionalidades básicas de una cuenta bancaria
 */
export class Cuenta {
    
    /**
     * Constructor de la clase Cuenta
     * @param {string} titular - Titular de la cuenta (obligatorio)
     * @param {number} cantidad - Cantidad inicial (opcional, por defecto 0)
     */
    constructor(titular, cantidad = 0) {
        this.titular = titular;     // Titular es obligatorio
        this.cantidad = cantidad;   // Cantidad es opcional (por defecto 0)
    }
    
    // ========== MÉTODOS GET ==========
    
    /**
     * Obtiene el titular de la cuenta
     * @returns {string} Titular de la cuenta
     */
    getTitular() {
        return this.titular;
    }
    
    /**
     * Obtiene la cantidad/saldo de la cuenta
     * @returns {number} Saldo actual de la cuenta
     */
    getCantidad() {
        return this.cantidad;
    }
    
    // ========== MÉTODOS SET ==========
    
    /**
     * Establece un nuevo titular para la cuenta
     * @param {string} nuevoTitular - Nuevo titular de la cuenta
     */
    setTitular(nuevoTitular) {
        this.titular = nuevoTitular;
    }
    
    /**
     * Establece una nueva cantidad/saldo para la cuenta
     * @param {number} nuevaCantidad - Nueva cantidad para la cuenta
     */
    setCantidad(nuevaCantidad) {
        this.cantidad = nuevaCantidad;
    }
    
    // ========== MÉTODO TOSTRING ==========
    
    /**
     * Convierte la cuenta a una representación de cadena
     * @returns {string} Información de la cuenta formateada
     */
    toString() {
        return `Cuenta de ${this.titular}: ${this.cantidad.toFixed(2)}€`;
    }
    
    // ========== MÉTODOS ESPECIALES ==========
    
    /**
     * Ingresa una cantidad a la cuenta
     * Si la cantidad es negativa o cero, no se hace nada
     * @param {number} cantidad - Cantidad a ingresar
     */
    ingresar(cantidad) {
        if (cantidad > 0) {
            this.cantidad += cantidad;
            console.log(`Ingreso de ${cantidad.toFixed(2)}€ realizado correctamente`);
        } else {
            console.log("No se puede ingresar una cantidad negativa o cero");
        }
    }
    
    /**
     * Retira una cantidad de la cuenta
     * Si el resultado sería negativo, el saldo pasa a ser 0
     * @param {number} cantidad - Cantidad a retirar
     */
    retirar(cantidad) {
        if (cantidad > 0) {
            // Calculamos el nuevo saldo después del retiro
            const nuevoSaldo = this.cantidad - cantidad;
            
            if (nuevoSaldo >= 0) {
                // Si el saldo resultante es positivo o cero, hacemos el retiro normal
                this.cantidad = nuevoSaldo;
                console.log(`Retiro de ${cantidad.toFixed(2)}€ realizado correctamente`);
            } else {
                // Si el saldo resultante sería negativo, lo ponemos a 0
                console.log(`Retiro parcial: solo se pudieron retirar ${this.cantidad.toFixed(2)}€`);
                this.cantidad = 0;
            }
        } else {
            console.log("No se puede retirar una cantidad negativa o cero");
        }
    }
}
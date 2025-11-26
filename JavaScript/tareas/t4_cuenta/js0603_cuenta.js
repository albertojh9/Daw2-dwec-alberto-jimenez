class Cuenta {
    // Constructor: titular obligatorio, cantidad opcional (0 por defecto)
    constructor(titular, cantidad = 0) {
        this.titular = titular;
        this.cantidad = cantidad;
    }

    // Obtiene el nombre del titular de la cuenta
    getTitular() {
        return this.titular;
    }

    // Obtiene la cantidad de dinero disponible en la cuenta
    getCantidad() {
        return this.cantidad;
    }

    // Establece el nombre del titular de la cuenta
    setTitular(titular) {
        this.titular = titular;
    }

    // Establece la cantidad de dinero en la cuenta
    setCantidad(cantidad) {
        this.cantidad = cantidad;
    }

    // Devuelve una representación en cadena de texto de la cuenta
    toString() {
        return `Titular: ${this.titular}, Cantidad: ${this.cantidad}€`;
    }

    // Ingresa una cantidad de dinero en la cuenta (solo cantidades positivas)
    ingresar(cantidad) {
        if (cantidad > 0) {
            this.cantidad += cantidad;
            console.log(`Ingreso realizado. Saldo actual: ${this.cantidad}€`);
        } else {
            console.log(`No se puede ingresar una cantidad negativa. Saldo actual: ${this.cantidad}€`);
        }
    }

    // Retira una cantidad de dinero de la cuenta (permite saldo negativo)
    retirar(cantidad) {
        this.cantidad -= cantidad;
        console.log(`Retirada realizada. Saldo actual: ${this.cantidad}€`);
    }
}

// Constructor con cantidad
let cuenta2 = new Cuenta("Alberto", 100);
console.log(cuenta2.toString()); // Titular: Alberto, Cantidad: 500€

// Ingresar dinero
cuenta2.ingresar(10); 

// Retirar dinero
cuenta2.retirar(50);

// Ingresar dinero
cuenta2.ingresar(15); 

// Retirar dinero
cuenta2.retirar(100); 


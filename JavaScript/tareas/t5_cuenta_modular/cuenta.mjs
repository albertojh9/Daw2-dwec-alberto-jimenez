// Clase Cuenta para gestionar operaciones bancarias básicas
export class Cuenta {
    // Constructor que inicializa la cuenta con una cantidad inicial
    constructor(cantidadInicial = 0) {
        this.saldo = cantidadInicial;
    }

    // Método para ingresar dinero en la cuenta
    ingresar(cantidad) {
        if (cantidad > 0) {
            this.saldo += cantidad;
            console.log(`Ingreso: ${cantidad}€ | Saldo actual: ${this.saldo}€`);
        } else {
            console.log("Error: La cantidad a ingresar debe ser positiva");
        }
    }

    // Método para retirar dinero de la cuenta
    retirar(cantidad) {
        if (cantidad > 0) {
            if (cantidad <= this.saldo) {
                this.saldo -= cantidad;
                console.log(`Retiro: ${cantidad}€ | Saldo actual: ${this.saldo}€`);
            } else {
                console.log(`Error: Saldo insuficiente. Saldo actual: ${this.saldo}€`);
            }
        } else {
            console.log("Error: La cantidad a retirar debe ser positiva");
        }
    }

    // Método para obtener el saldo actual
    obtenerSaldo() {
        return this.saldo;
    }
}

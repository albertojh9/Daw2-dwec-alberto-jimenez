// Clase Cuenta
class Cuenta {
    // Dos constructores como se solicita
    constructor(titular, cantidad) {
        this.titular = titular;
        this.cantidad = cantidad || 0; // Si no se proporciona cantidad, será 0
    }
    
    // Segundo constructor (en JavaScript se simula con métodos estáticos)
    static crearCuentaSoloTitular(titular) {
        return new Cuenta(titular, 0);
    }

    // Métodos GET
    getTitular() {
        return this.titular;
    }

    getCantidad() {
        return this.cantidad;
    }

    // Métodos SET
    setTitular(titular) {
        this.titular = titular;
    }

    setCantidad(cantidad) {
        this.cantidad = cantidad;
    }

    // Método ingresar - si la cantidad es negativa, no hace nada
    ingresar(cantidad) {
        if (cantidad > 0) {
            this.cantidad += cantidad;
        }
    }

    // Método retirar - si queda negativo, se establece a 0
    retirar(cantidad) {
        const nuevoSaldo = this.cantidad - cantidad;
        if (nuevoSaldo < 0) {
            this.cantidad = 0; // Imposible dejar con importe negativo
        } else {
            this.cantidad = nuevoSaldo;
        }
    }

    // Método toString
    toString() {
        return `Titular: ${this.titular}, Cantidad: ${this.cantidad.toFixed(2)}€`;
    }
}

// ===== PRUEBA DEL EJERCICIO =====

// Crear una cuenta con el constructor que tiene titular y saldo inicial
console.log("=== CUENTA CON TITULAR Y SALDO INICIAL ===");
const cuenta1 = new Cuenta("Juan", 100);
console.log(cuenta1.toString());

// Probar el segundo constructor (solo titular)
console.log("\n=== CUENTA SOLO CON TITULAR ===");
const cuenta2 = Cuenta.crearCuentaSoloTitular("María");
console.log(cuenta2.toString());

// Prueba de las operaciones solicitadas
console.log("\n=== PRUEBA DE OPERACIONES ===");
const cuenta = new Cuenta("Carlos", 100);
console.log("Estado inicial: " + cuenta.toString());

cuenta.ingresar(10);
console.log("Después de ingresar 10: " + cuenta.toString());

cuenta.retirar(50);
console.log("Después de retirar 50: " + cuenta.toString());

cuenta.ingresar(15);
console.log("Después de ingresar 15: " + cuenta.toString());

cuenta.retirar(100);
console.log("Después de retirar 100: " + cuenta.toString());

// Prueba adicional: intentar ingresar cantidad negativa
console.log("\n=== PRUEBA INGRESO NEGATIVO ===");
cuenta.ingresar(-20);
console.log("Después de intentar ingresar -20: " + cuenta.toString());
// Clase Cuenta con todos los atributos y métodos requeridos
class Cuenta {
    
    // Constructor principal: titular obligatorio, cantidad opcional
    constructor(titular, cantidad = 0) {
        this.titular = titular;     // Titular es obligatorio
        this.cantidad = cantidad;   // Cantidad es opcional (por defecto 0)
    }
    
    // ========== MÉTODOS GET ==========
    
    // Getter para obtener el titular de la cuenta
    getTitular() {
        return this.titular;
    }
    
    // Getter para obtener la cantidad/saldo de la cuenta
    getCantidad() {
        return this.cantidad;
    }
    
    // ========== MÉTODOS SET ==========
    
    // Setter para modificar el titular de la cuenta
    setTitular(nuevoTitular) {
        this.titular = nuevoTitular;
    }
    
    // Setter para modificar la cantidad/saldo de la cuenta
    setCantidad(nuevaCantidad) {
        this.cantidad = nuevaCantidad;
    }
    
    // ========== MÉTODO TOSTRING ==========
    
    // Método toString para mostrar la información de la cuenta de forma legible
    toString() {
        return `Cuenta de ${this.titular}: ${this.cantidad.toFixed(2)}€`;
    }
    
    // ========== MÉTODOS ESPECIALES ==========
    
    // Método ingresar: añade dinero a la cuenta
    // Si la cantidad es negativa, no hace nada
    ingresar(cantidad) {
        if (cantidad > 0) {
            this.cantidad += cantidad;
            console.log(`Ingreso de ${cantidad.toFixed(2)}€ realizado correctamente`);
        } else {
            console.log("No se puede ingresar una cantidad negativa o cero");
        }
    }
    
    // Método retirar: retira dinero de la cuenta
    // Si el resultado sería negativo, el saldo pasa a ser 0
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

// ========== PROGRAMA DE PRUEBA ==========

console.log("=".repeat(50));
console.log("PROGRAMA DE PRUEBA - CLASE CUENTA");
console.log("=".repeat(50));

// Crear una cuenta con cantidad 100
console.log("\n--- Creando cuenta ---");
const miCuenta = new Cuenta("Alberto Jiménez", 100);
console.log("Cuenta creada:");
console.log(miCuenta.toString());
console.log(`Saldo actual: ${miCuenta.getCantidad().toFixed(2)}€`);

// Ingresar 10
console.log("\n--- Operación 1: Ingresar 10€ ---");
miCuenta.ingresar(10);
console.log(miCuenta.toString());
console.log(`Saldo actual: ${miCuenta.getCantidad().toFixed(2)}€`);

// Retirar 50
console.log("\n--- Operación 2: Retirar 50€ ---");
miCuenta.retirar(50);
console.log(miCuenta.toString());
console.log(`Saldo actual: ${miCuenta.getCantidad().toFixed(2)}€`);

// Ingresar 15
console.log("\n--- Operación 3: Ingresar 15€ ---");
miCuenta.ingresar(15);
console.log(miCuenta.toString());
console.log(`Saldo actual: ${miCuenta.getCantidad().toFixed(2)}€`);

// Retirar 100
console.log("\n--- Operación 4: Retirar 100€ ---");
miCuenta.retirar(100);
console.log(miCuenta.toString());
console.log(`Saldo actual: ${miCuenta.getCantidad().toFixed(2)}€`);

console.log("\n" + "=".repeat(50));
console.log("FIN DEL PROGRAMA DE PRUEBA");
console.log("=".repeat(50));

// ========== PRUEBAS ADICIONALES ==========

console.log("\n--- Pruebas adicionales ---");

// Prueba de validaciones
console.log("\nProbando ingresos negativos:");
miCuenta.ingresar(-50);

console.log("\nProbando retiros negativos:");
miCuenta.retirar(-25);

// Prueba de métodos get y set
console.log("\nProbando getters:");
console.log(`Titular: ${miCuenta.getTitular()}`);
console.log(`Cantidad: ${miCuenta.getCantidad()}€`);

console.log("\nProbando setters:");
miCuenta.setTitular("Juan Pérez");
miCuenta.setCantidad(500);
console.log("Después de cambiar titular y cantidad:");
console.log(miCuenta.toString());

// Prueba de constructor con solo titular
console.log("\nCreando cuenta solo con titular:");
const cuentaSinSaldo = new Cuenta("María García");
console.log(cuentaSinSaldo.toString());
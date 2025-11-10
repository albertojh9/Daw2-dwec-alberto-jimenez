// Importamos la clase Cuenta desde el módulo cuenta.mjs
import { Cuenta } from './cuenta.mjs';

// Función principal que ejecuta las pruebas
function realizarPruebas() {
    console.log("=== PRUEBA DE OPERACIONES BANCARIAS ===\n");

    // 1. Crear una cuenta con cantidad inicial de 100€
    console.log("1. Crear cuenta con 100€");
    const miCuenta = new Cuenta(100);
    console.log(`Saldo inicial: ${miCuenta.obtenerSaldo()}€\n`);

    // 2. Ingresar 10€
    console.log("2. Ingresar 10€");
    miCuenta.ingresar(10);
    console.log();

    // 3. Retirar 50€
    console.log("3. Retirar 50€");
    miCuenta.retirar(50);
    console.log();

    // 4. Ingresar 15€
    console.log("4. Ingresar 15€");
    miCuenta.ingresar(15);
    console.log();

    // 5. Retirar 100€
    console.log("5. Retirar 100€");
    miCuenta.retirar(100);
    console.log();

    // Resumen final
    console.log("=== RESUMEN FINAL ===");
    console.log(`Saldo final: ${miCuenta.obtenerSaldo()}€`);
}

// Ejecutar las pruebas
realizarPruebas();

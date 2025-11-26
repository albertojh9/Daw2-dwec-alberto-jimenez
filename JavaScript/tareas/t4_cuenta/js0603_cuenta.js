// js0603 - Clase Cuenta (versión compacta)
"use strict";

class Cuenta {
    constructor(propietario, saldo = 0) {
        if (!propietario) throw new Error("El titular debe ser obligatorio");
        this.propietario = propietario;
        this.saldo = saldo;
    }
    
    getTitular() { return this.propietario; }
    setTitular(nuevo) { this.propietario = nuevo; }
    getCantidad() { return "Saldo actual: " + this.saldo; }
    setCantidad(nuevo) { this.saldo = nuevo; }
    toString() { return "Titular: " + this.propietario + "\nCantidad: " + this.saldo; }
    
    ingresar(monto) {
        if (monto < 0) console.log("No se pudo hacer la operación");
        else {
            this.saldo += monto;
            console.log("Ingresando dinero...la operación se realizó correctamente");
        }
    }
    
    retirar(monto) {
        if (this.saldo - monto < 0) {
            this.saldo = 0;
            console.log("La cantidad de dinero actualmente en la cuenta es 0");
        } else {
            this.saldo -= monto;
            console.log("Retirando dinero...la operación se realizó correctamente");
        }
    }
}

let cuentaAlberto = new Cuenta("Alberto", 100);
console.log(cuentaAlberto.ingresar(10));
console.log(cuentaAlberto.getCantidad());
console.log(cuentaAlberto.retirar(50));
console.log(cuentaAlberto.getCantidad());
console.log(cuentaAlberto.ingresar(10));
console.log(cuentaAlberto.getCantidad());
console.log(cuentaAlberto.retirar(50));
console.log(cuentaAlberto.getCantidad());
console.log(cuentaAlberto.retirar(100));
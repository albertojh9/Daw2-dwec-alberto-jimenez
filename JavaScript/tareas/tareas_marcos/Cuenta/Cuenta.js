class Cuenta{

    constructor(titular, cantidad){
        if(!titular){
            throw new Error("El titular debe ser obligatorio");
        }
        this.titular = titular;
        this.cantidad = cantidad;
    }

    getTitular(){
        return this.titular;
    }

    setTitular(titular){
        this.titular = titular;
    }

    getCantidad(){
        return "Saldo actual: " + this.cantidad;
    }

    setCantidad(cantidad){
        this.cantidad = cantidad;
    }

    toString(){
        return "Titular: " + this.titular + "\n" + 
               "Cantidad: " + this.cantidad;
    }

    ingresar(cantidadDinero){
        if(cantidadDinero < 0){
            console.log("No se pudo hacer la operación");
        } else{
            this.cantidad += cantidadDinero;
            console.log("Ingresando dinero...la operación se realizó correctamente");
        }
    }

    retirar(cantidadDinero){
        let resta = this.cantidad - cantidadDinero;
        if(resta < 0){
            this.cantidad = 0;
            console.log("La cantidad de dinero actualmente en la cuenta es 0");
        }else{
            this.cantidad -= cantidadDinero;
            console.log("Retirando dinero...la operación se realizó correctamente");
        }
    }

}

let cuentaMarcos = new Cuenta("Marcos", 100);

console.log(cuentaMarcos.ingresar(10));
console.log(cuentaMarcos.getCantidad());
console.log(cuentaMarcos.retirar(50));
console.log(cuentaMarcos.getCantidad());
console.log(cuentaMarcos.ingresar(10));
console.log(cuentaMarcos.getCantidad());
console.log(cuentaMarcos.retirar(50));
console.log(cuentaMarcos.getCantidad());
console.log(cuentaMarcos.retirar(100));
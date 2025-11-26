class Cuenta{

    constructor(titular, cantidad = null){
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
        return this.cantidad;
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
            console.log("La operación se realizó correctamente");
        }
    }

    retirar(cantidadDinero){
        let resta = this.cantidad - cantidadDinero;
        if(resta < 0){
            this.cantidad = 0;
            console.log("La cantidad de dinero actualmente en la cuenta es 0");
        }else{
            this.cantidad -= cantidadDinero;
            console.log("La operación se realizó correctamente");
        }
    }

}
"use strict";
const prompt = require('prompt-sync')();

const sexo_por_defecto = 'H';

class Persona{

    constructor(nombre = "", edad = 0, dni, sexo = sexo_por_defecto, peso = 0, altura = 0){
        if(!dni){
            throw new Error("El dni es obligatorio");
        }

        if(!nombre){
            throw new Error("El nombre es obligatorio");
        }

        if(!sexo){
            throw new Error("El sexo es obligatorio");
        }

        this.nombre = nombre;
        this.edad = edad;
        this.dni = dni;
        this.sexo = sexo;
        this.peso = peso;
        this.altura = altura;
    }

    calcularIMC(){
        let resultado = 0;
        let IMC = this.peso / Math.pow(this.altura, 2);

        if(IMC < 20){
            resultado = -1;
        } else if(IMC >= 20 && IMC <= 25){
            resultado = 0;
        }else{
            resultado = 1;
        }
        return resultado;
    }

    esMayorDeEdad(){
        let mayor = false;
        if(this.edad >= 18){
            mayor = true;
        } else{
            mayor = false;
        }
        return mayor;
    }

    validarDNI() {

        if (this.dni.length !== 9) {
            return false;
        }

    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';


    const numero = this.dni.slice(0, 8);
    const letra = this.dni[8].toUpperCase();

    for (let i = 0; i < 8; i++) {
        if (numero[i] < '0' || numero[i] > '9') {
        return false;
        }
    }

    const letraCorrecta = letras.charAt(parseInt(numero, 10) % 23);

    return letra === letraCorrecta;

    }

}

const persona = new Persona("Juan", 21, "08372018H", 'H', 80, 1.79);

function menu(){
    

    while(true){
        console.log("1.Calcular IMC" + "\n" + 
                "2.Ver si es mayor de edad" + "\n" + 
                "3.Validar DNI" + "\n" + 
                "S.Salir"
        );

        let opcion = prompt("Introduzca una opcion: ");
        if(opcion.toUpperCase() === "S"){
            break;
        }

        switch(opcion){
            case "1": console.log(persona.calcularIMC());
                break;
            case "2": console.log(persona.esMayorDeEdad());
                break;
            case "3": console.log(persona.validarDNI());
                break;

        }
    }
    

}

menu();
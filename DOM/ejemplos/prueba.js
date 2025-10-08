//--------------------------------
//Dependencias
//--------------------------------

//-------------------------------
//Inicialización
//--------------------------------
const titulo = document.getElementById("titulo");
titulo.textContent = "Otro titulo";

const parrafos = document.getElementsByTagName("p");
let n=1;
for(let p of parrafos){
    p.textContent = "Parrafo"+n++;
}

const botones = document.getElementsByName("boton");
for(let b of botones){
    b.value = "Botón" + n++;
}

const parrafo1 = document.querySelector("h1 + p");
parrafo1.textContent = "Primer párrafo tras el título";



//-------------------------------
//Eventos
//--------------------------------

//--------------------------------
//Funciones de utilidad
//--------------------------------

console.log("Hola, mundo");

alert("Hola mundo");



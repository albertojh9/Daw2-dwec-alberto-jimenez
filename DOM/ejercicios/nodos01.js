//------------------------------------------------------
// Inicializacion
//------------------------------------------------------

window.addEventListener("load", function() { 
    //Implementacion de la suma
    const botonSumar = document.getElementById('sumar');
    botonSumar.addEventListener("click", eventoSumar);

    // Implementacion del ocultar
    const botonesOcultar = document.querySelectorAll(".ocultar");
    for(let boton of botonesOcultar) {
        boton.addEventListener("click", function(evento) {
            const campo = evento.target.parentNode.querySelector("input");
            campo.style.display = "none";

        });
    }
});



//------------------------------------------------------
//Eventos
//------------------------------------------------------
function eventoSumar(evento) {
  
    console.log(evento.target);
    console.log(evento.clientX);  
  
  
    const campos = document.querySelectorAll("#campos input");

    let suma = 0;
    campos.forEach(function(evento) {
        suma += Number(campo.value);
    });

    const resultado = document.getElementById("suma");
    resultado.value = suma;

};




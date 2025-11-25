//-----------------------------------------------------------------------
// Inicialización
//-----------------------------------------------------------------------

$("body").ready(() => {
    $("#botonMostrarPares").on("click", mostrarPares);
    $("#botonLimpiar").on("click", () => $('#textoResultado').val(''));
});


//-----------------------------------------------------------------------
// Gestores de eventos
//-----------------------------------------------------------------------

function mostrarPares() {

    $("#textoResultado").val('');
    const numero = $("#inputNumero").val();

    for(let n = 1;n <= numero;n++) {
        if(n % 2 == 0) {
            $("#textoResultado").val($("#textoResultado").val()+','+n);
        }
    }

}
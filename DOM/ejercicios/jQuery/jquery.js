"use strict";

const campos = document.querySelectorAll("input");
console.log(campos);

for(let c of campos){
    c.value = "10";
}

const camposj = $("input")
                .val("30")
                .css("background-color", "green")
                .before("<hr>")
                .remove("#nombre")
                .on("focusin change click", onLoqueSea);
console.log(camposj);

function onLoqueSea(evento){
    console.log(evento.target);
}
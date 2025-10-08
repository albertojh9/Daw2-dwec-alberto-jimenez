// Crea la interfaz para leer desde consola
const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout });

// Variables para la pantalla y la memoria de la calculadora
let pantalla = 0, memoria = 0;

// Realiza una operación sobre la pantalla
function op(valor, f) { pantalla = f(pantalla, valor); }

// Calcula el factorial de un número
function fact(n) { return n < 0 || !Number.isInteger(n) ? NaN : (n ? n * fact(n - 1) : 1); }

// Muestra el menú y gestiona las operaciones
function menu() {
  console.log(`\nPantalla: ${pantalla} | Memoria: ${memoria}`);
  rl.question("Operación (+,-,*,/,%,!,^,M,R,C,S): ", o => {
    // Sale si el usuario pulsa S
    if ("Ss".includes(o)) return rl.close();
    // Factorial
    if (o === "!") pantalla = fact(pantalla);
    // Potencia
    else if (o === "^") return rl.question("Exponente: ", e => { pantalla **= parseFloat(e); menu(); });
    // Guarda en memoria
    else if (o === "M") memoria = pantalla;
    // Recupera de memoria
    else if (o === "R") pantalla = memoria;
    // Borra pantalla y memoria
    else if (o === "C") pantalla = memoria = 0;
    // Operaciones aritméticas
    else if ("+-*/%".includes(o)) return rl.question("Valor: ", v => {
      const n = parseFloat(v);
      const f = { "+": (a,b)=>a+b, "-":(a,b)=>a-b, "*":(a,b)=>a*b, "/":(a,b)=>a/b, "%":(a,b)=>a%b }[o];
      op(n, f); menu();
    });
    menu();
  });
}

// Prueba automática de la calculadora
function prueba() {
  console.log("=== Prueba automática ===");
  pantalla = 5;
  op(3,(a,b)=>a+b); op(2,(a,b)=>a-b); op(4,(a,b)=>a*b); op(3,(a,b)=>a/b); op(5,(a,b)=>a%b);
  pantalla = fact(pantalla); memoria = pantalla; pantalla = 0; pantalla = memoria;
  console.log("Fin de prueba.\n");
  menu();
}

// Inicia la prueba automática
prueba();
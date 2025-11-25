// Versión para terminal (Node.js) del juego adivina el número
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("🎮 Juego iniciado correctamente");

// Constantes
const INTENTOS = 3;
const MAX = 10;
const numeroSecreto = Math.floor(Math.random() * (MAX + 1));

let intentos = INTENTOS;

console.log(`🎯 Adivina un número entre 0 y ${MAX}. Tienes ${INTENTOS} intentos.`);
console.log(`🔍 Número secreto generado: ${numeroSecreto} (solo para testing)`);

function jugar() {
  if (intentos === 0) {
    console.log(`¡Se acabaron los intentos! El número era ${numeroSecreto}.`);
    console.log(`❌ Juego terminado. El número era ${numeroSecreto}.`);
    return rl.close();
  }

  rl.question(`Intento ${INTENTOS - intentos + 1}: Ingresa un número entre 0 y ${MAX}: `, (num) => {
    const n = parseInt(num);
    if (isNaN(n) || n < 0 || n > MAX) {
      console.log(`Número inválido. Debe estar entre 0 y ${MAX}.`);
      console.log(`⚠️ Número inválido: ${num}`);
      return jugar();
    }

    if (n === numeroSecreto) {
      console.log(`🎉 ¡Adivinaste el número ${numeroSecreto}!`);
      console.log(`🎉 ¡GANASTE! El número era ${numeroSecreto}`);
      return rl.close();
    }

    const pista = n > numeroSecreto ? 'menor' : 'mayor';
    console.log(`El número secreto es ${pista}.`);
    console.log(`💡 Pista: El número es ${pista} que ${n}`);
    intentos--;
    jugar();
  });
}

// Iniciar el juego
console.log("🚀 Iniciando juego...");
jugar();

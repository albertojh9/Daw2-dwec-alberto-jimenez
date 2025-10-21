// Constantes
const INTENTOS = 3;
const MAX = 10;
const numeroSecreto = Math.floor(Math.random() * (MAX + 1));

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let intentos = INTENTOS;

console.log(`Adivina un número entre 0 y ${MAX}. Tienes ${INTENTOS} intentos.`);

function jugar() {
  if (intentos === 0) {
    console.log(`¡Se acabaron los intentos! El número era ${numeroSecreto}.`);
    return readline.close();
  }

  readline.question(`Intento ${INTENTOS - intentos + 1}: `, (num) => {
    const n = parseInt(num);
    if (isNaN(n) || n < 0 || n > MAX) {
      console.log(`Número inválido. Debe estar entre 0 y ${MAX}.`);
      return jugar();
    }

    if (n === numeroSecreto) {
      console.log(`🎉 ¡Adivinaste el número ${numeroSecreto}!`);
      return readline.close();
    }

    console.log(`El número secreto es ${n > numeroSecreto ? 'menor' : 'mayor'}.`);
    intentos--;
    jugar();
  });
}

jugar();

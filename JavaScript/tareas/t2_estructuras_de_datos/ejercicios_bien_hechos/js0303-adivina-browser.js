// Versión para navegador del juego adivina el número
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
    alert(`¡Se acabaron los intentos! El número era ${numeroSecreto}.`);
    console.log(`❌ Juego terminado. El número era ${numeroSecreto}.`);
    return;
  }

  const num = prompt(`Intento ${INTENTOS - intentos + 1}: Ingresa un número entre 0 y ${MAX}`);
  
  if (num === null) {
    console.log("🚪 Juego cancelado por el usuario");
    return;
  }
  
  const n = parseInt(num);
  if (isNaN(n) || n < 0 || n > MAX) {
    alert(`Número inválido. Debe estar entre 0 y ${MAX}.`);
    console.log(`⚠️ Número inválido: ${num}`);
    return jugar();
  }

  if (n === numeroSecreto) {
    alert(`🎉 ¡Adivinaste el número ${numeroSecreto}!`);
    console.log(`🎉 ¡GANASTE! El número era ${numeroSecreto}`);
    return;
  }

  const pista = n > numeroSecreto ? 'menor' : 'mayor';
  alert(`El número secreto es ${pista}.`);
  console.log(`💡 Pista: El número es ${pista} que ${n}`);
  intentos--;
  jugar();
}

// Iniciar el juego cuando se carga la página
console.log("🚀 Iniciando juego...");
jugar();
// formulario-validaciones.mjs
// Funciones de validación exportadas para ser reutilizadas

export function validarRequired(value) {
  return value != null && String(value).trim().length > 0;
}

export function validarDni(value) {
  if (!value) return false;
  const dni = String(value).toUpperCase().replace(/[^0-9A-Z]/g, '');
  if (dni.length !== 9) return false;
  const numero = dni.slice(0, 8);
  const letra = dni[8];
  if (!/^[0-9]{8}$/.test(numero)) return false;
  const tabla = 'TRWAGMYFPDXBNJZSQVHLCKET';
  const calc = tabla[parseInt(numero, 10) % 23];
  return calc === letra;
}

export function validarEmail(value) {
  if (!value) return false;
  return String(value).includes('@');
}

export function validarPassMatch(value, targetValue) {
  return value === targetValue;
}

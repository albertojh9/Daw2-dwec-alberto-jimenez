// formulario.mjs - lógica principal (módulo)
// Implementa ayuda por campo, validación por campo y validación del formulario al enviar

import { validarRequired, validarDni, validarEmail, validarPassMatch } from './formulario-validaciones.mjs';

function mostrarAyuda(text) {
  const p = document.getElementById('ayudaTexto');
  p.textContent = text || '';
}

function mostrarErrorCampo(el, msg) {
  el.dataset.error = msg;
  el.style.backgroundColor = '#fdd';
  mostrarAyuda(msg);
}

function limpiarErrorCampo(el) {
  delete el.dataset.error;
  el.style.backgroundColor = '';
}

function validarCampo(el) {
  const tipo = el.dataset.validate;
  const val = el.value;

  limpiarErrorCampo(el);

  if (!tipo) return true;

  switch (tipo) {
    case 'required':
      if (!validarRequired(val)) {
        mostrarErrorCampo(el, 'Este campo es obligatorio y no puede estar vacío.');
        return false;
      }
      break;
    case 'dni':
      if (!validarDni(val)) {
        mostrarErrorCampo(el, 'DNI inválido. Debe tener 8 dígitos y una letra correcta.');
        return false;
      }
      break;
    case 'email':
      if (!validarEmail(val)) {
        mostrarErrorCampo(el, 'Email inválido. Debe contener una @.');
        return false;
      }
      break;
    case 'passmatch':
      const targetId = el.dataset.passmatchTarget;
      const target = document.getElementById(targetId);
      if (!target) return true;
      if (!validarPassMatch(val, target.value)) {
        mostrarErrorCampo(el, 'Las contraseñas no coinciden. Introduce las dos de nuevo.');
        return false;
      }
      break;
    default:
      return true;
  }

  return true;
}

function setupField(el) {
  el.addEventListener('focus', () => {
    const help = el.dataset.help || '';
    mostrarAyuda(help);
  });

  el.addEventListener('blur', () => {
    const ok = validarCampo(el);
    if (!ok) {
      setTimeout(() => el.focus(), 0);
      return;
    }
    if (!el.dataset.help) mostrarAyuda('');
  });

  el.addEventListener('input', () => {
    limpiarErrorCampo(el);
  });
}

function validarFormulario(form) {
  const elements = Array.from(form.querySelectorAll('input'));
  let firstError = null;
  elements.forEach(el => limpiarErrorCampo(el));

  for (const el of elements) {
    const ok = validarCampo(el);
    if (!ok && !firstError) firstError = el;
  }

  if (firstError) {
    mostrarAyuda(firstError.dataset.error || 'Hay errores en el formulario.');
    firstError.focus();
    return false;
  }

  const pass1 = document.getElementById('pass1');
  const pass2 = document.getElementById('pass2');
  if (pass1 && pass2 && pass1.value !== pass2.value) {
    mostrarErrorCampo(pass1, 'Las contraseñas no coinciden. Introduce ambas de nuevo.');
    pass1.focus();
    return false;
  }

  return true;
}

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formCliente');
  const inputs = Array.from(form.querySelectorAll('input'));
  const btnLimpiar = document.getElementById('btnLimpiar');

  inputs.forEach(setupField);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validarFormulario(form)) {
      alert('Formulario válido. Envío simulado.');
    }
  });

  btnLimpiar.addEventListener('click', () => {
    form.reset();
    mostrarAyuda('');
    inputs.forEach(el => limpiarErrorCampo(el));
  });
});

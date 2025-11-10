// formulario.js (sin módulos)
// Implementa ayuda por campo, validación de campos y validación al enviar

// Mapa de ayudas alternativo (array asociativo) - en caso de querer usar JS en vez de data-help
const helpMap = {
  nombre: 'Introduce tu nombre (no vacío).',
  apellidos: 'Introduce tus apellidos (no vacío).',
  dni: 'DNI: 8 dígitos y una letra. Ej: 12345678Z',
  email: 'Introduce un email válido que contenga @.',
  pass1: 'Introduce la contraseña.',
  pass2: 'Repite la contraseña anterior.'
};

function mostrarAyuda(text) {
  const p = document.getElementById('ayudaTexto');
  p.textContent = text || '';
}

function mostrarErrorCampo(el, msg) {
  el.dataset.error = msg;
  el.classList.add('error');
  mostrarAyuda(msg);
}

function limpiarErrorCampo(el) {
  delete el.dataset.error;
  el.classList.remove('error');
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
    case 'passmatch': {
      const targetId = el.dataset.passmatchTarget;
      const target = document.getElementById(targetId);
      if (!target) return true;
      if (!validarPassMatch(val, target.value)) {
        // Validación por campo: marcar el segundo campo si no coincide
        mostrarErrorCampo(el, 'Las contraseñas no coinciden. Introduce las dos de nuevo.');
        return false;
      }
      break;
    }
    default:
      return true;
  }

  return true;
}

function setupField(el) {
  el.addEventListener('focus', () => {
    const help = el.dataset.help || helpMap[el.id] || '';
    mostrarAyuda(help);
  });

  el.addEventListener('blur', () => {
    let ok = true;
    try {
      ok = validarCampo(el);
    } catch (err) {
      console.error('Error validando campo', el.id, err);
      mostrarErrorCampo(el, 'Error interno de validación');
      ok = false;
    }
    if (!ok) {
      // marcar el campo con error, pero NO forzar foco para evitar bucles
      el.classList.add('error');
      return;
    }
    // si no hay ayuda definida, limpiar
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
    let ok = true;
    try {
      ok = validarCampo(el);
    } catch (err) {
      console.error('Error validando campo en formulario', el.id, err);
      mostrarErrorCampo(el, 'Error interno de validación');
      ok = false;
    }
    if (!ok && !firstError) firstError = el;
  }

  // Si hay errores, mostrar y focalizar el primero
  if (firstError) {
    mostrarAyuda(firstError.dataset.error || 'Hay errores en el formulario.');
    firstError.focus();
    return false;
  }

  // Validación de contraseñas: al enviar, si no coinciden marcar el primer campo
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
    try {
      if (validarFormulario(form)) {
        alert('Formulario válido. Envío simulado.');
      }
    } catch (err) {
      console.error('Error en submit', err);
      mostrarAyuda('Se ha producido un error. Intenta de nuevo.');
    }
  });

  btnLimpiar.addEventListener('click', () => {
    form.reset();
    mostrarAyuda('');
    inputs.forEach(el => limpiarErrorCampo(el));
  });
});

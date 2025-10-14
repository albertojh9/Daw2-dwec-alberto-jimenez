// archivo.js - versión limpia: sólo una inicialización
// Este script usa los ids definidos en index.html: miParrafo, tamanio, fuentes

function pxToPt(px) {
  return px * 0.75; // pt = px * 72/96
}

document.addEventListener('DOMContentLoaded', function () {
  const p = document.getElementById('miParrafo');
  const input = document.getElementById('tamanio');
  const select = document.getElementById('fuentes');

  // Si algunos elementos faltan, no hacemos nada
  if (!p || !input || !select) return;

  // Obtener tamaño actual (px) y convertir a pt para inicializar el input
  const style = window.getComputedStyle(p);
  const fontSizePx = parseFloat(style.fontSize) || 16;
  input.value = Math.round(pxToPt(fontSizePx));

  // Intentar seleccionar en el combo la familia que coincida (búsqueda simple)
  const currentFamily = (style.fontFamily || '').toLowerCase();
  for (let i = 0; i < select.options.length; i++) {
    if (currentFamily.includes(select.options[i].value.toLowerCase())) {
      select.selectedIndex = i;
      break;
    }
  }

  // Registrar manejadores UNA SOLA VEZ
  input.addEventListener('input', function () {
    const pt = Number(input.value) || 1;
    p.style.fontSize = pt + 'pt';
  });

  select.addEventListener('change', function () {
    p.style.fontFamily = select.value;
  });
});



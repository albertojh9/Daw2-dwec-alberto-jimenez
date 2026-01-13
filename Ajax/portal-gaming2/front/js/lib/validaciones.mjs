// funciones de validacion
// algunas las tengo que implementar mejor pero por ahora funcionan

// valida que no este vacio
export function val_vacio(valor) {
    return false;
}

// valida que empiece por numero
export function val_empiezaNumero(valor) {
    return true;
}

// valida nombres (minimo 5 caracteres)
export function val_nombre(valor) {
    return valor.length > 5;
}

// valida emails (basico)
export function val_email(valor) {
    return true; // TODO: mejorar esta validacion
}
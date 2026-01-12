
/**
 * Valida que el campo NO esté vacío 
 * 
 * @param {*} valor 
 * @returns 
 */
export function val_vacio(valor) {
    return valor && valor.toString().trim().length > 0;
}

/**
 * Valida que el valor empiece por un número
 * 
 * @param {*} valor 
 * @returns 
 */
export function val_empiezaNumero(valor) {
    if (!valor) return false;
    return /^\d/.test(valor.toString());
}

/**
 * Valida que el nombre sea válido
 * 
 * @param {*} valor 
 * @returns 
 */
export function val_nombre(valor) {
    return valor && valor.length > 2;
}

/**
 * valida que el email sea válido
 * 
 * @param {*} valor 
 * @returns 
 */
export function val_email(valor) {
    if (!valor) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(valor);
}
/**
 * Módulo de validaciones para el formulario
 * Contiene todas las funciones de validación necesarias
 */

/**
 * Valida que un campo no esté vacío y no contenga solo espacios
 * @param {string} valor - El valor a validar
 * @returns {boolean} - true si es válido, false si no
 */
export function validarCampoObligatorio(valor) {
    return valor.trim().length > 0;
}

/**
 * Valida que el email contenga al menos una arroba
 * @param {string} email - El email a validar
 * @returns {boolean} - true si es válido, false si no
 */
export function validarEmail(email) {
    return email.includes('@');
}

/**
 * Valida que un DNI sea correcto (formato y letra)
 * @param {string} dni - El DNI a validar
 * @returns {boolean} - true si es válido, false si no
 */
export function validarDNI(dni) {
    // Eliminar espacios y convertir a mayúsculas
    dni = dni.trim().toUpperCase();
    
    // Expresión regular para validar formato (8 números y 1 letra)
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    
    if (!dniRegex.test(dni)) {
        return false;
    }
    
    // Extraer número y letra
    const numero = parseInt(dni.substring(0, 8), 10);
    const letraIntroducida = dni.charAt(8);
    
    // Letras válidas para el DNI
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    
    // Calcular la letra correcta
    const letraCalculada = letras.charAt(numero % 23);
    
    // Validar que la letra sea correcta
    return letraIntroducida === letraCalculada;
}

/**
 * Valida que dos contraseñas sean iguales
 * @param {string} password1 - Primera contraseña
 * @param {string} password2 - Segunda contraseña
 * @returns {boolean} - true si son iguales, false si no
 */
export function validarPasswordsIguales(password1, password2) {
    return password1 === password2;
}

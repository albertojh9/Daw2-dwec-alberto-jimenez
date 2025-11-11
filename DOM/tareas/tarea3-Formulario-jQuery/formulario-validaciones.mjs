/**
 * Módulo de validaciones para el formulario
 * Contiene todas las funciones de validación necesarias
 */

/**
 * Valida que un campo no esté vacío y no contenga solo espacios
 * @param {string} valor - Valor del campo a validar
 * @returns {boolean} - true si es válido, false si no lo es
 */
export function validarObligatorio(valor) {
    // Verificar que no esté vacío y que no contenga solo espacios
    return valor.trim().length > 0;
}

/**
 * Valida que un DNI sea correcto según el algoritmo oficial
 * Formato: 8 números seguidos de una letra
 * @param {string} dni - DNI a validar
 * @returns {boolean} - true si es válido, false si no lo es
 */
export function validarDNI(dni) {
    // Limpiar espacios
    dni = dni.trim().toUpperCase();
    
    // Expresión regular para validar formato: 8 dígitos + 1 letra
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    
    if (!dniRegex.test(dni)) {
        return false;
    }
    
    // Extraer número y letra
    const numero = parseInt(dni.substr(0, 8), 10);
    const letraIntroducida = dni.charAt(8);
    
    // Letras válidas para el DNI
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    
    // Calcular letra correcta
    const letraCalculada = letras.charAt(numero % 23);
    
    // Comparar letra introducida con letra calculada
    return letraIntroducida === letraCalculada;
}

/**
 * Valida que un email contenga el símbolo arroba
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido, false si no lo es
 */
export function validarEmail(email) {
    // Verificar que no esté vacío
    if (email.trim().length === 0) {
        return false;
    }
    
    // Verificar que contenga arroba
    return email.includes('@');
}

/**
 * Valida que dos contraseñas coincidan
 * @param {string} password1 - Primera contraseña
 * @param {string} password2 - Segunda contraseña
 * @returns {boolean} - true si son iguales, false si no lo son
 */
export function validarPasswordsIguales(password1, password2) {
    // Verificar que no estén vacías
    //El trim verifica que no contengan solo espacios si no caracteres reales
    if (password1.trim().length === 0 || password2.trim().length === 0) {
        return false;
    }
    
    // Comparar ambas contraseñas
    return password1 === password2;
}

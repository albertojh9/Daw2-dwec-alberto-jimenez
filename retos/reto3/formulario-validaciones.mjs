/**
 * Módulo de validaciones para el formulario con código de 4 dígitos
 */

/**
 * Valida que un campo no esté vacío y no contenga solo espacios
 */
export function validarObligatorio(valor) {
    return valor.trim().length > 0;
}

/**
 * Valida que un DNI sea correcto según el algoritmo oficial
 */
export function validarDNI(dni) {
    dni = dni.trim().toUpperCase();
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    
    if (!dniRegex.test(dni)) {
        return false;
    }
    
    const numero = parseInt(dni.substr(0, 8), 10);
    const letraIntroducida = dni.charAt(8);
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const letraCalculada = letras.charAt(numero % 23);
    
    return letraIntroducida === letraCalculada;
}

/**
 * Valida que un email contenga el símbolo arroba
 */
export function validarEmail(email) {
    if (email.trim().length === 0) {
        return false;
    }
    return email.includes('@');
}

/**
 * Valida que dos contraseñas coincidan
 */
export function validarPasswordsIguales(password1, password2) {
    if (password1.trim().length === 0 || password2.trim().length === 0) {
        return false;
    }
    return password1 === password2;
}

/**
 * NUEVA VALIDACIÓN: Valida que un código tenga exactamente 4 dígitos
 * Permite ceros a la izquierda (0001, 0000, etc.)
 */
export function validarCodigo4Digitos(codigo) {
    // Limpiar espacios
    codigo = codigo.trim();
    
    // Debe tener exactamente 4 caracteres
    if (codigo.length !== 4) {
        return false;
    }
    
    // Todos los caracteres deben ser dígitos (0-9)
    const codigoRegex = /^[0-9]{4}$/;
    return codigoRegex.test(codigo);
}

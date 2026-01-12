// Funciones básicas de la app

// Función para sacar la ruta de los componentes html
function getUrlComponenteHtml(pagina) {
    return `${URL_BASE_COMPONENTES}/${pagina}.html`; 
}

// Para cerrar sesión y volver al login (simplificado)
function cerrarSesion() {
    // verificar si quiere cerrar sesion
    if (confirm('¿Seguro que quieres cerrar sesión?')) {
        // borro la sesion
        localStorage.removeItem('usuario_logueado');
        // vuelvo al login
        window.location.href = "/paginas/login/login.html";
    }
}
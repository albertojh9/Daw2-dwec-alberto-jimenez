// Funciones básicas de la app

// Función para sacar la ruta de los componentes html
function getUrlComponenteHtml(pagina) {
    return `${URL_BASE_COMPONENTES}/${pagina}.html`; 
}

// Para cerrar sesión y volver al login
function cerrarSesion() {
    // verificar si quiere cerrar sesion
    if (confirm('¿Seguro que quieres cerrar sesión?')) {
        // borro el token JWT
        localStorage.removeItem('jwtToken');
        // vuelvo al login
        window.location.href = "/paginas/login/login.html";
    }
}
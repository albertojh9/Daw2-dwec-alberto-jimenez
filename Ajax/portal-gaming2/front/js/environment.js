// Configuración de la API
// aqui esta la URL del servidor y las rutas principales

// direccion del servidor json
const URL_BACKEND="http://localhost:3000";

// objeto con toda la config de la API
const environment = {
    apiUrl: URL_BACKEND,
    endpoints: {
        videojuegos: `${URL_BACKEND}/videojuegos`,
        desarrolladoras: `${URL_BACKEND}/desarrolladoras`,
        generos: `${URL_BACKEND}/generos`,
        login: `${URL_BACKEND}/login`
    }
};


// URLs individuales (por si las necesito por separado)
const URL_VIDEOJUEGOS = `${URL_BACKEND}/videojuegos`;
const URL_DESARROLLADORAS = `${URL_BACKEND}/desarrolladoras`;
const URL_GENEROS = `${URL_BACKEND}/generos`;
const URL_LOGIN = `${URL_BACKEND}/login`;

// rutas de archivos estaticos


//-------------------------------------------------------------
// Direcciones de elementos estáticos de la página
//-------------------------------------------------------------
const URL_BASE_COMPONENTES = "/js/componentes"

//-------------------------------------------------------------
// Parámetros de configuración de la interfaz
//-------------------------------------------------------------
const TABLA_PRIMERA_PAGINA = 1;
const TABLA_REGISTROS_POR_PAGINA = 5;



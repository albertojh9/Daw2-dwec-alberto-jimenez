// funciones basicas para peticiones http
// Alberto Jimenez - 2º DAW

export { get, post, put, del }

// GET - para obtener datos
function get(url) {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwtToken")
        }
    });
}

// POST - para crear nuevos datos
function post(url, objeto) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwtToken")
        },
        body: JSON.stringify(objeto)
    });
}

// PUT - para actualizar datos
function put(url, objeto) {
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwtToken")
        },
        body: JSON.stringify(objeto)
    });
}

// DELETE - para borrar datos
function del(url) {
    return fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("jwtToken")
        }
    });
}
        }
    );
}


/**
 * Implementación de método DELETE
 */
function del(url, id) {
    return fetch(
        url+"/"+id, 
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwtToken")
            },
        }
    );
}


# GUÍA COMPLETA DEL PROYECTO - GESTIÓN DE PERSONAS
## Para la defensa del trabajo - 2º DAW

---

## INDICE RAPIDO

1. [Ejecución del Proyecto](#ejecución)
2. [Estructura del Proyecto](#estructura)
3. [Explicación del CRUD](#crud)
4. [Validaciones (Los 3 Tipos)](#validaciones)
5. [Listados Adicionales](#listados)
6. [Componente Reutilizable](#componente)
7. [Gráficas](#graficas)
8. [Preguntas Frecuentes del Profesor](#preguntas)

---

## EJECUCION DEL PROYECTO {#ejecución}

### Paso 1: Iniciar el Backend (JSON Server)

1. Abre una terminal
2. Navega a la carpeta del servidor:
   ```bash
   cd personas/json-server-root
   ```
3. Ejecuta el script servidor-jwt:
   ```bash
   # En Windows:
   servidor-jwt.bat
   
   # Si estás en Linux/Mac:
   npx json-server --watch db.json -m ./node_modules/json-server-auth -r routes.json
   ```
4. Deberías ver un mensaje indicando que el servidor está corriendo en `http://localhost:3000`

### Paso 2: Abrir el Frontend

1. Abre Visual Studio Code
2. Abre la carpeta `personas/front`
3. Haz clic derecho sobre cualquier archivo HTML (por ejemplo `index.html`)
4. Selecciona "Open with Live Server" o "Five Server"
5. Tu navegador se abrirá automáticamente

### Paso 3: Iniciar Sesión

- Usa uno de estos usuarios de prueba:
  - Email: `paco@mail.com` / Password: `12345678`
  - Email: `manolo@mail.com` / Password: `12345678`
  - Email: `juanjo@mail.com` / Password: `12345678`

### Paso 4: Navegar por la Aplicación

Una vez dentro, verás el menú de navegación con todas las opciones del proyecto.

---

## ESTRUCTURA DEL PROYECTO {#estructura}

```
personas/
├── json-server-root/           # Backend
│   ├── db.json                 # Base de datos
│   ├── servidor-jwt.bat        # Script para iniciar servidor
│   └── package.json
│
└── front/                      # Frontend
    ├── index.html              # Página de inicio
    ├── paginas/
    │   ├── login/              # Login
    │   └── personas/          # Todos los archivos del proyecto
    │       ├── personas.html                # Listado principal
    │       ├── personas.mjs                 # Lógica CRUD
    │       ├── personas_crear.html          # Crear personas
    │       ├── personas_crear.mjs
    │       ├── personas_modificar.html      # Modificar personas
    │       ├── personas_modificar.mjs
    │       ├── personas_alfabetico.html     # Listado alfabético
    │       ├── personas_alfabetico.mjs
    │       ├── personas_busqueda.html       # Búsqueda avanzada
    │       ├── personas_busqueda.mjs
    │       ├── personas_grafica.html        # Estadísticas
    │       ├── personas_grafica.mjs
    │       ├── selector-personas.mjs        # Componente reutilizable
    │       ├── componente_demo.html          # Demo del componente
    │       └── componente_demo.mjs
    │
    └── js/
        ├── environment.js      # Configuración (URL del backend)
        ├── app.js              # Funciones globales
        ├── componentes/        # Componentes reutilizables
        └── lib/                # Librerías (http, validaciones, etc.)
```

---

## EXPLICACION DEL CRUD {#crud}

### C - Create (Crear)

**Archivo:** `personas_crear.html` + `personas_crear.mjs`

**¿Cómo funciona?**
1. El usuario rellena el formulario con nombre, apellidos y empresa
2. Se validan los datos (ver sección de validaciones)
3. Al hacer submit, se envía una petición POST al servidor
4. Si todo va bien, redirige al listado principal

**Código clave en personas_crear.mjs:**
```javascript
function crearPersona(persona) {
    // Envía petición POST al servidor
    http.post(URL_PERSONAS, persona)
    .then(() => {
        // Muestra mensaje de éxito
        toast.mostrar("Se ha creado la persona correctamente");
    });
}
```

**Explicación:**
- `http.post()` es una función que envía datos al servidor
- `URL_PERSONAS` es la dirección del servidor (definida en environment.js)
- `toast.mostrar()` muestra una notificación al usuario
- `.then()` se ejecuta cuando la petición tiene éxito

### R - Read (Leer/Consultar)

**Archivo:** `personas.html` + `personas.mjs`

**¿Cómo funciona?**
1. Al cargar la página, se pide la lista de personas al servidor
2. Los datos se insertan en una tabla HTML
3. La tabla tiene paginación (5 personas por página)
4. Hay un buscador para filtrar personas

**Código clave en personas.mjs:**
```javascript
const TABLA_PERSONAS = new moduloTabla.Tabla(
    URL_PERSONAS,        // URL del servidor
    "#personas",         // Elemento HTML donde va la tabla
    JSON2HTML_PLANTILLA_TABLA  // Plantilla de cómo se ve cada fila
);

TABLA_PERSONAS.renderizar(); // Muestra la tabla
```

**Explicación:**
- Se crea un objeto `Tabla` que maneja toda la lógica de la tabla
- `renderizar()` hace una petición GET al servidor y muestra los resultados
- La paginación se maneja automáticamente con los parámetros `_page` y `_limit`

### U - Update (Actualizar)

**Archivo:** `personas_modificar.html` + `personas_modificar.mjs`

**¿Cómo funciona?**
1. Se recibe el ID de la persona a editar desde la URL (`?id=123`)
2. Se carga la persona actual del servidor
3. Se rellenan los campos del formulario con los datos actuales
4. Al guardar, se envía una petición PUT con los datos nuevos

**Código clave:**
```javascript
// Obtenemos el ID de la URL
id = Number(window.location.search.split("=")[1]);

// Cargamos la persona del servidor
http.get(URL_PERSONAS+"/"+id)
    .then(r => r.json())
    .then(persona => {
        // Rellenamos el formulario
        formulario.inicializarCampos(persona);
    });

// Al guardar
function modificarPersona(persona) {
    http.put(URL_PERSONAS+"/"+id, persona)
        .then(() => {
            toast.mostrar("Actualizado correctamente");
        });
}
```

**Explicación:**
- `window.location.search` obtiene la parte de la URL después del `?`
- `.split("=")[1]` divide por el `=` y toma la segunda parte (el ID)
- `http.put()` envía una petición PUT para actualizar

### D - Delete (Eliminar)

**Archivo:** `personas.mjs`

**¿Cómo funciona?**
1. El usuario hace clic en el botón de eliminar
2. Se muestra un modal preguntando si está seguro
3. Si confirma, se envía una petición DELETE al servidor
4. Se recarga la tabla para mostrar los cambios

**Código clave:**
```javascript
function onEliminarContacto() {
    const id = $(this).val(); // ID del botón
    
    // Pedir confirmación
    MODAL_PREGUNTA.preguntar(
        "Atención",
        "¿Está seguro de que desea eliminar el contacto?",
        () => {
            // Si confirma, eliminar
            eliminarContacto(id);
        }
    );
}

function eliminarContacto(id) {
    http.del(URL_CONTACTOS, id)
        .then(() => {
            TOAST.mostrar("El contacto se ha eliminado");
            TABLA_CONTACTOS.renderizar(); // Recargar tabla
        });
}
```

**Explicación:**
- `MODAL_PREGUNTA.preguntar()` muestra un modal de confirmación
- El tercer parámetro es una función que se ejecuta si el usuario confirma
- `http.del()` envía la petición DELETE
- `renderizar()` recarga la tabla con los datos actualizados

### Ordenación Ascendente/Descendente

**Archivo:** `contactos.mjs`

**¿Cómo funciona?**
1. Hay un botón "Ordenar" que alterna entre ascendente y descendente
2. Al hacer clic, cambia el orden y recarga la tabla

**Código clave:**
```javascript
let ordenActual = 'asc'; // Variable global

function cambiarOrdenacion() {
    if (ordenActual === 'asc') {
        ordenActual = 'desc';
        $("#btOrdenar").html('Descendente');
    } else {
        ordenActual = 'asc';
        $("#btOrdenar").html('Ascendente');
    }
    
    TABLA_CONTACTOS.renderizar();
}
```

**Explicación:**
- La variable `ordenActual` guarda si estamos en ascendente o descendente
- Se cambia el texto del botón para indicar el orden actual
- En una versión más avanzada, se pasaría este parámetro a la URL del servidor

---

## VALIDACIONES (LOS 3 TIPOS) {#validaciones}

### 1. Validaciones Síncronas

**¿Qué son?**
Validaciones que se ejecutan inmediatamente, sin esperar respuesta del servidor.

**Archivo:** `contactos_crear.mjs` (integradas en el formulario)

**Ejemplos en el proyecto:**
- El nombre debe tener al menos 3 caracteres
- El nombre solo puede contener letras
- Los apellidos son obligatorios

**Código de ejemplo:**
```javascript
// En el HTML
<input name="nombre" 
       placeholder="Nombre" 
       class="form-control" 
       data-validacion="nombre" 
       data-ayuda="Introduce un nombre válido"/>

// En el JavaScript (se ejecuta al escribir)
$("[name='nombre']").on("input", function() {
    const nombre = $(this).val();
    
    // Validación 1: No vacío
    if (nombre.trim() === '') {
        mostrarError("El nombre es obligatorio");
        return;
    }
    
    // Validación 2: Mínimo 3 caracteres
    if (nombre.length < 3) {
        mostrarError("Mínimo 3 caracteres");
        return;
    }
    
    // Validación 3: Solo letras
    const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexSoloLetras.test(nombre)) {
        mostrarError("Solo se permiten letras");
        return;
    }
    
    mostrarExito("Nombre válido");
});
```

**Explicación:**
- `.on("input")` se ejecuta cada vez que el usuario escribe
- Las validaciones se ejecutan una tras otra
- Si alguna falla, se muestra un mensaje y se detiene

### 2. Validaciones Asíncronas

**¿Qué son?**
Validaciones que requieren consultar el servidor, por lo que tardan tiempo.

**Ejemplo:** Verificar que un nombre no esté duplicado

**Código de ejemplo:**
```javascript
let timeoutValidacion;

$("[name='nombre']").on("input", function() {
    const nombre = $(this).val();
    
    // Limpiar el timeout anterior
    clearTimeout(timeoutValidacion);
    
    // Esperar 800ms después de que el usuario deje de escribir
    timeoutValidacion = setTimeout(async () => {
        
        // Mostrar "Verificando..."
        $("#nombre-ayuda").html('Verificando nombre...');
        
        // Consultar al servidor si existe
        const respuesta = await http.get(
            URL_CONTACTOS + `?nombre=${nombre}`
        );
        const contactos = await respuesta.json();
        
        if (contactos.length > 0) {
            $("#nombre-ayuda").html('Error: Este nombre ya existe');
        } else {
            $("#nombre-ayuda").html('Nombre disponible');
        }
        
    }, 800);
});
```

**Explicación:**
- **Debouncing:** Esperamos 800ms después de que el usuario deje de escribir para no hacer demasiadas peticiones
- `clearTimeout()` cancela el temporizador anterior si el usuario sigue escribiendo
- `async/await` permite esperar la respuesta del servidor
- `http.get()` consulta si existe algún contacto con ese nombre

### 3. Validación de Formulario

**¿Qué es?**
Validación que se ejecuta al enviar el formulario, antes de guardarlo.

**Código de ejemplo:**
```javascript
async function onContactoSubmit(contacto) {
    
    // Validar nombre
    if (!contacto.nombre || contacto.nombre.trim().length < 3) {
        alert("El nombre debe tener al menos 3 caracteres");
        return; // No continuar
    }
    
    // Validar apellidos
    if (!contacto.apellidos || contacto.apellidos.trim().length < 3) {
        alert("Los apellidos deben tener al menos 3 caracteres");
        return;
    }
    
    // Validación asíncrona: verificar duplicado
    const respuesta = await http.get(
        URL_CONTACTOS + `?nombre=${contacto.nombre}`
    );
    const contactosDuplicados = await respuesta.json();
    
    if (contactosDuplicados.length > 0) {
        alert("Ya existe un contacto con este nombre");
        return;
    }
    
    // Si todo es válido, crear el contacto
    crearContacto(contacto);
}
```

**Explicación:**
- Se validan todos los campos antes de enviar
- Si alguna validación falla, se muestra un mensaje y se detiene
- Solo si todo es válido se procede a guardar

---

## LISTADOS ADICIONALES {#listados}

### Listado 1: Filtrado Alfabético

**Archivos:** `contactos_alfabetico.html` + `contactos_alfabetico.mjs`

**¿Qué hace?**
Muestra botones A-Z y filtra los contactos según la letra inicial del nombre.

**Código clave:**
```javascript
// Generar botones A-Z
function generarBotonesAlfabeticos() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    
    letras.forEach(letra => {
        const boton = $(`<button>${letra}</button>`);
        boton.on("click", function() {
            filtrarPorLetra(letra);
        });
        $("#botonesAlfabeticos").append(boton);
    });
}

// Filtrar por letra
function filtrarPorLetra(letra) {
    const contactosFiltrados = todosLosContactos.filter(contacto => {
        return contacto.nombre.toUpperCase().startsWith(letra);
    });
    mostrarContactos(contactosFiltrados);
}
```

**Explicación:**
- `.split("")` convierte el string en un array de letras
- `.forEach()` recorre cada letra y crea un botón
- `.filter()` crea un nuevo array solo con los contactos que cumplen la condición
- `.startsWith()` verifica si el nombre empieza con esa letra

### Listado 2: Búsqueda Avanzada

**Archivos:** `contactos_busqueda.html` + `contactos_busqueda.mjs`

**¿Qué hace?**
- Búsqueda de texto completo (busca en nombre, apellidos y empresa)
- Selector de campo de ordenación (nombre, apellidos o empresa)
- Botones para orden ascendente/descendente
- Contador de resultados en tiempo real

**Código clave:**
```javascript
// Búsqueda de texto completo
function filtrarContactos(contactos, texto) {
    return contactos.filter(contacto => {
        const nombre = contacto.nombre.toLowerCase();
        const apellidos = (contacto.apellidos || '').toLowerCase();
        const empresa = (contacto.empresa || '').toLowerCase();
        
        // Si el texto está en cualquiera de los campos
        return nombre.includes(texto) || 
               apellidos.includes(texto) || 
               empresa.includes(texto);
    });
}

// Ordenación
function ordenarContactos(contactos, campo, direccion) {
    const copia = [...contactos]; // Copiar array
    
    copia.sort((a, b) => {
        let valorA = (a[campo] || '').toLowerCase();
        let valorB = (b[campo] || '').toLowerCase();
        
        if (valorA > valorB) return 1;
        if (valorA < valorB) return -1;
        return 0;
    });
    
    // Si es descendente, invertir
    if (direccion === 'desc') {
        copia.reverse();
    }
    
    return copia;
}
```

**Explicación:**
- `.includes()` verifica si el texto está contenido en el campo
- `||` (OR) significa "si está en nombre O apellidos O empresa"
- `.sort()` ordena el array
- `(a, b) => {...}` es una función que compara dos elementos
- `.reverse()` invierte el orden del array

---

## COMPONENTE REUTILIZABLE {#componente}

**Archivo:** `selector-contactos.mjs`

**¿Qué es?**
Un componente reutilizable es código que puedes usar en múltiples lugares sin tener que reescribirlo.

**INPUT y OUTPUT del componente:**

**INPUT (lo que recibe):**
- Opciones de configuración en el constructor

**OUTPUT (lo que emite):**
- Callbacks cuando cambia la selección

**Código de uso:**
```javascript
// INPUT: Pasamos opciones de configuración
const selector = new SelectorContactos('#contenedor', {
    label: 'Seleccionar Contacto',     // INPUT
    placeholder: 'Elige uno...',       // INPUT
    campoMostrar: 'nombre',           // INPUT
    onChange: (id, contacto) => {     // OUTPUT (callback)
        console.log('Seleccionado:', contacto);
    }
});

// Métodos públicos
selector.obtenerValorSeleccionado(); // Obtener ID
selector.obtenerContactoSeleccionado(); // Obtener objeto completo
selector.limpiar(); // Limpiar selección
```

**¿Por qué es reutilizable?**
1. Se puede crear múltiples veces con diferentes configuraciones
2. Cada instancia es independiente
3. El código está encapsulado en una clase
4. Solo expone métodos públicos

**Explicación del código interno:**
```javascript
export class SelectorContactos {
    constructor(selector, opciones = {}) {
        // Guardar configuración (INPUT)
        this.config = {
            label: opciones.label || 'Por defecto',
            onChange: opciones.onChange || null
        };
        
        // Renderizar el componente
        this.renderizar();
    }
    
    renderizar() {
        // Crear el HTML
        const html = `<select id="${this.id}">...</select>`;
        $(this.selector).html(html);
        
        // Asignar evento (OUTPUT)
        if (this.config.onChange) {
            $(`#${this.id}`).on('change', () => {
                this.config.onChange(valor, contacto);
            });
        }
        
        // Cargar datos del servidor
        this.cargarContactos();
    }
}
```

---

## GRAFICAS {#graficas}

**Archivos:** `contactos_grafica.html` + `contactos_grafica.mjs`

**Librería usada:** Chart.js

**3 Gráficas implementadas:**

1. **Gráfica de Barras:** Top 5 empresas con más contactos
2. **Gráfica de Torta:** Distribución (con/sin empresa)
3. **Gráfica de Línea:** Distribución alfabética (A-Z)

**Código de ejemplo (Gráfica de Barras):**
```javascript
function generarGraficaEmpresas(contactos) {
    // 1. Contar contactos por empresa
    const empresasMap = new Map();
    contactos.forEach(c => {
        if (c.empresa) {
            const emp = c.empresa.trim();
            empresasMap.set(emp, (empresasMap.get(emp) || 0) + 1);
        }
    });
    
    // 2. Ordenar y tomar top 5
    const empresasArray = Array.from(empresasMap.entries())
        .sort((a,b) => b[1] - a[1])
        .slice(0, 5);
    
    // 3. Preparar datos para Chart.js
    const labels = empresasArray.map(i => i[0]); // Nombres
    const datos = empresasArray.map(i => i[1]);  // Cantidades
    
    // 4. Crear gráfica
    const ctx = document.getElementById('graficaEmpresas')
                        .getContext('2d');
    
    new Chart(ctx, {
        type: 'bar', // Tipo de gráfica
        data: {
            labels: labels,      // Etiquetas eje X
            datasets: [{
                label: 'Número de Contactos',
                data: datos,     // Valores eje Y
                backgroundColor: ['azul', 'amarillo', ...],
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
```

**Explicación:**
- `Map` es una estructura de datos clave-valor
- `.set(clave, valor)` guarda un valor
- `.get(clave)` obtiene un valor
- `Array.from()` convierte el Map en array
- `.sort()` ordena por cantidad
- `.slice(0, 5)` toma solo los primeros 5
- `Chart` crea la gráfica visual

---

## ❓ PREGUNTAS FRECUENTES DEL PROFESOR {#preguntas}

### 1. "¿Por qué usas `async/await`?"

**Respuesta:**
`async/await` es una forma de trabajar con código asíncrono (que tarda tiempo en ejecutarse, como peticiones al servidor).

```javascript
// Sin async/await (difícil de leer)
http.get(URL_CONTACTOS)
    .then(r => r.json())
    .then(contactos => {
        console.log(contactos);
    });

// Con async/await (más fácil de leer)
async function cargar() {
    const respuesta = await http.get(URL_CONTACTOS);
    const contactos = await respuesta.json();
    console.log(contactos);
}
```

La ventaja es que el código se lee de arriba a abajo, como si fuera síncrono.

### 2. "¿Qué es el debounce?"

**Respuesta:**
Debounce es una técnica para evitar ejecutar una función demasiadas veces.

**Ejemplo:** Si el usuario escribe "Juan", sin debounce haríamos 4 peticiones al servidor (J, Ju, Jua, Juan).

Con debounce, esperamos 800ms después de que deje de escribir y solo hacemos 1 petición.

### 3. "¿Qué diferencia hay entre `let` y `const`?"

**Respuesta:**
- `const`: Para valores que no van a cambiar
- `let`: Para valores que pueden cambiar

```javascript
const PI = 3.14159;
PI = 3.14; // ❌ Error

let contador = 0;
contador = 1; // ✅ OK
```

### 4. "¿Qué son las arrow functions?"

**Respuesta:**
Son una forma más corta de escribir funciones.

```javascript
// Función tradicional
function sumar(a, b) {
    return a + b;
}

// Arrow function
const sumar = (a, b) => {
    return a + b;
};

// Arrow function (versión corta)
const sumar = (a, b) => a + b;
```

### 5. "¿Qué es el operador spread `...`?"

**Respuesta:**
El operador spread (`...`) expande un array u objeto.

```javascript
// Copiar array
const original = [1, 2, 3];
const copia = [...original]; // [1, 2, 3]

// Concatenar arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combinado = [...arr1, ...arr2]; // [1, 2, 3, 4]
```

### 6. "¿Por qué usas jQuery?"

**Respuesta:**
jQuery simplifica la manipulación del DOM y las peticiones AJAX.

```javascript
// JavaScript vanilla
document.getElementById("boton")
        .addEventListener("click", function() {
    document.getElementById("mensaje").textContent = "Hola";
});

// Con jQuery (más corto)
$("#boton").on("click", function() {
    $("#mensaje").text("Hola");
});
```

### 7. "¿Qué es Bootstrap?"

**Respuesta:**
Bootstrap es un framework CSS que proporciona componentes prediseñados (botones, tablas, modales, etc.) y un sistema de grid para layouts responsivos.

### 8. "¿Qué son las promesas?"

**Respuesta:**
Una promesa es un objeto que representa una operación asíncrona que puede tener éxito o fallar.

```javascript
http.get(URL_CONTACTOS)
    .then(resultado => {
        // Éxito
        console.log(resultado);
    })
    .catch(error => {
        // Error
        console.error(error);
    });
```

### 9. "¿Qué es JSON2HTML?"

**Respuesta:**
Es una librería que convierte objetos JavaScript en HTML.

```javascript
const plantilla = {
    '<>': 'tr', 'html': [
        {'<>': 'td', 'html': '${nombre}'},
        {'<>': 'td', 'html': '${apellidos}'}
    ]
};

const contacto = {nombre: "Juan", apellidos: "García"};
// Resultado: <tr><td>Juan</td><td>García</td></tr>
```

### 10. "Explica esta línea de código"

**Consejo:** Lee la función completa primero, luego explica línea por línea.

**Ejemplo:**
```javascript
const contactosFiltrados = todosLosContactos.filter(
    c => c.nombre.toUpperCase().startsWith(letra)
);
```

**Explicación:**
- `todosLosContactos` es un array con todos los contactos
- `.filter()` crea un nuevo array solo con elementos que cumplen una condición
- `c =>` es una arrow function que recibe cada contacto
- `c.nombre.toUpperCase()` convierte el nombre a mayúsculas
- `.startsWith(letra)` verifica si empieza con esa letra
- El resultado es un array solo con contactos que empiezan con esa letra

---

## RESUMEN DE CUMPLIMIENTO DE REQUISITOS

| Requisito | Puntos | ¿Cumplido? | Archivos |
|-----------|--------|------------|----------|
| CRUD con consulta | 1.75 | ✅ | contactos.html, contactos.mjs |
| Ordenación asc/desc | - | ✅ | contactos.mjs |
| Paginación | - | ✅ | Componente tabla.mjs |
| Crear contactos | 1.0 | ✅ | contactos_crear.* |
| Modificar contactos | 1.0 | ✅ | contactos_modificar.* |
| Borrar contactos | 0.5 | ✅ | contactos.mjs |
| Validaciones síncronas | 0.25 | ✅ | contactos_crear.mjs |
| Validaciones asíncronas | 0.25 | ✅ | contactos_crear.mjs |
| Validaciones formulario | 0.25 | ✅ | contactos_crear.mjs |
| Listado alfabético | 1.0 | ✅ | contactos_alfabetico.* |
| Búsqueda avanzada | 1.0 | ✅ | contactos_busqueda.* |
| Cerrar sesión | 0.5 | ✅ | Todos los HTML |
| Componente reutilizable | 1.5 | ✅ | selector-contactos.mjs |
| Gráfica | 0.5 | ✅ | contactos_grafica.* |
| Código documentado | 0.5 | ✅ | Todos los archivos |
| **TOTAL** | **10.0** | ✅ | - |

---

## 💡 CONSEJOS PARA LA DEFENSA

1. **Ejecuta el proyecto antes de la defensa** para asegurarte de que todo funciona
2. **Lee esta guía completa** al menos dos veces
3. **Practica explicar** cada función con tus propias palabras
4. **Ten el código abierto** en VSCode durante la defensa
5. **No te pongas nervioso** - el profesor solo quiere verificar que entiendes

---

¡Mucha suerte en tu defensa! 🚀

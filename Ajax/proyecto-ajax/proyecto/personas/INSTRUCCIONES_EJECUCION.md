# INSTRUCCIONES PARA EJECUTAR EL PROYECTO

## Pasos exactos para poner en marcha el proyecto:

### PASO 1: Iniciar el Backend (JSON Server)

1. Abre una **terminal** o **símbolo del sistema**
2. Navega a la carpeta del servidor:
   ```
   cd personas/json-server-root
   ```
3. Ejecuta el script:
   ```
   servidor-jwt.bat
   ```
   (Si estás en Mac/Linux usa: `npx json-server --watch db.json -m ./node_modules/json-server-auth -r routes.json`)

4. **IMPORTANTE:** Deja esta terminal abierta. Deberías ver algo como:
   ```
   JSON Server is running on port 3000
   ```

### PASO 2: Abrir el Frontend con Visual Studio Code

1. Abre **Visual Studio Code**
2. Haz clic en `File` → `Open Folder`
3. Selecciona la carpeta `personas/front`
4. Haz clic derecho sobre `index.html`
5. Selecciona `Open with Live Server` o `Open with Five Server`

### PASO 3: Iniciar Sesión

Tu navegador se abrirá automáticamente. Usa estos datos para entrar:

- **Email:** `paco@mail.com`
- **Password:** `12345678`

(También puedes usar `manolo@mail.com` o `juanjo@mail.com` con la misma contraseña)

### PASO 4: Navegar por la Aplicación

Una vez dentro, verás un menú de navegación con estas opciones:

- **Listado Principal:** Ver, editar y eliminar personas
- **Listado Alfabético:** Filtrar personas por letra A-Z
- **Búsqueda Avanzada:** Buscar y ordenar personas
- **Estadísticas:** Ver gráficas de los datos
- **Demo Componente:** Ver el componente reutilizable en acción

## Solución de Problemas

### Problema: "Cannot GET /"
**Solución:** Asegúrate de que el servidor JSON Server está corriendo (Paso 1)

### Problema: "Network Error" o no carga datos
**Solución:** 
1. Verifica que el servidor está en `http://localhost:3000`
2. Abre `front/js/environment.js` y confirma que `URL_BACKEND` es `http://localhost:3000`

### Problema: Live Server no está disponible
**Solución:** 
1. Instala la extensión "Live Server" en VSCode
2. O usa "Five Server"
3. O abre el archivo `index.html` directamente en Chrome (puede tener problemas de CORS)

## Estructura de Archivos

```
personas/
├── json-server-root/        ← Aquí ejecutas servidor-jwt.bat
│   ├── db.json
│   ├── servidor-jwt.bat
│   └── package.json
│
└── front/                   ← Aquí abres con VSCode
    ├── index.html           ← Aquí haces clic derecho "Open with Live Server"
    ├── paginas/
    │   ├── login/
    │   └── personas/       ← Aquí están todos los archivos del proyecto
    └── js/
```

## Archivos Creados para el Proyecto

**Archivos HTML:**
- `personas.html` - Listado principal (mejorado con menú)
- `personas_alfabetico.html` - Listado alfabético
- `personas_busqueda.html` - Búsqueda avanzada
- `personas_grafica.html` - Estadísticas con gráficas
- `componente_demo.html` - Demo del componente

**Archivos JavaScript:**
- `personas.mjs` - Lógica del CRUD principal
- `personas_alfabetico.mjs` - Filtrado alfabético
- `personas_busqueda.mjs` - Búsqueda y ordenación
- `personas_grafica.mjs` - Generación de gráficas
- `selector-personas.mjs` - Componente reutilizable
- `componente_demo.mjs` - Demo del componente

**Documentación:**
- `GUIA_PROYECTO.md` - Guía completa para la defensa
- `INSTRUCCIONES_EJECUCION.md` - Este archivo
- `README.md` - Resumen del proyecto

## Antes de la Defensa

1. Ejecuta el proyecto al menos una vez
2. Lee la `GUIA_PROYECTO.md` completa
3. Prueba todas las funcionalidades
4. Asegúrate de entender cómo funciona cada archivo

---

**¡Listo para usar!** 🎉

Si tienes dudas, revisa la `GUIA_PROYECTO.md` que tiene explicaciones detalladas de cada parte del código.

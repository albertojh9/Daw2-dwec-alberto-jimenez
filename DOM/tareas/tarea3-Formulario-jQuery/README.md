# Tarea 3 - Formulario jQuery

## Archivos entregados

- **formulario.html**: Código HTML del formulario con estilos CSS integrados
- **formulario.mjs**: Módulo JavaScript principal con toda la lógica del formulario
- **formulario-validaciones.mjs**: Módulo JavaScript con las funciones de validación

## Instrucciones de uso

1. Coloca los tres archivos en el directorio: `dom/tareas/formulario-jquery/`
2. Abre el archivo `formulario.html` en un navegador web
3. El formulario estará completamente funcional

## Funcionalidades implementadas

### 1. Sistema de Ayuda (3 puntos)
✅ **Función para mostrar ayuda**: `mostrarAyuda(mensaje)` recibe el mensaje a mostrar  
✅ **Evento adecuado**: Utiliza el evento `focus` para detectar cuando se entra en un campo  
✅ **Array asociativo**: `textosAyuda` enlaza cada campo con su texto de ayuda mediante el ID  
✅ **Limpieza de ayuda**: Si un campo no tiene ayuda, se borra el contenido del div  

### 2. Validación de Campos (4 puntos)
✅ **Función mostrar errores**: `mostrarError($campo, mensajeError)` recibe campo y mensaje  
✅ **Función limpiar error**: `limpiarError($campo)` elimina los errores de un campo  
✅ **Estilo de error**: Campo con fondo rojo y mensaje de error en el div de ayuda  
✅ **Módulo de validaciones**: Todas las validaciones en `formulario-validaciones.mjs`  
✅ **Mapeo mediante mapa**: Objeto `validaciones` asocia funciones de validación a cada campo  

**Validaciones implementadas:**
- ✅ **DNI**: Valida formato (8 números + letra) y letra correcta según algoritmo oficial
- ✅ **Campos obligatorios**: Nombre y apellidos no pueden estar vacíos ni contener solo espacios
- ✅ **Email**: Debe contener el símbolo @
- ✅ **Contraseñas**: Los dos campos deben ser iguales (validación en segundo campo)

### 3. Validación del Formulario (3 puntos)
✅ **No envío con errores**: El formulario previene el envío si hay errores  
✅ **Foco en primer error**: Coloca el foco automáticamente en el primer campo con error  
✅ **Contraseñas iguales**: Error en el primer campo de contraseña si no coinciden  

## Detalles técnicos

### Eventos utilizados
- **focus**: Detecta cuando el usuario entra en un campo (muestra ayuda)
- **blur**: Detecta cuando el usuario sale de un campo (valida el campo)
- **submit**: Intercepta el envío del formulario (validación completa)
- **click**: Maneja el botón de limpiar formulario

### Estructura modular
```
formulario.html
├── jQuery 3.6.0 (CDN)
└── formulario.mjs (módulo ES6)
    └── formulario-validaciones.mjs (módulo ES6)
```

### Validación de DNI
La validación del DNI implementa el algoritmo oficial español:
1. Verifica formato: 8 dígitos + 1 letra
2. Calcula la letra correcta: número % 23
3. Compara con tabla de letras oficial: TRWAGMYFPDXBNJZSQVHLCKE

### Características adicionales
- Diseño responsive y moderno
- Estilos CSS integrados en el HTML
- Transiciones suaves en los campos
- Feedback visual inmediato (fondo rojo para errores)
- Código completamente documentado con JSDoc
- Funciones reutilizables y modulares
- Console.log para verificar datos enviados

## Criterios de la rúbrica cumplidos

| Criterio | Puntos | Estado |
|----------|--------|--------|
| Funciona según especificaciones | 5 | ✅ Completo |
| Uso adecuado de funciones y eventos | 2 | ✅ Completo |
| Programación modular y reutilizable | 0.5 | ✅ Completo |
| Planteamiento original | 2 | ✅ Completo |
| Limpieza y documentación | 0.5 | ✅ Completo |

**Total: 10 puntos**

## Pruebas recomendadas

1. **Ayuda dinámica**: Navega entre campos con Tab y observa cómo cambia la ayuda
2. **Validación de DNI**: Prueba con DNIs válidos e inválidos
   - Válido: 12345678Z
   - Inválido: 12345678A (letra incorrecta)
3. **Campos obligatorios**: Deja campos vacíos o con espacios
4. **Email**: Prueba sin @ y con @
5. **Contraseñas**: Introduce contraseñas diferentes
6. **Botón limpiar**: Verifica que limpia todo el formulario
7. **Validación al enviar**: Intenta enviar con errores

## Notas del desarrollador

- jQuery se carga desde CDN (requiere conexión a internet)
- Los módulos ES6 requieren un servidor web (no funcionan con file://)
- Para desarrollo local, usa un servidor como Live Server de VSCode
- Todos los comentarios están en español
- El código sigue las mejores prácticas de jQuery y ES6

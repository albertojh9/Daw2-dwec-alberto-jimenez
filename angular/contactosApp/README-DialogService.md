# Documentación del Dialog Service

Este documento explica en detalle cada parte del código del archivo `dialog.service.ts`.

---

## 📋 Índice
1. [Importaciones y Declaraciones](#importaciones-y-declaraciones)
2. [Decorador y Clase](#decorador-y-clase)
3. [Variables HTML](#variables-html)
4. [Método mostrarMensaje()](#método-mostrarmensaje)
5. [Método solicitarConfirmacion()](#método-solicitarconfirmacion)
6. [Método mostrarToast()](#método-mostrartoast)

---

## 1. Importaciones y Declaraciones

```typescript
import { Injectable } from '@angular/core';

declare var $: any;
```

### ✅ `import { Injectable } from '@angular/core';`
- **¿Qué hace?** Importa el decorador `@Injectable` desde el módulo core de Angular.
- **¿Para qué sirve?** Permite que este servicio pueda ser inyectado en otros componentes mediante **inyección de dependencias**.
- **Nivel DAW2**: Es el mecanismo que permite usar servicios en componentes sin tener que instanciarlos manualmente.

### ✅ `declare var $: any;`
- **¿Qué hace?** Declara la variable `$` (jQuery) como de tipo `any`.
- **¿Para qué sirve?** TypeScript es un lenguaje tipado y no conoce jQuery por defecto. Esta línea le dice a TypeScript "confía en mí, la variable `$` existe y la voy a usar".
- **¿Por qué `any`?** Para evitar errores de compilación cuando usamos métodos de jQuery como `$('#elemento')`.

---

## 2. Decorador y Clase

```typescript
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor() { }
}
```

### ✅ `@Injectable({ providedIn: 'root' })`
- **¿Qué hace?** Decorador que marca la clase como un servicio inyectable.
- **`providedIn: 'root'`**: Significa que el servicio es un **singleton** (solo existe una instancia) y está disponible en toda la aplicación.
- **Ventaja**: No necesitas agregarlo manualmente en el array `providers` de ningún módulo.

### ✅ `export class DialogService`
- **¿Qué hace?** Define la clase del servicio que contiene toda la lógica.
- **`export`**: Permite que otras partes de la aplicación puedan importar este servicio.

### ✅ `constructor() { }`
- **¿Qué hace?** Constructor vacío del servicio.
- **En este caso**: No necesita inicializar nada, pero es donde se inyectarían dependencias si las hubiera.

---

## 3. Variables HTML

### Variable 1: `HTML_MODAL_ALERT`

```typescript
private HTML_MODAL_ALERT = `
  <div class="modal fade" id="modalAlert" data-bs-backdrop="static" ...>
    ...
  </div>
`;
```

**Desglose de atributos:**

| Atributo | Valor | Explicación |
|----------|-------|-------------|
| `class="modal fade"` | Bootstrap | Define que es un modal con animación de fade |
| `id="modalAlert"` | Identificador único | Permite seleccionarlo con jQuery: `$('#modalAlert')` |
| `data-bs-backdrop="static"` | Bootstrap 5 | Impide cerrar el modal haciendo clic fuera de él |
| `data-bs-keyboard="false"` | Bootstrap 5 | Impide cerrar el modal con la tecla ESC |
| `tabindex="-1"` | HTML | Controla el orden de navegación por teclado |
| `aria-labelledby` | Accesibilidad | Conecta el modal con su título para lectores de pantalla |
| `aria-hidden="true"` | Accesibilidad | Indica que está oculto inicialmente |

**Estructura interna:**
```html
<div class="modal-dialog modal-dialog-centered">  <!-- Centra el modal -->
  <div class="modal-content">                      <!-- Contenedor del contenido -->
    <div class="modal-header">                     <!-- Cabecera con título -->
      <h5 class="modal-title">Advertencia</h5>
      <button class="btn-close" ...>               <!-- Botón X para cerrar -->
    </div>
    <div class="modal-body">CUERPO</div>           <!-- Cuerpo del mensaje -->
    <div class="modal-footer">                     <!-- Pie con botones -->
      <button class="btn btn-secondary">Aceptar</button>
    </div>
  </div>
</div>
```

**¿Por qué en una variable?**
- Separación front-back: El HTML no viene de un servidor, está en memoria
- Rendimiento: No hay que descargar archivos HTML adicionales
- Reutilización: Se puede usar múltiples veces sin duplicar código

---

### Variable 2: `HTML_MODAL_CONFIRMAR`

```typescript
private HTML_MODAL_CONFIRMAR = `
  <div class="modal fade" id="modalConfirmar" ...>
    ...
    <button id="botonAceptar" type="button" class="btn btn-danger">Aceptar</button>
  </div>
`;
```

**Diferencias con `HTML_MODAL_ALERT`:**
- **Dos botones**: "Cancelar" (secundario) y "Aceptar" (danger/rojo)
- **ID especial**: El botón "Aceptar" tiene `id="botonAceptar"` para asignarle eventos
- **Clase `btn-danger`**: Bootstrap lo pinta de rojo para indicar acción crítica
- **Función**: Solicitar confirmación antes de realizar una acción (ej: eliminar datos)

---

### Variable 3: `HTML_TOAST`

```typescript
private HTML_TOAST = `
  <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center ...">
    <div id="__Toast" class="toast align-items-center" ...>
      ...
    </div>
  </div>
`;
```

**Atributos de accesibilidad:**
- `aria-live="polite"`: Los lectores de pantalla anunciarán cambios cuando terminen de leer
- `aria-atomic="true"`: Lee todo el contenido cuando cambie, no solo lo modificado
- `role="alert"`: Indica que es un mensaje de alerta
- `aria-live="assertive"`: Interrumpe para anunciar el mensaje inmediatamente

**Clases Bootstrap:**
- `toast`: Estilo de notificación temporal de Bootstrap
- `align-items-center`: Flexbox para centrar verticalmente
- `d-flex`: Activa flexbox
- `justify-content-center`: Centra horizontalmente

**Uso**: Notificaciones pequeñas no invasivas (ej: "Guardado correctamente")

---

## 4. Método `mostrarMensaje()`

```typescript
mostrarMensaje(mensaje: string, titulo: string = 'Advertencia') : void {
```

### Parámetros:
- **`mensaje: string`** - El texto que se mostrará en el cuerpo del modal (obligatorio)
- **`titulo: string = 'Advertencia'`** - El título del modal (opcional, valor por defecto: "Advertencia")
- **`: void`** - No retorna ningún valor

---

### Parte 1: Inserción condicional del HTML

```typescript
if(!$('#modalAlert').length) {
  $('body').append( this.HTML_MODAL_ALERT );           
}
```

**¿Qué hace cada línea?**

1. **`$('#modalAlert').length`**
   - `$('#modalAlert')`: Busca en el DOM un elemento con `id="modalAlert"`
   - `.length`: Devuelve el número de elementos encontrados (0 si no existe, 1 si existe)
   
2. **`if(!...)`**
   - `!`: Operador NOT, invierte el valor
   - Si `length` es 0 (no existe) → `!0` = `true` → entra en el if
   - Si `length` es 1 (existe) → `!1` = `false` → no entra en el if
   - **Propósito**: Solo insertar el HTML si no está ya en el DOM

3. **`$('body').append(...)`**
   - `$('body')`: Selecciona la etiqueta `<body>` del documento
   - `.append()`: Añade contenido al final del body
   - `this.HTML_MODAL_ALERT`: Inserta el HTML del modal de alerta
   - **Resultado**: El modal se agrega al DOM, pero aún no es visible

---

### Parte 2: Función interna para mostrar

```typescript
_mostrarAlert();

function _mostrarAlert() {
  $('#modalAlert .modal-title').text(titulo);
  $('#modalAlert .modal-body').text(mensaje);
  $('#modalAlert').modal('show');  
}
```

**¿Por qué una función interna?**
- **Encapsulación**: La lógica de mostrar está separada de la de insertar
- **Prefijo `_`**: Convención para indicar que es privada/interna
- **Reutilización**: Se puede llamar sin repetir código

**Línea por línea:**

1. **`$('#modalAlert .modal-title').text(titulo);`**
   - `$('#modalAlert .modal-title')`: Busca dentro del modal el elemento con clase `modal-title`
   - `.text(titulo)`: Reemplaza el texto del título con el parámetro recibido
   - **Ejemplo**: Si `titulo = "Error"`, cambia "Advertencia" por "Error"

2. **`$('#modalAlert .modal-body').text(mensaje);`**
   - Similar al anterior, pero cambia el cuerpo del modal
   - `.text()`: Inserta texto plano (protege contra inyección de código HTML)

3. **`$('#modalAlert').modal('show');`**
   - `.modal('show')`: Método de Bootstrap que muestra el modal
   - Activa la animación de aparición (fade)
   - Agrega el backdrop (fondo oscuro)

---

## 5. Método `solicitarConfirmacion()`

```typescript
solicitarConfirmacion(mensaje: string, titulo: string, accion: any) {
```

### Parámetros:
- **`mensaje: string`** - Pregunta o texto a mostrar
- **`titulo: string`** - Título del modal
- **`accion: any`** - **Función callback** que se ejecutará si el usuario confirma

**Concepto clave: Callback**
- Un callback es una función que se pasa como parámetro a otra función
- Se ejecuta más tarde, cuando ocurre un evento (en este caso, clic en "Aceptar")
- **Ejemplo**: `() => { console.log('Confirmado'); }`

---

### Parte 1: Inserción condicional

```typescript
if(!$('#modalConfirmar').length) {
  $('body').append( this.HTML_MODAL_CONFIRMAR );          
}
```

Igual que en `mostrarMensaje()`, pero con el modal de confirmación.

---

### Parte 2: Función interna compleja

```typescript
function _solicitarConfirmacion() {
  $('#modalConfirmar .modal-title').text(titulo);
  $('#modalConfirmar .modal-body').text(mensaje);
```

Primero actualiza el título y el mensaje (igual que antes).

---

### Parte 3: Asignación del evento al botón

```typescript
$('#modalConfirmar #botonAceptar').on('click', (event: any) => {
```

**¿Qué hace `.on('click', ...)`?**
- **`.on('click', función)`**: Asigna un manejador de eventos al botón
- Cuando se haga clic en `#botonAceptar`, se ejecutará la función
- **`(event: any) =>`**: Arrow function que recibe el evento del clic

---

### Parte 4: Dentro del manejador de clic

```typescript
event.stopPropagation();
```

**¿Qué hace `stopPropagation()`?**
- Detiene la **propagación del evento** hacia elementos padre
- **¿Por qué?** Evita que el clic se propague al modal o al backdrop
- **Sin esto**: El clic podría activar otros eventos no deseados

---

```typescript
accion();
```

**Ejecuta el callback**
- Llama a la función que se pasó como parámetro
- **Ejemplo**: Si pasaste `() => eliminarContacto(5)`, se ejecutará esa función
- **Flujo**: Usuario confirma → se ejecuta la acción → se procesa (ej: eliminar registro)

---

```typescript
$('#modalConfirmar #botonAceptar').off('click');
```

**¿Qué hace `.off('click')`?**
- **Desactiva el manejador de eventos** del clic
- **¿Por qué?** Para evitar que se ejecute múltiples veces si se abre el modal de nuevo
- **Importante**: La próxima vez que se llame a `solicitarConfirmacion()`, se volverá a asignar

**Problema sin `.off()`:**
- Primera vez: asignas 1 evento → clic ejecuta la función 1 vez ✅
- Segunda vez: asignas otro evento → clic ejecuta la función 2 veces ❌
- Tercera vez: asignas otro evento → clic ejecuta la función 3 veces ❌❌

---

```typescript
$('#modalConfirmar').modal('hide');
```

**Cierra el modal programáticamente**
- `.modal('hide')`: Método de Bootstrap que oculta el modal
- Activa la animación de salida (fade out)
- Quita el backdrop

---

```typescript
$('#modalConfirmar').modal('show');
```

Finalmente, muestra el modal esperando la interacción del usuario.

---

## 6. Método `mostrarToast()`

```typescript
mostrarToast(mensaje: string) : void {
  if(!$('#__Toast').length) {
    $('body').append( this.HTML_TOAST );           
  }    

  _mostrarToast();

  function _mostrarToast() {
    $('#__Toast .toast-body').text(mensaje);  
    $('#__Toast').toast('show');  
  }
}
```

### Funcionamiento:
1. **Comprueba si existe** el toast en el DOM
2. **Si no existe**, lo inserta
3. **Actualiza el texto** del mensaje
4. **Muestra el toast** con `.toast('show')`

### Diferencias con los modales:
- **`.toast('show')`** en lugar de `.modal('show')`
- Los toasts de Bootstrap se **auto-ocultan** después de unos segundos (por defecto 5s)
- No tienen backdrop ni bloquean la interacción con la página
- Son **no invasivos** y se usan para notificaciones breves

---

## 🎯 Resumen de Conceptos Clave

### 1. **jQuery con TypeScript**
```typescript
declare var $: any;  // Declara jQuery para evitar errores de compilación
```

### 2. **Inserción condicional**
```typescript
if(!$('#elemento').length) {
  $('body').append(HTML);  // Solo inserta si no existe
}
```

### 3. **Actualización dinámica**
```typescript
$('#elemento .clase').text(nuevoTexto);  // Cambia el texto sin recargar
```

### 4. **Callbacks**
```typescript
solicitarConfirmacion('¿Seguro?', 'Confirmar', () => {
  // Esta función se ejecuta solo si el usuario acepta
});
```

### 5. **Gestión de eventos**
```typescript
$('#boton').on('click', () => { /* ... */ });  // Asigna evento
$('#boton').off('click');                      // Quita evento
```

### 6. **Bootstrap Methods**
```typescript
$('#modal').modal('show');   // Muestra modal
$('#modal').modal('hide');   // Oculta modal
$('#toast').toast('show');   // Muestra toast
```

---

## 📚 Uso del Servicio

```typescript
// En un componente
constructor(private dialogService: DialogService) { }

// Mostrar alerta
this.dialogService.mostrarMensaje('Operación exitosa', 'Éxito');

// Solicitar confirmación
this.dialogService.solicitarConfirmacion(
  '¿Eliminar contacto?',
  'Confirmar eliminación',
  () => {
    // Código que se ejecuta si acepta
    this.eliminarContacto(id);
  }
);

// Mostrar toast
this.dialogService.mostrarToast('Guardado correctamente');
```

---

## ⚠️ Consideraciones Importantes

1. **Dependencia de jQuery**: Este servicio requiere que jQuery esté cargado en el proyecto
2. **Dependencia de Bootstrap**: Los estilos y funcionalidades dependen de Bootstrap 5
3. **Singleton**: Solo existe una instancia del servicio en toda la aplicación
4. **Modales únicos**: Cada tipo de modal se inserta solo una vez en el DOM
5. **Gestión de eventos**: Es crucial usar `.off()` para evitar múltiples ejecuciones

---

## 🔧 Mejoras Posibles

- **Tipado fuerte**: En lugar de `accion: any`, usar `accion: () => void`
- **Promesas**: Hacer que `solicitarConfirmacion()` devuelva una Promise
- **Sin jQuery**: Implementar con JavaScript vanilla o Angular Material
- **Personalización**: Permitir cambiar colores, iconos, tiempos de duración
- **Accesibilidad**: Mejorar el manejo del foco del teclado

---

**Autor**: Alberto Jiménez  
**Nivel**: 2º DAW  
**Fecha**: 13 de enero de 2026

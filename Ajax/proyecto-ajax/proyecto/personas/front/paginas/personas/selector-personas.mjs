// Componente para crear un select con personas
// Se conecta al servidor para cargar los datos

import * as http from "../../js/lib/http.mjs";

export class SelectorPersonas {
    
    /**
     * Inicializa el selector de personas
     * @param {string} selector - Donde se va a mostrar el select
     * @param {Object} opciones - Configuración del componente
     */
    constructor(selector, opciones = {}) {
        this.selector = selector;
        this.config = {
            label: opciones.label || 'Seleccionar Persona',
            placeholder: opciones.placeholder || 'Elige una persona...',
            required: opciones.required || false,
            campoMostrar: opciones.campoMostrar || 'nombre',
            onChange: opciones.onChange || null // función a ejecutar cuando cambie
        };
        this.personas = [];
        this.id = 'selector-personas-' + Math.random().toString(36).substr(2, 9);
        this.renderizar();
    }
    
    renderizar() {
        const contenedor = $(this.selector);
        contenedor.empty();
        
        const html = `
            <div class="mb-3">
                <label for="${this.id}" class="form-label">
                    ${this.config.label}
                    ${this.config.required ? '<span class="text-danger">*</span>' : ''}
                </label>
                <select id="${this.id}" class="form-select" ${this.config.required ? 'required' : ''}>
                    <option value="">${this.config.placeholder}</option>
                </select>
                <div class="spinner-border spinner-border-sm mt-2" id="${this.id}-spinner">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <div id="${this.id}-error" class="text-danger mt-2" style="display:none;">
                    Error al cargar personas
                </div>
            </div>
        `;
        
        contenedor.html(html);
        
        // Asignar evento onChange (OUTPUT del componente)
        if (this.config.onChange) {
            $(`#${this.id}`).on('change', () => {
                const valorSeleccionado = this.obtenerValorSeleccionado();
                const personaSeleccionada = this.obtenerPersonaSeleccionada();
                this.config.onChange(valorSeleccionado, personaSeleccionada);
            });
        }
        
        this.cargarPersonas();
    }
    
    cargarPersonas() {
        $(`#${this.id}-spinner`).show();
        $(`#${this.id}-error`).hide();
        
        http.get(URL_PERSONAS + "?_limit=1000")
            .then(r => r.json())
            .then(personas => {
                this.personas = personas;
                this.poblarSelect(personas);
                $(`#${this.id}-spinner`).hide();
            })
            .catch(error => {
                console.error("Error:", error);
                $(`#${this.id}-spinner`).hide();
                $(`#${this.id}-error`).show();
            });
    }
    
    poblarSelect(personas) {
        const select = $(`#${this.id}`);
        select.find('option:not(:first)').remove();
        
        personas.forEach(persona => {
            let textoMostrar = '';
            switch(this.config.campoMostrar) {
                case 'nombre': textoMostrar = persona.nombre; break;
                case 'apellidos': textoMostrar = persona.apellidos; break;
                case 'empresa': textoMostrar = persona.empresa || 'Sin empresa'; break;
                case 'completo': textoMostrar = `${persona.nombre} ${persona.apellidos || ''}`; break;
                default: textoMostrar = persona[this.config.campoMostrar] || persona.nombre;
            }
            
            select.append(`<option value="${persona.id}">${textoMostrar}</option>`);
        });
    }
    
    // Métodos públicos del componente
    obtenerValorSeleccionado() { return $(`#${this.id}`).val(); }
    obtenerPersonaSeleccionada() {
        const id = this.obtenerValorSeleccionado();
        return id ? this.personas.find(c => c.id == id) : null;
    }
    establecerValor(id) { $(`#${this.id}`).val(id); }
    limpiar() { $(`#${this.id}`).val(''); }
    deshabilitar() { $(`#${this.id}`).prop('disabled', true); }
    habilitar() { $(`#${this.id}`).prop('disabled', false); }
}

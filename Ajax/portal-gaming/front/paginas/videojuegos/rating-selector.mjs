// COMPONENTE: Rating Selector
// Selector de puntuacion con estrellas interactivas
// lo hice reutilizable para usarlo en varios sitios
// Alberto Jimenez - 2º DAW

export class RatingSelector {
    
    // constructor del componente
    constructor(selector, options = {}) {
        
        // configuracion por defecto
        this.config = {
            valor: 0,           // valor inicial (0-10)
            readonly: false,    // solo lectura
            maxEstrellas: 5,    // numero de estrellas
            onChange: null,     // funcion que se ejecuta al cambiar
            onHover: null       // Callback cuando se hace hover
        };
        
        // Combinar configuración por defecto con opciones proporcionadas
        this.config = { ...this.config, ...options };
        
        // Elementos DOM
        this.container = $(selector);
        this.estrellas = [];
        
        // Estado interno
        this.valor = this.config.valor;
        this.hoveredValue = null;
        
        // Validaciones
        if (this.container.length === 0) {
            throw new Error(`RatingSelector: No se encontró el elemento con selector '${selector}'`);
        }
        
        // Inicializar el componente
        this.init();
        
        console.log(`⭐ RatingSelector creado en '${selector}' con valor inicial ${this.valor}`);
    }
    
    /**
     * Inicializa el componente
     */
    init() {
        this.crearEstructura();
        this.configurarEventos();
        this.actualizarVisualizacion();
    }
    
    /**
     * Crea la estructura HTML del componente
     */
    crearEstructura() {
        // Limpiar contenedor
        this.container.empty();
        
        // Agregar clase CSS para estilos
        this.container.addClass('rating-selector-component');
        
        // Crear estrellas
        for (let i = 1; i <= this.config.maxEstrellas; i++) {
            const estrella = $(`
                <i class="bi bi-star rating-star" 
                   data-valor="${i * 2}" 
                   title="Puntuación: ${i * 2}/10">
                </i>
            `);
            
            this.container.append(estrella);
            this.estrellas.push(estrella);
        }
        
        // Agregar estilos CSS dinámicamente si no existen
        this.agregarEstilos();
    }
    
    /**
     * Configura los eventos del componente
     */
    configurarEventos() {
        if (this.config.readonly) return;
        
        const self = this;
        
        // Evento click en estrella
        this.container.on('click', '.rating-star', function() {
            const valorEstrella = parseInt($(this).data('valor'));
            
            // Si se hace clic en la misma estrella, alternar entre valor completo y medio
            if (self.valor === valorEstrella) {
                self.setValue(valorEstrella - 1); // Medio punto menos
            } else {
                self.setValue(valorEstrella);
            }
        });
        
        // Evento hover para preview
        this.container.on('mouseenter', '.rating-star', function() {
            const valorEstrella = parseInt($(this).data('valor'));
            self.hoveredValue = valorEstrella;
            self.actualizarVisualizacion(true);
            
            if (self.config.onHover) {
                self.config.onHover(valorEstrella);
            }
        });
        
        // Evento cuando sale el mouse
        this.container.on('mouseleave', function() {
            self.hoveredValue = null;
            self.actualizarVisualizacion();
        });
        
        // Mejorar UX con cursor pointer
        if (!this.config.readonly) {
            this.container.css('cursor', 'pointer');
        }
    }
    
    /**
     * Actualiza la visualización de las estrellas
     * @param {boolean} preview - Si es true, muestra el valor de hover
     */
    actualizarVisualizacion(preview = false) {
        const valorAMostrar = preview ? this.hoveredValue : this.valor;
        
        this.estrellas.forEach((estrella, index) => {
            const valorEstrella = (index + 1) * 2; // Cada estrella vale 2 puntos
            
            // Remover todas las clases de estado
            estrella.removeClass('bi-star bi-star-half bi-star-fill');
            
            if (valorAMostrar >= valorEstrella) {
                // Estrella completa
                estrella.addClass('bi-star-fill');
                estrella.css('color', preview ? '#ffd700' : '#ffc107');
            } else if (valorAMostrar >= valorEstrella - 1) {
                // Media estrella
                estrella.addClass('bi-star-half');
                estrella.css('color', preview ? '#ffd700' : '#ffc107');
            } else {
                // Estrella vacía
                estrella.addClass('bi-star');
                estrella.css('color', '#6c757d');
            }
            
            // Agregar clase de hover si está en preview
            if (preview) {
                estrella.addClass('rating-hover');
            } else {
                estrella.removeClass('rating-hover');
            }
        });
    }
    
    /**
     * Establece el valor de la puntuación
     * @param {number} nuevoValor - Nuevo valor (0-10)
     */
    setValue(nuevoValor) {
        // Validar rango
        nuevoValor = Math.max(0, Math.min(10, nuevoValor));
        
        const valorAnterior = this.valor;
        this.valor = nuevoValor;
        
        // Actualizar visualización
        this.actualizarVisualizacion();
        
        // Ejecutar callback si el valor cambió
        if (valorAnterior !== nuevoValor && this.config.onChange) {
            this.config.onChange(nuevoValor);
        }
        
        console.log(`⭐ RatingSelector valor actualizado: ${valorAnterior} → ${nuevoValor}`);
    }
    
    /**
     * Obtiene el valor actual
     * @returns {number} Valor actual (0-10)
     */
    getValue() {
        return this.valor;
    }
    
    /**
     * Habilita o deshabilita el modo solo lectura
     * @param {boolean} readonly - True para solo lectura
     */
    setReadonly(readonly) {
        this.config.readonly = readonly;
        
        if (readonly) {
            this.container.off('click mouseenter mouseleave');
            this.container.css('cursor', 'default');
        } else {
            this.configurarEventos();
        }
        
        console.log(`⭐ RatingSelector readonly: ${readonly}`);
    }
    
    /**
     * Destruye el componente y limpia los eventos
     */
    destroy() {
        this.container.off('click mouseenter mouseleave');
        this.container.empty();
        this.container.removeClass('rating-selector-component');
        
        console.log('⭐ RatingSelector destruido');
    }
    
    /**
     * Agrega los estilos CSS necesarios al documento
     */
    agregarEstilos() {
        const estilosId = 'rating-selector-styles';
        
        // Verificar si ya existen los estilos
        if ($(`#${estilosId}`).length > 0) return;
        
        const estilos = `
            <style id="${estilosId}">
                .rating-selector-component {
                    display: inline-flex;
                    gap: 4px;
                    font-size: 1.5rem;
                    user-select: none;
                }
                
                .rating-star {
                    transition: all 0.2s ease;
                    cursor: pointer;
                }
                
                .rating-star:hover {
                    transform: scale(1.1);
                }
                
                .rating-hover {
                    filter: drop-shadow(0 0 4px currentColor);
                }
                
                .rating-selector-component.readonly .rating-star {
                    cursor: default;
                }
                
                .rating-selector-component.readonly .rating-star:hover {
                    transform: none;
                }
                
                /* Animación de entrada */
                .rating-star {
                    animation: rating-fade-in 0.3s ease;
                }
                
                @keyframes rating-fade-in {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            </style>
        `;
        
        $('head').append(estilos);
    }
}

/**
 * Función de conveniencia para crear múltiples instancias
 * @param {string} selector - Selector CSS que puede coincidir con múltiples elementos
 * @param {Object} options - Opciones de configuración
 * @returns {Array} Array de instancias RatingSelector
 */
export function crearRatingSelectors(selector, options = {}) {
    const instancias = [];
    
    $(selector).each(function(index) {
        const instancia = new RatingSelector(this, options);
        instancias.push(instancia);
    });
    
    return instancias;
}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../../../shared/services/dialog/dialog.component';
import { ValidacionService } from '../../../shared/services/validacion.service';
import { ContactosService } from '../../services/contactos.service';
import { Contacto } from '../../interfaces/contacto.interface';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent {
  // Defino el formulario
  // En esta definición incluyo
  // - Nombres de los campos. Deben coincidir con los del objeto
  // - Opciones de los campos
  // - Validaciones locales
  // - Validaciones asíncronas
  formulario!: FormGroup;

  //-------------------------------------------------------------------------------------
  // Inicialización
  //-------------------------------------------------------------------------------------

  constructor(

    private fb                : FormBuilder,
    private validacionService  : ValidacionService,
    private dialogService  : DialogComponent,
    private contactosService  : ContactosService,
    private router           : Router,
    private activatedRoute   : ActivatedRoute

  ) { 
    
    this.formulario = this.fb.group({
    
      id: [0],
      nombre: ['', [ Validators.required, validacionService.validarEmpiezaMayuscula, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(3)]],
      empresa: ['', [Validators.required, Validators.minLength(3)]]
    }, {  

      // 008 Este segundo argumento que puedo enviar al formgroup permite por ejemplo ejecutar
      // validadores sincronos y asíncronos. Son validaciones al formgroup
      validators: [ this.validacionService.camposNoIguales('nombre', 'apellidos') ]

    });

  }

  /**
   * Inicialización de la página
   */
  ngOnInit(): void {
    // Obtiene el id del contacto de la URL si existe
    const id = this.activatedRoute.snapshot.params['id'];
    
    // Si hay un id, carga el contacto para editarlo
    if (id) {
      this.cargarContacto(id);
    }
  }

  guardar() {
    // Si el formulario no es válido, muestra un mensaje de error y termina
    if(this.formulario.invalid) {
      
      // Marco los campos como tocados. De ese modo se mostrarán todos los errores
      // registrados en los campos
      this.formulario.markAllAsTouched();

      // Muestro mensaje de error
      this.dialogService.mostrarMensaje('Por favor, revise los datos');

      // Finaliza
      return;
    }

    // Si id_tarea es > 0 significa que la tarea ya existía. Es actualización
    if(this.formulario.get('id')?.value > 0) {

      // Actualiza la contacto
      this.actualizarContacto();

    } else {

      // Crea el contacto
      this.crearContacto();
    }
  }

  esCampoNoValido( nombreCampo: string ) : boolean {
    return this.formulario.controls[nombreCampo].errors != null;
  }

  mensajeErrorCampo( nombreCampo: string ) : string {
    const errores = this.formulario.controls[nombreCampo].errors;
    if(errores) {
      const primerError = Object.keys(errores)[0];
      return this.validacionService.getMensajeError(primerError);
    } else {
      return '';
    }
  }

  /**
   * Carga un contacto existente para editarlo
   */
  cargarContacto(id: number) {
    this.contactosService.getById(id).subscribe(
      (contacto: Contacto) => {
        // Carga los datos del contacto en el formulario
        this.formulario.patchValue(contacto);
      },
      (error: any) => {
        this.dialogService.mostrarMensaje('Error al cargar el contacto');
        console.error('Error:', error);
        this.router.navigate(['/contactos/listado']);
      }
    );
  }

  /**
   * Actualiza un contacto existente
   */
  actualizarContacto() {
    // Obtiene los datos del formulario
    const contacto: Contacto = this.formulario.value;

    // Llama al servicio para actualizar el contacto
    this.contactosService.actualizar(contacto).subscribe(
      (contactoActualizado: Contacto) => {
        // Muestra mensaje de éxito
        this.dialogService.mostrarMensaje('Contacto actualizado correctamente');
        
        // Redirige al listado de contactos
        this.router.navigate(['/contactos/listado']);
      },
      (error: any) => {
        // Muestra mensaje de error
        this.dialogService.mostrarMensaje('Error al actualizar el contacto');
        console.error('Error:', error);
      }
    );
  }

  /**
   * Crea un nuevo contacto
   */
  crearContacto() {
    // Obtiene los datos del formulario
    const contacto: Contacto = this.formulario.value;

    // Llama al servicio para crear el contacto
    this.contactosService.crear(contacto).subscribe(
      (nuevoContacto: Contacto) => {
        // Muestra mensaje de éxito
        this.dialogService.mostrarMensaje('Contacto creado correctamente');
        
        // Redirige al listado de contactos
        this.router.navigate(['/contactos/listado']);
      },
      (error: any) => {
        // Muestra mensaje de error
        this.dialogService.mostrarMensaje('Error al crear el contacto');
        console.error('Error:', error);
      }
    );
  }
}

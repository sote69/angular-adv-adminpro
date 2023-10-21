import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { CargarMedico } from 'src/app/interfaces/cargar-medicos.interface';
import { CargarUsuario } from 'src/app/interfaces/cargar-usuarios.interface';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  private medicoService = inject(MedicoService);
  private busquedasService = inject(BusquedasService);
  private modalImagenService = inject(ModalImagenService);

  public medicos :Medico[] = [];
  public medicosTemp :Medico[] = [];
  public totalMedicos :number = 0;
  public totalMedicosTemp :number = 0;
  public desde :number = 0;
  public registosPagina :number = 5;
  public hasta :number = this.desde + this.registosPagina;
  public listaRegistosPagina :number[] = [ 5, 10, 15];
  public cargando :boolean = false;
  public imgSubs :Subscription;

  ngOnInit(): void {
    this.cargarMedicos();

    // * Al actualizar la imagen de un usuario vuelve a consultar los usuarios
    this.imgSubs = this.modalImagenService.imagenActualizada
      .pipe(
        // * Ponemos un delay de 100 milesimas por si no da tiempo a cargar la nueva imagen
        delay(100)
      )
      .subscribe(img => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  abrirModal(medico :Medico) {
    this.modalImagenService.abrirModal('medicos', medico.uid!, medico.img);
  }

  cambiarRegistrosPorPagina(valor :string) {

    this.registosPagina = parseInt(valor);
    this.cargarMedicos();
  }

  cambiarDePagina(valor :number) {

    this.desde += (this.registosPagina * valor);

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalMedicos ) {
      this.desde -= this.registosPagina;
    }

    this.cargarMedicos();
  }

  calcularHasta() {

    if (this.desde >= this.totalMedicos) {
      this.desde -= this.registosPagina;
    }

    this.hasta = this.desde + this.registosPagina;

    if ( this.hasta < 0 ) {
      this.hasta = this.desde + this.registosPagina;
    } else if ( this.hasta >= this.totalMedicos ) {
      this.hasta = this.totalMedicos;
    }
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos(this.desde, this.registosPagina)
      .subscribe({
        next: (resp) => {
          this.medicos = [...resp.medicos];
          this.medicosTemp = [...resp.medicos];
          this.totalMedicos = resp.total;
          this.totalMedicosTemp = resp.total;
          this.calcularHasta();
          this.cargando = false;
        },
        error: (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
    });
  }

  buscar(termino :string) {
    if (termino.length === 0) {
      this.medicos = this.medicosTemp;
      this.totalMedicos = this.totalMedicosTemp;
      return;
    }

    if (termino.length >= 3) {
    this.busquedasService.buscar(termino, 'medicos', this.desde, this.registosPagina)
      .subscribe({
        next: (resp :CargarMedico) => {
          this.medicos = resp.medicos;
          this.totalMedicos = resp.total;
        },
        error: error => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      });
    }
  }

  eliminarMedico(medico :Medico) {
    return Swal.fire({
      title: '¿Eliminar médico?',
      text: `Está a punto de eliminar el médico: ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico.uid!)
        .subscribe({
          next: (resp) => {
            this.totalMedicos-=1;
            this.totalMedicosTemp-=1;
            this.calcularHasta();
            this.cargarMedicos();
            Swal.fire({ toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        title: 'Eliminado!',
                        text: `Médico: ${ medico.nombre }, eliminado correctamente.`,
                        icon: 'success', });
          },
          error: (error) => {
            Swal.fire('Error', error.error.msg, 'error');
          }
        });
      }
    });
  }
}

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { CargarHospital } from 'src/app/interfaces/cargar-hospitales.interface';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  private hospitalesService = inject(HospitalesService);
  private busquedasService = inject(BusquedasService);
  private modalImagenService = inject(ModalImagenService);

  public hospitales :Hospital[] = [];
  public hospitalesTemp :Hospital[] = [];
  public totalHospitales :number = 0;
  public totalHospitalesTemp :number = 0;
  public desde :number = 0;
  public registosPagina :number = 5;
  public hasta :number = this.desde + this.registosPagina;
  public listaRegistosPagina :number[] = [ 5, 10, 15];
  public cargando :boolean = false;
  public imgSubs :Subscription;

  ngOnInit() {
    this.cargarHospitales();

    // * Al actualizar la imagen de un usuario vuelve a consultar los usuarios
    this.imgSubs = this.modalImagenService.imagenActualizada
      .pipe(
        // * Ponemos un delay de 100 milesimas por si no da tiempo a cargar la nueva imagen
        delay(100)
      )
      .subscribe(img => this.cargarHospitales());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  abrirModal(hospital :Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital.uid!, hospital.img);
  }

  cambiarRegistrosPorPagina(valor :string) {

    this.registosPagina = parseInt(valor);
    this.cargarHospitales();
  }

  cambiarDePagina(valor :number) {

    this.desde += (this.registosPagina * valor);

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalHospitales ) {
      this.desde -= this.registosPagina;
    }

    this.cargarHospitales();
  }

  calcularHasta() {

    if (this.desde >= this.totalHospitales) {
      this.desde -= this.registosPagina;
    }

    this.hasta = this.desde + this.registosPagina;

    if ( this.hasta < 0 ) {
      this.hasta = this.desde + this.registosPagina;
    } else if ( this.hasta >= this.totalHospitales ) {
      this.hasta = this.totalHospitales;
    }
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalesService.cargarHospitales(this.desde, this.registosPagina)
      .subscribe({
        next: (resp) => {
          this.hospitales = [...resp.hospitales];
          this.hospitalesTemp = [...resp.hospitales];
          this.totalHospitales = resp.total;
          this.totalHospitalesTemp = resp.total;
          this.calcularHasta();
          this.cargando = false;
        },
        error: (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
    });
  }

  actualizarHospital(hospital :Hospital) {
    this.hospitalesService.actualizarHospital(hospital.uid!, hospital.nombre)
    .subscribe({
      next: (resp) => {
        Swal.fire({ toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    title: 'Actualizado!',
                    text: `Hospital actualizado correctamente.`,
                    icon: 'success', });
      },
      error: (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      }
    });
  }

  eliminarHospital(hospital :Hospital) {
    return Swal.fire({
      title: '¿Eliminar hospital?',
      text: `Está a punto de eliminar el hospital: ${ hospital.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalesService.eliminarHospital(hospital.uid!)
        .subscribe({
          next: (resp) => {
            this.totalHospitales-=1;
            this.totalHospitalesTemp-=1;
            this.calcularHasta();
            this.cargarHospitales();
            Swal.fire({ toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        title: 'Eliminado!',
                        text: `Hospital: ${ hospital.nombre }, eliminado correctamente.`,
                        icon: 'success', });
          },
          error: (error) => {
            Swal.fire('Error', error.error.msg, 'error');
          }
        });
      }
    });
  }

  async crearHospital() {
    const { value } = await Swal.fire<string>({
      input: 'text',
      title: 'Crear hospital',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })

    if (value && value?.length > 0) {
      this.hospitalesService.crearHospital(value)
      .subscribe({
        next: (resp) => {
          // * Agregamos el nuevo hospital al array en vez de volver a consultar, solo si no estamos en el total de registros por página
          if (this.registosPagina > this.hospitales.length) {
            this.hospitales.push(resp.hospital);
          }

          this.totalHospitales+=1;
          this.totalHospitalesTemp+=1;

          Swal.fire({ toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      title: 'Creado!',
                      text: `Hospital: ${value}, creado correctamente.`,
                      icon: 'success', });
        },
        error: (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      });
    }
  }

  buscar(termino :string) {
    if (termino.length === 0) {
      this.hospitales = this.hospitalesTemp;
      this.totalHospitales = this.totalHospitalesTemp;
      return;
    }

    if (termino.length >= 3) {
    this.busquedasService.buscar(termino, 'hospitales', this.desde, this.registosPagina)
      .subscribe({
        next: (resp :CargarHospital) => {
          this.hospitales = resp.hospitales;
          this.totalHospitales = resp.total;
        },
        error: error => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      });
    }
  }
}

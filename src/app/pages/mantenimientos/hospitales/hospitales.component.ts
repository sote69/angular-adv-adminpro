import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class HospitalesComponent implements OnInit {
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
          this.hospitales = resp.hospitales;
          this.hospitalesTemp= resp.hospitales;
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
}

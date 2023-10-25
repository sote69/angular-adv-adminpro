import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private busquedasService = inject(BusquedasService);
  private router = inject(Router);

  public usuarios :Usuario[] = [];
  public medicos :Medico[] = [];
  public hopitales :Hospital[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({termino}) => this.busquedaGlobal(termino));
  }

  busquedaGlobal(termino :string) {
    this.busquedasService.busquedaGlobal(termino)
    .subscribe({
      next: (resp :any) => {
        console.log(resp);
        this.hopitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
      },
      error: error => {
        Swal.fire('Error', error.error.msg, 'error');
      }
    });
  }
}

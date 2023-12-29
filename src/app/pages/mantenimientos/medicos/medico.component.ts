import { Hospital } from './../../../models/hospital.model';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalesService } from '../../../services/hospitales.service';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm :FormGroup;
  public hospitales :Hospital[] = [];
  public hospitalSeleccionado :Hospital | undefined;
  public medicoSeleccionado :Medico | undefined;
  private hospitalesService = inject(HospitalesService);
  private medicoService = inject(MedicoService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private activatedRote = inject(ActivatedRoute);

  ngOnInit(): void {

    // * Cargamos los datos del médico cuando entra en modo de edición
    this.activatedRote.params.subscribe(({id}) => {
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });

    // * Creamos el formulario
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    // * Nos suscribimos al cambio de hospital seleccionado en el formulario para actualizar la imagen del mismo
    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(hospital => hospital.uid === hospitalId);
    });

    this.cargarHospitales();
  }

  cargarMedico(id :string) {
    this.medicoService.obtenerMedicoPorId(id).subscribe({
      next: (medico) => {
        const { nombre, hospital: { _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({nombre, hospital: _id});
      },
      error: (error) => {
        Swal.fire('Error', error.error.msg, 'error');
        this.router.navigateByUrl(`/dashboard/medicos`)
      }
    })
  }

  cargarHospitales() {
    this.hospitalesService.cargarTodosHospitales().subscribe(resp => {
      this.hospitales = resp.hospitales;
    });
  }

  guardarMedico() {

    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value, // * nombre y hospital
        id: this.medicoSeleccionado.uid
      };

      this.medicoService.actualizarMedico(data)
        .subscribe({
          next: (resp) => {
            console.log(resp);
            Swal.fire({ toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        title: 'Creado!',
                        text: `El médico: ${this.medicoForm?.get('nombre')!.value} se ha actualizado correctamente.`,
                        icon: 'success', });
            this.router.navigateByUrl(`/dashboard/medico/${resp.uid}`);
          },
          error: (error) => {
            Swal.fire('Error', error.error.msg, 'error');
          }
      });
    }
    else {
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe({
          next: (resp) => {
            console.log(resp);
            Swal.fire({ toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        title: 'Creado!',
                        text: `El médico: ${this.medicoForm?.get('nombre')!.value} se ha creado correctamente.`,
                        icon: 'success', });
            this.router.navigateByUrl(`/dashboard/medico/${resp.uid}`);
          },
          error: (error) => {
            Swal.fire('Error', error.error.msg, 'error');
          }
        });
      }
  }
}

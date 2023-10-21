import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Medico } from '../models/medico.model';
import { CargarMedico } from '../interfaces/cargar-medicos.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private base_url = environment.base_url;
  private httpClient = inject(HttpClient);

  get token() :string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { "Authorization": `Bearer ${ this.token }` } };
  }

  public cargarMedicos( desde :number = 0, numRegistros :number = 5 ) {

    return this.httpClient.get<CargarMedico>(`${this.base_url}/medicos?desde=${ desde }&numreg=${ numRegistros }`, this.headers)
      .pipe(
        //delay(150),
        map( resp => {
          const medicos = resp.medicos.map(
            med => new Medico(med.nombre, med.img, med.hospital, med.usuario, med.uid)
          );
          return { total: resp.total, medicos };
        })
      )
  }

  public eliminarMedico( id :string ) {
    return this.httpClient.delete<CargarMedico>(`${this.base_url}/medicos/desde=${ id }`, this.headers);
  }
}

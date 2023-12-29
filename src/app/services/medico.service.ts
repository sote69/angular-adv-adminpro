import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Medico } from '../models/medico.model';
import { CargarMedico } from '../interfaces/cargar-medicos.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private base_url = environment.base_url;
  private httpClient = inject(HttpClient);

  // Estos dos metodos se pasan al http-interceptor.service
  // get token() :string {
  //   return localStorage.getItem('token') || '';
  // }

  // get headers() {
  //   return { headers: { "Authorization": `Bearer ${ this.token }` } };
  // }

  public cargarMedicos( desde :number = 0, numRegistros :number = 5 ) {

    return this.httpClient.get<CargarMedico>(`${this.base_url}/medicos?desde=${ desde }&numreg=${ numRegistros }`/* , this.headers */)
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

  public obtenerMedicoPorId(id :string)  {
    return this.httpClient.get<Medico>(`${ this.base_url }/medicos/${ id }`/* , this.headers */)
      .pipe(
        map((resp :any) => resp.medico)
      );
  }

  public eliminarMedico( id :string ) {
    return this.httpClient.delete(`${this.base_url}/medicos/${ id }`/* , this.headers */);
  }

  public crearMedico(medico :{ nombre :string, hospital :string }) {
    return this.httpClient.post<Medico>(`${this.base_url}/medicos`, medico/* , this.headers */)
      .pipe(
        map((resp :any) => resp.medico)
      );
  }

  public actualizarMedico(medico :{ nombre :string, hospital :string, id :string }) {
    return this.httpClient.put<Medico>(`${this.base_url}/medicos/${ medico.id }`, medico/* , this.headers */)
      .pipe(
        map((resp :any) => resp.medico)
      );
  }
}

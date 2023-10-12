import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CargarHospital } from '../interfaces/cargar-hospitales.interface';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  public googleApi :any;
  private ngZone = inject(NgZone);
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private base_url = environment.base_url;

  get token() :string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { "Authorization": `Bearer ${ this.token }` } };
  }

  public cargarHospitales( desde :number = 0, numRegistros :number = 5 ) {

    return this.httpClient.get<CargarHospital>(`${this.base_url}/hospitales?desde=${ desde }&numreg=${ numRegistros }`, this.headers)
      .pipe(
        //delay(150),
        map( resp => {
          const hospitales = resp.hospitales.map(
            hospital => new Hospital(hospital.nombre, hospital.img, hospital.usuario, hospital.uid)
          );
          return { total: resp.total, hospitales };
        })
      )
  }
}

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

  // Estos dos metodos se pasan al http-interceptor.service
  // get token() :string {
  //   return localStorage.getItem('token') || '';
  // }

  // get headers() {
  //   return { headers: { "Authorization": `Bearer ${ this.token }` } };
  // }

  public cargarTodosHospitales() {

    return this.httpClient.get<CargarHospital>(`${this.base_url}/hospitales/all`/* , this.headers */)
      .pipe(
        //delay(150),
        map( resp => {
          const hospitales = resp.hospitales.map(
            hospital => new Hospital(hospital.nombre, hospital.img, undefined, hospital.uid)
          );
          return { total: hospitales.length, hospitales };
        })
      )
  }

  public cargarHospitales( desde :number = 0, numRegistros :number = 5 ) {

    return this.httpClient.get<CargarHospital>(`${this.base_url}/hospitales?desde=${ desde }&numreg=${ numRegistros }`/* , this.headers */)
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

  public crearHospital( nombre :string ) {

    return this.httpClient.post<Hospital>(`${this.base_url}/hospitales`, {nombre}/* , this.headers */)
      .pipe(
        map( (resp :any) => {
          const hospital = new Hospital(resp.hospital.nombre, resp.hospital.img, resp.hospital.usuario, resp.hospital.uid);
          return { hospital };
        })
      );
  }

  public actualizarHospital( id :string, nombre :string ) {

    return this.httpClient.put<Hospital>(`${this.base_url}/hospitales/${ id }`, {nombre}/* , this.headers */);
  }

  public eliminarHospital( id :string ) {

    return this.httpClient.delete(`${this.base_url}/hospitales/${ id }`/* , this.headers */);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { environment } from 'src/environments/environment';
import { CargarHospital } from '../interfaces/cargar-hospitales.interface';
import { Hospital } from '../models/hospital.model';
import { CargarMedico } from '../interfaces/cargar-medicos.interface';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private httpClient = inject(HttpClient);
  private base_url = environment.base_url;

  // Estos dos metodos se pasan al http-interceptor.service
  // get token() :string {
  //   return localStorage.getItem('token') || '';
  // }

  // get headers() {
  //   return { headers: { "Authorization": `Bearer ${ this.token }` } };
  // }

  public buscar( termino :string, tipo : 'usuarios' | 'medicos' | 'hospitales', desde :number = 0, numRegistros :number = 5 ) {

    return this.httpClient.get<any[]>(`${this.base_url}/todo/coleccion/${ tipo }/${ termino }?desde=${ desde }&numreg=${ numRegistros }`/* , this.headers */)
      .pipe(
        delay(150),
        map((resp :any) => {
          switch(tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultado);
            break;
            case 'hospitales':
              return this.transformarHospitales(resp.resultado);
            break;
            case 'medicos':
              return this.transformarMedicos(resp.resultado);
            break;
            default:
              return resp.resultado;
              break;
          }
        }),
      );
  }

  transformarUsuarios(resultados :any[]) :CargarUsuario {
    const usuarios = resultados.map(
      (user :any) => new Usuario(user.nombre, user.email, user.img, user.uid, user.rol, user.google)
    );
    return { total: usuarios.length, usuarios };
  }

  transformarHospitales(resultados :any[]) :CargarHospital {
    const hospitales = resultados.map(
      (hosp :any) => new Hospital(hosp.nombre, hosp.img, hosp.usuario, hosp.uid)
    );
    return { total: hospitales.length, hospitales };
  }

  transformarMedicos(resultados :any[]) :CargarMedico {
    const medicos = resultados.map(
      (med :any) => new Medico(med.nombre, med.img, med.hospital, med.usuario, med.uid)
    );
    return { total: medicos.length, medicos };
  }

  busquedaGlobal(termino :string) {
    return this.httpClient.get<any[]>(`${this.base_url}/todo/${ termino }`/* , this.headers */);
      // .pipe(
      //   delay(150),
      //   map((resp :any) => {
      //     switch(tipo) {
      //       case 'usuarios':
      //         return this.transformarUsuarios(resp.resultado);
      //       break;
      //       case 'hospitales':
      //         return this.transformarHospitales(resp.resultado);
      //       break;
      //       case 'medicos':
      //         return this.transformarMedicos(resp.resultado);
      //       break;
      //       default:
      //         return resp.resultado;
      //         break;
      //     }
      //   }),
      // );
  }
}

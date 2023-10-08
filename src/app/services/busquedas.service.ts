import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private httpClient = inject(HttpClient);
  private base_url = environment.base_url;

  get token() :string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { "Authorization": `Bearer ${ this.token }` } };
  }

  public buscar( termino :string, tipo : 'usuarios' | 'medicos' | 'hospitales', desde :number = 0, numRegistros :number = 5 ) {

    return this.httpClient.get<any[]>(`${this.base_url}/todo/coleccion/${ tipo }/${ termino }?desde=${ desde }&numreg=${ numRegistros }`, this.headers)
      .pipe(
        delay(150),
        map((resp :any) => {
          switch(tipo) {
            case 'usuarios':
              return this.transformarResultados(resp.resultado);
            break;
            default:
              return resp.resultado;
              break;
          }
        }),
      );
  }

  transformarResultados(resultados :any[]) :CargarUsuario {
    const usuarios = resultados.map(
      (user :any) => new Usuario(user.nombre, user.email, user.img, user.uid, user.rol, user.google)
    );
    return { total: usuarios.length, usuarios };
  }
}

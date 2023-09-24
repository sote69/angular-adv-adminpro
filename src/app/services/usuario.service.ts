import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { LoginForm } from '../interfaces/login-form.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private httpClient = inject(HttpClient);
  private base_url = environment.base_url;

  public crearUsuario( formData :RegisterForm ) {
    return this.httpClient.post(`${this.base_url}/usuarios`, formData)
    .pipe(
      tap( (resp :any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  public loginUsuario( formData :LoginForm ) {
    return this.httpClient.post(`${this.base_url}/login`, formData)
      .pipe(
        tap( (resp :any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  public loginGoogle( token :string ) {
    return this.httpClient.post(`${this.base_url}/login/google`, { token })
      .pipe(
        tap( (resp :any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  public validarToken() :Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.httpClient.get(`${this.base_url}/login/renew`, { headers: { "Authorization": `Bearer ${ token }` } })
      .pipe(
        // * Guardamos el nuevo token
        tap( (resp :any) => {
          localStorage.setItem('token', resp.token);
        }),
        // * Si fue bien la validación del token regresamos true
        map( (resp :any) => {
          return true;
        }),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }
}

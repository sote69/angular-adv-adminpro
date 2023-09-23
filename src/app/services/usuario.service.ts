import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { LoginForm } from '../interfaces/login-form.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private httpClient = inject(HttpClient);
  private base_url = environment.base_url;

  public crearUsuario( formData :RegisterForm )  {
    return this.httpClient.post(`${this.base_url}/usuarios`, formData)
    .pipe(
      tap( (resp :any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  public loginUsuario( formData :LoginForm )  {
    return this.httpClient.post(`${this.base_url}/login`, formData)
      .pipe(
        tap( (resp :any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  public loginGoogle( token :string )  {
    return this.httpClient.post(`${this.base_url}/login/google`, { token })
      .pipe(
        tap( (resp :any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }
}

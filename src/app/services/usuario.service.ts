import { HttpClient } from '@angular/common/http';
import { Injectable, inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm } from '../interfaces/login-form.interface';

declare const google :any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public googleApi :any;
  private ngZone = inject(NgZone);
  private httpClient = inject(HttpClient);
  private router = inject(Router);
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

  public googleInit() {

    return new Promise((resolve) => {
      google.accounts.id.initialize({
        client_id: environment.client_id,
        callback: (googleResponse :any) => this.handleCredentialResponse(googleResponse)
      });
      this.googleApi = google;
      resolve(true);
    });
  }

  handleCredentialResponse(response :any) {

    this.loginGoogle(response.credential)
      .subscribe({
        next: (resp) => {

          // * Navegar al dashboard
          this.ngZone.run(()=>{
            this.router.navigateByUrl('/');
          });
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
        complete: () => {}
      });
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

  public logOut() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('fernandezsotelo@gmail.com', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }
}

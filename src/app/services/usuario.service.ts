import { HttpClient } from '@angular/common/http';
import { Injectable, inject, NgZone, signal } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, tap, of, delay } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { PerfilForm } from '../interfaces/perfil-form.interfaces';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

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
  public usuario = signal<Usuario | undefined>(undefined);

  get token() :string {
    return localStorage.getItem('token') || '';
  }

  get uid() :string {
    return this.usuario()?.uid || '';
  }

  get rol() :string {
    return this.usuario()?.rol || '';
  }

  get headers() {
    return { headers: { "Authorization": `Bearer ${ this.token }` } };
  }

  public crearUsuario( formData :RegisterForm ) {
    return this.httpClient.post(`${this.base_url}/usuarios`, formData)
    .pipe(
      tap( (resp :any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  public actualizarUsuario( formData: { email :string, nombre :string, role :string } ) {
    formData = { ...formData, role: this.rol };
    return this.httpClient.put(`${this.base_url}/usuarios/${this.uid}`, formData, this.headers)
    .pipe(
      tap( (resp :any) => {
        console.log(resp);
        this.usuario()!.nombre = formData.nombre;
        this.usuario()!.email = formData.email;
      })
    )
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

          // * Navegar al dashboard, se usa el ngZone por hacer la navegación fuera del ámbito de angular
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

    return this.httpClient.get(`${this.base_url}/login/renew`, this.headers)
      .pipe(
        // * Guardamos el nuevo token
        map( (resp :any) => {
          const { nombre, email, img, uid, rol, google } = resp.usuario;
          this.usuario.set(new Usuario(nombre, email, img, uid, rol, google));
          localStorage.setItem('token', resp.token);
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

    if (this.usuario()?.google) {
      google.accounts.id.revoke(this.usuario()?.email, () => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        })
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public cargarUsuarios( desde :number = 0, numRegistros :number = 5 ) {

    return this.httpClient.get<CargarUsuario>(`${this.base_url}/usuarios?desde=${ desde }&numreg=${ numRegistros }`, this.headers)
      .pipe(
        delay(150),
        map( resp => {
          const usuarios = resp.usuarios.map(
            user => new Usuario(user.nombre, user.email, user.img, user.uid, user.rol, user.google)
          );
          return { total: resp.total, usuarios };
        })
      )
  }
}

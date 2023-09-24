import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { map, tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  return usuarioService.validarToken()
    .pipe(
      tap((estaAutenticado) => {

        if(!estaAutenticado) {
          router.navigateByUrl('/login');
        }
      })
    )

};

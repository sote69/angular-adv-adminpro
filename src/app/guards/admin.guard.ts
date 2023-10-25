import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

export const AdminGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.rol === 'ADMIN_ROL') {
    return true
  }
  else {
    router.navigateByUrl('/dashboard');
    return false;
  }
};

import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  public usuario = computed<Usuario>(() => this.usuarioService.usuario()!);

  logOut() {
    this.usuarioService.logOut();
  }

  buscar(termino :string) {
    console.log(termino);

    if (termino.length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }
}

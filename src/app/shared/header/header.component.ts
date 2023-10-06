import { Component, computed, inject } from '@angular/core';
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
  public usuario = computed<Usuario>(() => this.usuarioService.usuario()!);

  logOut() {
    this.usuarioService.logOut();
  }
}

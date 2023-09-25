import { Component, inject } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  private usuarioService = inject(UsuarioService);

  logOut() {
    this.usuarioService.logOut();
  }
}

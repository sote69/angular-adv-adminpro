import { Component, computed, inject, signal } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  private sidebarService = inject(SidebarService);
  private usuarioService = inject(UsuarioService);
  public usuario = computed<Usuario>(() => this.usuarioService.usuario()!);
  menuItems :any[];

  constructor() {
    this.menuItems = this.sidebarService.menu;
  }
}

import { Component, OnInit, inject } from '@angular/core';

import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

// La funcion customInititFunctions() se encuentra en el custom.js, se encarga de inicializar los componenetes
declare function customInititFunctions() :void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  // * Tema del usuario
  private settingsService = inject(SettingsService);

  // * Carga el menú
  private sidebarService = inject(SidebarService);

  ngOnInit(): void {
    // * Inicializa los componetes
    customInititFunctions();
  }
}

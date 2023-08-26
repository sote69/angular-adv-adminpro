import { Component, OnInit, inject } from '@angular/core';

import { SettingsService } from '../services/settings.service';

// La funcion customInititFunctions() se encuentra en el custom.js, se encarga de inicializar los componenetes
declare function customInititFunctions() :void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  private settingsService = inject(SettingsService);

  ngOnInit(): void {
    customInititFunctions();
  }
}

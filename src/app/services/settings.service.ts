import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {

    // Establecemos el tema
    const theme = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', theme);
  }

  // Cambia el fichero css a aplicar
  changeTheme(theme :string, links :NodeListOf<Element>) {

    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url); // Vanilla js
    localStorage.setItem('theme', url);
    this.checkCurrentTheme(links);
  }

  // Establecer el check al tema
  checkCurrentTheme(links :NodeListOf<Element>) {

    links.forEach(link => {
      link.classList.remove('working');
      const btnTheme = link.getAttribute('data-theme');
      const linkThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentThemeUrl = this.linkTheme?.getAttribute('href');

      if(linkThemeUrl === currentThemeUrl) {
        link.classList.add('working');
      }
    })
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu :any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      subMenu: [
        { titulo: 'Principal', url: '/' },
        { titulo: 'Gráfica', url: 'grafica1' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'Rxjs', url: 'rxjs' },
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      subMenu: [
        { titulo: 'Hospitales', url: 'hospitales' },
        { titulo: 'Médicos', url: 'medicos' },
        { titulo: 'Uruarios', url: 'usuarios' },
      ]
    },
  ]

  constructor() { }
}

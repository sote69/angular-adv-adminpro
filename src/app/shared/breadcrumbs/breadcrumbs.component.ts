import { Component, inject } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent {

  private router = inject(Router);
  public titulo :string = '';

  constructor() {
    // Obtenemos la data configurada en el pages-routing.module
    this.router.events
               .pipe(
                  filter((event): event is ActivationEnd => event instanceof ActivationEnd),
                  filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
                  map((event:ActivationEnd) => event.snapshot.data)
               )
               .subscribe((data) => {
                  this.titulo = data['titulo']; // Titulo de la página
                  document.title = `AdminPro - ${this.titulo}`;
                });
  }
}

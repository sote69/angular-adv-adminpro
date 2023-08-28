import { Component, OnDestroy, inject } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  private router = inject(Router);
  public titulo :string = '';
  public tituloSubs$ :Subscription;

  constructor() {
    this.tituloSubs$ = this.getRouteData()
                            .subscribe((data) => {
                              this.titulo = data['titulo']; // Titulo de la página
                              document.title = `AdminPro - ${this.titulo}`;
                            });
  }

  getRouteData() {
    // Obtenemos la data configurada en el pages-routing.module para mostrar el nombre de la página en el breadcrumb
    return this.router.events
               .pipe(
                  filter((event): event is ActivationEnd => event instanceof ActivationEnd),
                  filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
                  map((event:ActivationEnd) => event.snapshot.data)
                );
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }
}

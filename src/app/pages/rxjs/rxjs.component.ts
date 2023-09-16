import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs : Subscription;

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  constructor() {

    // Usamos el observable
    // this.retornaObservable().pipe(
    //   retry(2) // Reintenta n veces si hay algun error
    // ).subscribe({
    //   next(valor) { console.log('Valor devuelto: ' + valor) },
    //   error(valor) { console.error('Error: ' + valor) },
    //   complete() { console.log('Observable completo ') },
    // });

    this.intervalSubs = this.retornaIntervalo().subscribe(
      {
        next(valor) { console.log(valor) },
        error(error) { console.log(error) },
        complete() { console.log('Fin del observable') }
      }
    );


  }

  retornaIntervalo() :Observable<number>{
    return interval(200).pipe(
      map((valor) => { return valor + 1 }), // Transforma el valor a devolver 0 => 1
      filter(valor => (valor % 2 === 0)),   // Solo devolvemos los pares
      take(10),                             // Indica el numero de interacciones que queremos
    );

  }

  retornaObservable() :Observable<number> {
    let i = 0;

    // Ejemplo de observable
    return new Observable<number>((observer) => {

      const intervalo = setInterval(() => {

        observer.next(i);
        i++;

        if (i === 6) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 3) {
          clearInterval(intervalo);
          observer.error('Error en el observable, valor llego a 3');
        }

      }, 1000);
    });
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  @Input('valorInput') progreso :number = 50;

  @Output('valorEmitido') valorSalida :EventEmitter<number> = new EventEmitter();

  incrementar(value :number) {

    if (this.progreso >= 100 && value > 0)
    {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && value < 0)
    {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + value;
    return this.valorSalida.emit(this.progreso);
  }
}

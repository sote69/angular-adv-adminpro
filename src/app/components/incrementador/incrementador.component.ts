import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})

export class IncrementadorComponent implements OnInit {

  @Input('valorInput') progreso :number = 50;
  @Input('btnClass') btnClass :string = 'btn-primary';

  @Output('valorEmitido') valorSalida :EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
    console.log(this.btnClass);
  }

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

  onChange(valor :number) {

    if (valor >= 100) {
      console.log(valor);
      valor = 100;
    }
    else if (valor <= 0) {
      valor = 0;
    }

    this.valorSalida.emit(valor);
  }
}

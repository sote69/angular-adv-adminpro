import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  public usuarios :Usuario[] = [];
  public totalUsuarios :number = 0;
  public desde :number = 0;
  public registosPagina :number = 5;
  public hasta :number = this.desde + this.registosPagina;
  public listaRegistosPagina :number[] = [ 5, 10, 15];
  public cargando :boolean = false;

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cambiarRegistrosPorPagina(valor :string) {

    this.registosPagina = parseInt(valor);
    this.cargarUsuarios();
  }

  cambiarDePagina(valor :number) {

    this.desde += (this.registosPagina * valor);

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= this.registosPagina;
    }

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde, this.registosPagina)
      .subscribe({
        next: (resp) => {
          this.usuarios = resp.usuarios;
          this.totalUsuarios = resp.total;
          this.calcularHasta();
          this.cargando = false;
        },
        error: (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
    });
  }

  calcularHasta() {
    this.hasta = this.desde + this.registosPagina;
    if ( this.hasta < 0 ) {
      this.hasta = this.desde + this.registosPagina;
    } else if ( this.hasta >= this.totalUsuarios ) {
      this.hasta = this.totalUsuarios;
    }
  }
}

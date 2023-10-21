import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';
import { CargarUsuario } from 'src/app/interfaces/cargar-usuarios.interface';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  private usuarioService = inject(UsuarioService);
  private busquedasService = inject(BusquedasService);
  private modalImagenService = inject(ModalImagenService);

  public usuarios :Usuario[] = [];
  public usuariosTemp :Usuario[] = [];
  public totalUsuarios :number = 0;
  public totalUsuariosTemp :number = 0;
  public desde :number = 0;
  public registosPagina :number = 5;
  public hasta :number = this.desde + this.registosPagina;
  public listaRegistosPagina :number[] = [ 5, 10, 15];
  public cargando :boolean = false;
  public imgSubs :Subscription;

  ngOnInit(): void {
    this.cargarUsuarios();

    // * Al actualizar la imagen de un usuario vuelve a consultar los usuarios
    this.imgSubs = this.modalImagenService.imagenActualizada
      .pipe(
        // * Ponemos un delay de 100 milesimas por si no da tiempo a cargar la nueva imagen
        delay(100)
      )
      .subscribe(img => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  abrirModal(usuario :Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
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
          this.usuarios = [...resp.usuarios];
          this.usuariosTemp = [...resp.usuarios];
          this.totalUsuarios = resp.total;
          this.totalUsuariosTemp = resp.total;
          this.calcularHasta();
          this.cargando = false;
        },
        error: (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
    });
  }

  calcularHasta() {

    if (this.desde >= this.totalUsuarios) {
      this.desde -= this.registosPagina;
    }

    this.hasta = this.desde + this.registosPagina;

    if ( this.hasta < 0 ) {
      this.hasta = this.desde + this.registosPagina;
    } else if ( this.hasta >= this.totalUsuarios ) {
      this.hasta = this.totalUsuarios;
    }
  }

  buscar(termino :string) {
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
      this.totalUsuarios = this.totalUsuariosTemp;
      return;
    }

    if (termino.length >= 3) {
    this.busquedasService.buscar(termino, 'usuarios', this.desde, this.registosPagina)
      .subscribe({
        next: (resp :CargarUsuario) => {
          this.usuarios = resp.usuarios;
          this.totalUsuarios = resp.total;
        },
        error: error => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      });
    }
  }

  eliminarUsuario(usuario :Usuario) {

    // * No dejamos eliminar nuestro propio usuario
    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error!', `No puede elimiarse a si mismo.`,'error');
    }

    return Swal.fire({
      title: '¿Eliminar usuario?',
      text: `Está a punto de eliminar al usuario ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
        .subscribe({
          next: (resp) => {
            this.totalUsuarios-=1;
            this.totalUsuariosTemp-=1;
            this.calcularHasta();
            this.cargarUsuarios();
            Swal.fire({ toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              title: 'Eliminado!',
              text: `Usuario: ${usuario.nombre}, eliminado correctamente.`,
              icon: 'success', });
          },
          error: (error) => {
            Swal.fire('Error', error.error.msg, 'error');
          }
        });
      }
    });
  }

  cambiarRol(usuario :Usuario) {
    this.usuarioService.actualizarUsuario(usuario)
      .subscribe({
        next: (resp) => {
          Swal.fire({ toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      title: 'Actualizado!',
                      text: `El usuario ${usuario.nombre} se ha actualizado correctamente.`,
                      icon: 'success', });
        },
        error: (error) => {
          Swal.fire('Error', error.error.msg, 'error');
        }
      });
  }
}

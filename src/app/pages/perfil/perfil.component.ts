import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {

  private fb :FormBuilder = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private fileUploadService = inject(FileUploadService);
  public perfilForm :FormGroup = this.fb.group({});
  public usuario = computed<Usuario>(() => this.usuarioService.usuario()!);
  public imagenASubir :File | undefined;
  public imgTemp :any = null;

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario()?.nombre, [Validators.required] ],
      email: [ this.usuario()?.email, [Validators.required, Validators.email] ]
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
      .subscribe({
        next: (resp) => {
          Swal.fire('Guardado', 'Los cambios han sido grabados correctamente', 'success');
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      });
  }

  establecerImagen(file :File) {

    if(!file) {
      this.imgTemp = null;
      return;
    }

    // * Leemos el contenido de la imagen seleccionada y lo cargamos para que el usuario lo vea
    this.imagenASubir = file;

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen() {
    this.fileUploadService
      .actualizarImagen(this.imagenASubir!, 'usuarios', this.usuario().uid!)
      .then(imagen => {
        this.usuarioService.usuario()!.img = imagen;
        Swal.fire('Guardado', 'La imagen se actualizó correctamente', 'success');
      })
      .catch(err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}

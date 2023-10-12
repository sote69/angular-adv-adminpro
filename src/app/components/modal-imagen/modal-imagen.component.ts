import { Component, computed, inject } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  private modalImagenService = inject(ModalImagenService);
  private fileUploadService = inject(FileUploadService);
  public imagenASubir :File | undefined;
  public imgTemp :any = null;
  public imgSeleccionada  = null;

  get ocultarModal() {
    return this.modalImagenService.ocultarModal;
  }

  get imagen() {
    return this.modalImagenService.img;
  }

  cerrarModal() {
    this.imgTemp = null;
    this.imgSeleccionada = null;
    this.imagenASubir = undefined;
    this.modalImagenService.cerrarModal();
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

    console.log(this.imgSeleccionada);
  }

  subirImagen() {
    const { id, tipo } = this.modalImagenService;

    this.fileUploadService
      .actualizarImagen(this.imagenASubir!, tipo, id)
      .then(imagen => {

        // * Emitimos la url de la nueva imagen
        this.modalImagenService.imagenActualizada.emit(imagen);
        this.cerrarModal();
        this.imgSeleccionada = null;
        Swal.fire('Guardado', 'La imagen se actualizó correctamente', 'success');
      })
      .catch(err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}

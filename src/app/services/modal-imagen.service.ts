import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal :boolean = true;
  private baseUrl = environment.base_url;
  public tipo :'usuarios' | 'medicos' | 'hospitales';
  public id :string = '';
  public img? :string = '';

  public imagenActualizada :EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(tipo : 'usuarios' | 'medicos' | 'hospitales', id :string, img :string = 'no-img') {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if (!img) {
      img = 'no-img';
    }

    if (img?.includes('https')) {
      this.img = img;
    } else {
      this.img = `${ this.baseUrl }/uploads/${ tipo }/${ img }`
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}

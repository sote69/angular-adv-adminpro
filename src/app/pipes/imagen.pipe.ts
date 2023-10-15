import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  private baseUrl = environment.base_url;

  transform(imagen: string | undefined, tipo: 'usuarios' | 'medicos' | 'hospitales') :string {

    if (imagen) {

      if (imagen.includes('https')) {
        return imagen;
      } else {
        return `${ this.baseUrl }/uploads/${ tipo }/${ imagen }`;
      }
    } else {
      return `${ this.baseUrl }/uploads/${ tipo }/no-img`;
    }
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private base_url = environment.base_url;

  constructor() { }

  get token() :string {
    return localStorage.getItem('token') || '';
  }

  async actualizarImagen(archivo :File, tipo :'usuarios' | 'medicos' | 'hospitales', id :string) {
    try {
      const url = `${ this.base_url }/uploads/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      const resp = await fetch(url, { method: 'PUT',
                                      headers: { "Authorization": `Bearer ${ this.token }` },
                                      body: formData }).then(resp => resp.json());

      if(resp.ok){
        return resp.nombreArchivo;
      }
      else {
        return false;
      }
    }
    catch (error) {
      return false;
    }
  }
}

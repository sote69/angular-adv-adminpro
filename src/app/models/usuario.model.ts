import { environment } from "src/environments/environment";

const baseUrl = environment.base_url;

export class Usuario {

  nombre :string;
  email :string ;
  img :string;
  uid? :string;
  rol? :'ADMIN_ROL' | 'USER_ROL';
  google? :boolean;

  constructor(nombre :string,
              email :string ,
              img :string,
              uid? :string,
              rol? :'ADMIN_ROL' | 'USER_ROL',
              google? :boolean)
  {
    this.nombre = nombre;
    this.email  = email;
    this.img    = (!img || img === '') ? 'no-img' : img;
    this.uid    = uid;
    this.rol    = rol;
    this.google = google;
  }

  get imagenUrl() :string {

    if (this.img) {

      if (this.img.includes('https')) {
        return this.img;
      } else {
        return `${baseUrl}/uploads/usuarios/${this.img}`;
      }
    } else {
      return `${baseUrl}/uploads/usuarios/no-img`;
    }
  }
};

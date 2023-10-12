import { environment } from "src/environments/environment";

const baseUrl = environment.base_url;

interface _HospitalUsr {
  id :string,
  nombre :string,
  img :string
}

export class Hospital {

  nombre :string;
  uid? :string;
  img? :string;
  usuario? :_HospitalUsr;

  constructor(nombre :string,
              img? :string,
              usuario? :_HospitalUsr,
              uid? :string)
  {
    this.nombre  = nombre;
    this.img     = (!img || img === '') ? 'no-img' : img;
    this.uid     = uid;
    this.usuario = usuario;
  }
};

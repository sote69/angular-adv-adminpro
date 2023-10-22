import { environment } from "src/environments/environment";

const baseUrl = environment.base_url;

interface _MedicoUsr {
  _id :string,
  nombre :string,
  img :string
}

interface _MedicoHosp {
  _id :string,
  nombre :string,
  img :string
}

export class Medico {

  nombre :string;
  uid? :string;
  img? :string;
  hospital? :_MedicoHosp;
  usuario? :_MedicoUsr;

  constructor(nombre :string,
              img? :string,
              hospital? :_MedicoHosp,
              usuario? :_MedicoUsr,
              uid? :string)
  {
    this.nombre   = nombre;
    this.img      = (!img || img === '') ? 'no-img' : img;
    this.uid      = uid;
    this.hospital = hospital;
    this.usuario  = usuario;
  }
};

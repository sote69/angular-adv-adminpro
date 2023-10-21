import { environment } from "src/environments/environment";
import { Hospital } from './hospital.model';

const baseUrl = environment.base_url;

interface _MedicoUsr {
  id :string,
  nombre :string,
  img :string
}

interface _MedicoHosp {
  id :string,
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

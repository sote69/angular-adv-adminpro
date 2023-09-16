import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  public usuarios :any[] = [];

  ngOnInit(): void {

    // Ejemplo de una promesa
    // const promesa = new Promise((resolve, reject) => {

    //   if (false) {
    //     resolve('Resolve: Hola mundo');
    //   }
    //   else {
    //     reject('Algo salio mal');
    //   }

    // });

    // Cuando la promesa se resuelve
    // promesa.then((resultado) => {
    //   console.log(`Promesa resuelta correctamente => ${resultado}`)
    // })
    // .catch((resultado) => {
    //   console.log(`Promesa resuelta con error => ${resultado}`)
    // })

    // console.log('Fin del init');

    this.getUsuarios()
        .then(usuarios => {
          console.log(usuarios)
          this.usuarios = usuarios;
        })
        .catch(error => console.log(error));
  }

  getUsuarios() :Promise<any> {

    // Forma corta sin tratar el error
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users?page=2')
      .then((resp) => resp.json())
      .then((body) => resolve(body.data));
    });

    // Forma larga tratar el error
    // return new Promise((resolve, reject) => {
    //   fetch('https://reqres.in/api/users?page=2')
    //   .then((resp) => {
    //     console.log('ok')
    //     resp.json().then((body) => {
    //       resolve(body.data);
    //     })
    //   })
    //   .catch((resp) => {
    //     console.log('error');
    //     reject(resp);
    //   });
    // });
  }
}

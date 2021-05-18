import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => {
       console.log(usuarios)
     })
    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola mundo')
    //   } else {
    //     reject('Algo salio mal')
    //   }
    // });
    // promesa.then((resp) => {
    //   console.log(resp);
    // })
    //   .catch(error => {
    //   console.log(error)
    // })
    // console.log('Fin init');
  }
  getUsuarios() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then(body => console.log(body.data));
    });
  }

}

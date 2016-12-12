import { Component } from '@angular/core';

import { Lista }                  from './model/lista';

//Apenas para evitar msg de erro de module.id
declare var module: any;

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {

  listaSelecionada: Lista=null;

  listaSelecionadaAtualizada(lista: Lista) : void{
    //console.log("LISTA SELECIONADA %o", lista);
    //console.log("LISTA SELECIONADA"+JSON.stringify(lista));
    this.listaSelecionada = lista;
  }

}

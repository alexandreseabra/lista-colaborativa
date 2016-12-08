import { Component } from '@angular/core';

import { Lista }                  from './model/lista';

@Component({
    selector: 'my-app',
    template: `
    <listas (listaSelecionadaEvento)="listaSelecionadaAtualizada($event)">
    </listas>
    <lista [lista]="listaSelecionada"></lista>
    <parse></parse>`
})
export class AppComponent {

  listaSelecionada: Lista=null;

  listaSelecionadaAtualizada(lista: Lista) : void{
    //console.log("LISTA SELECIONADA %o", lista);
    //console.log("LISTA SELECIONADA"+JSON.stringify(lista));
    this.listaSelecionada = lista;
  }

}

import { Component, Input, Output, EventEmitter, ApplicationRef }          from '@angular/core';
import { OnInit }                    from '@angular/core';

import { Lista }                     from './model/lista';

import { UtilService }               from './util.service';
import { ListaService }           from './service/lista.service'

//Apenas para evitar msg de erro de module.id
declare var module: any;

@Component({
  moduleId: module.id,
  selector: 'listas',
  templateUrl: 'listas.component.html'
})
export class ListasComponent implements OnInit{

  private listas : Lista[];
  private nomeNovaLista : string;

  constructor(private listaService: ListaService,
                private utilService:UtilService,
                private applicationRef: ApplicationRef){
  }

  ngOnInit(): void {
    this.listaService.getListas().then( (listas: any)=> {
      console.log("PARSE OBJECT %o",listas);

      this.listas = JSON.parse(JSON.stringify(listas,null,4));
    });
  }

  removeLista(lista: Lista, event: any): void {
    event.stopPropagation();
    let index = this.listas.indexOf(lista);
    console.log(index);
    this.listas.splice(index,1);

    this.listaService.removeLista(lista.objectId);
  }

  adicionarNovaLista():void {
    console.log(this.nomeNovaLista);
    this.listaService.adicionaLista(this.nomeNovaLista).then(
      (lista:Lista) => {
        this.listas.push( JSON.parse(JSON.stringify(lista,null,4)) );
      }
    );
  }

}


/*

id : string;
criadoPor : string;
nomeLista : string;
itens : Item[];*/

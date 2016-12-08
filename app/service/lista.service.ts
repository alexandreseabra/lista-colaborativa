
//// <reference path="../../node_modules/typescript/lib/lib.es6.d.ts" />

import { Injectable } from '@angular/core';
import { Lista }      from '../model/lista';
import { Item }      from '../model/item';

import { LISTAS }     from '../mock-areas-de-compartilhamento';

declare var Parse: any;


@Injectable()
export class ListaService{

  getListas(): Promise<Lista[]>{
   console.log("REQUISIÇÂO AO SERVIDOR");
   let query = new Parse.Query("Lista");
       query.limit(10);
   return query.find();
  }

  getLista(objectId:string): Promise<Lista>{
    console.log("REQUISIÇÂO AO SERVIDOR");
    let Lista = Parse.Object.extend("Lista");
    let query = new Parse.Query(Lista);
    return query.get(objectId);
  }

  adicionaItemNaLista(novoItem:Item, lista: Lista): void{
    console.log("REQUISIÇÂO AO SERVIDOR");
    let idLista = lista.objectId;

    this.getLista( idLista ).then( (listaParse:any) => {
      listaParse.addUnique("itens", novoItem);
      listaParse.save();
    }, (error:any) => {
      console.log("Não foi possivel adicionar Lista "+idLista);
    });
  }

  removeItemDaLista(itemQueSeraRemovido:Item, lista:Lista):void {
    console.log("REQUISIÇÂO AO SERVIDOR");
    let idLista = lista.objectId;

    this.getLista( idLista ).then( (listaParse:any) => {
      let arrayItens = listaParse.get("itens");

      let arrayItensASeremRemovidos = arrayItens.filter(function(item:any){return item.nome===itemQueSeraRemovido.nome});
      arrayItensASeremRemovidos.forEach( (item:any) => {
                                              listaParse.remove("itens",item);
                                              } );
      listaParse.save();
    }, (error:any) => {
      console.log("Não foi possivel remover item da Lista "+idLista);
    });
  }

  mudaStatus(itemNovoStatus:Item, lista:Lista):void {
    console.log("REQUISIÇÂO AO SERVIDOR");
    let idLista = lista.objectId;

    this.getLista( idLista ).then( (listaParse:any) => {
      let arrayItens = listaParse.get("itens");

      let arrayItensComNovoStatus = arrayItens.filter(function(item:any){return item.nome===itemNovoStatus.nome});
      arrayItensComNovoStatus.forEach( (item:any) => {
                                              item.status = itemNovoStatus.status;
                                              } );
      listaParse.save();
    }, (error:any) => {
      console.log("Não foi possivel mudar status de item da lista "+idLista);
    });
  }

}

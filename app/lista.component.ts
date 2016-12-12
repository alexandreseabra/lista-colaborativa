import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Item }             from './model/item';
import { Lista }            from './model/lista';

import { ListaService }     from './service/lista.service';

import 'rxjs/add/operator/switchMap';

//Apenas para evitar msg de erro de module.id
declare var module: any;
declare var Parse: any;

@Component({
  moduleId: module.id,
  selector: 'lista',
  templateUrl: 'lista.component.html'
})
export class ListaComponent implements OnInit {
  constructor(private listaService : ListaService,
              private route: ActivatedRoute,
              private location: Location){
  }

  private lista : Lista;
  private novoItem : string = "";
  private subscription: any;


  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.listaService.getLista(params['id']))
      .subscribe( lista => this.lista = JSON.parse(JSON.stringify(lista,null,4)) );

      let Lista = Parse.Object.extend("Lista");
      let query = new Parse.Query(Lista);
      this.subscription = query.subscribe();

      this.subscription.on('open', () => {
       console.log('subscription opened');
      });
      this.subscription.on('close', () => {
        console.log('subscription closed');
      });

      this.subscription.on('update', (listaEvento:any) => {
        this.listaService.getListas().then( (listas:any)=> {
          this.lista = JSON.parse(JSON.stringify(listas,null,4))
              .find((auxLista : any) => auxLista.objectId === this.lista.objectId);
        });
      });
  }

  listaCompleta(): boolean {
    if( this.lista.itens.length > 0){
      let item:any = this.lista.itens.find( (item : Item) => item.status === "todo" );
      if (!item){ // Se não for undefined, é porque tem algum ainda
        return true;
      }
    }
    return false;
  }

  mudarStatus( item : Item): void{
    if( item.status === 'done' ){
      item.status = 'todo';
    }else{
      item.status = 'done';
    }
    this.listaService.mudaStatus(item, this.lista);
  }

  remover( item : Item ): void{
    this.listaService.removeItemDaLista(item,this.lista);
  }

  removerConcluidos():void{
    let concluidos = this.lista.itens.filter(function(item){return item.status==='done'});
    concluidos.forEach((item) => {
        this.listaService.removeItemDaLista(item,this.lista);
    });

  }

  adicionar(): void {
    if( this.novoItem === "" )
      return;

    let novoObjeto : Item = {
      nome : this.novoItem,
      status : 'todo',
      dtCriacao : new Date()
    };

    this.listaService.adicionaItemNaLista(novoObjeto,this.lista);

    this.novoItem = "";
  }
}

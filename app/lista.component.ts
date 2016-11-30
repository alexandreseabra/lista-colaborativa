import { Component, Input } from '@angular/core';

import { Item }             from './model/item';
import { Lista }            from './model/lista';

import { ListaService }     from './service/lista.service';

@Component({
  moduleId: module.id,
  selector: 'lista',
  templateUrl: 'lista.component.html'
})
export class ListaComponent {
  constructor(private listaService : ListaService){
  }

  @Input()
  private lista : Lista;
  private novoItem : string = "";

  mudarStatus( item : Item): void{
    if( item.status === 'done' ){
      item.status = 'todo';
    }else{
      item.status = 'done';
    }
  }

  remover( item : Item ): void{
    let index = this.lista.itens.indexOf(item);
    this.lista.itens.splice(index,1);
  }

  removerConcluidos():void{
    let concluidos = this.lista.itens.filter(function(item){return item.status==='done'});
    concluidos.forEach(item => this.remover(item));
  }

  adicionar(): void {
    if( this.novoItem === "" )
      return;

    let auxitem : Item = {
      nome : this.novoItem,
      status : 'todo',
      dtCriacao : new Date()
    };

    this.novoItem = "";
/*
    this.listaService.getLista( this.lista.objectId )
    .then( (listaSelecionada) => {
      listaSelecionada.itens.add("itens",auxitem);
      listaSelecionada.save(
        {success: function(listaSalva){

          console.log("Novo Item Salvo: %o", listaSalva);
        }});
      }

    //this.lista.itens.push(auxitem);
  );*/
  }
}

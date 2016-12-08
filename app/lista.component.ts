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
    this.listaService.mudaStatus(item, this.lista);
  }

  remover( item : Item ): void{
    /*
    let index = this.lista.itens.indexOf(item);
    this.lista.itens.splice(index,1);
    */
    this.listaService.removeItemDaLista(item,this.lista);
  }

  removerConcluidos():void{
    /*
    let concluidos = this.lista.itens.filter(function(item){return item.status==='done'});
    concluidos.forEach(item => this.remover(item));
    */

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

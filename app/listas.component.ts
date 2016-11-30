import { Component, Input, Output, EventEmitter, ApplicationRef }          from '@angular/core';
import { OnInit }                    from '@angular/core';

import { Lista }                     from './model/lista';

import { UtilService }               from './util.service';
import { ListaService }           from './service/lista.service'


@Component({
  selector: 'listas',
  template: `
    <div class="panel panel-primary">
      <div class="panel-heading">Todas as listas</div>
      <div class="panel-body">

        <ul *ngIf="listas" class="list-group">
          <li *ngFor="let lista of listas"
              class="list-group-item"
              (click)="selecionaLista(lista)"
              [class.active]="listaSelecionada===lista">
            {{lista.objectId}} - {{lista.nomeLista}} - criado por {{lista.criadoPor}}
          </li>
        </ul>

      </div>
    </div>

  `
})
export class ListasComponent implements OnInit{

  @Output()
  listaSelecionadaEvento = new EventEmitter();
  private listas : Lista[];
  private listaSelecionada : Lista=null;

  constructor(private listaService: ListaService,
                private utilService:UtilService,
                private applicationRef: ApplicationRef){
  }

  ngOnInit(): void {
    this.listaService.getListas().then( (listas)=> {
      let texto = JSON.stringify(listas,null,4);
      this.listas = JSON.parse(texto);

/*
      console.log("RECEBIDO DUMP >>>> %o",listas);
      console.log("RECEBIDO STRINGFY >>>> "+JSON.stringify(listas,null,4));
      console.log(listas[0].get("nomeLista"));
      console.log(listas[0].get("itens"));
      //this.listas = listas;*/
      if( this.listas && this.listas.length > 0 ){
        this.listaSelecionada = this.listas[0];
        this.listaSelecionadaEvento.emit(this.listaSelecionada);
      }

      //Forca checagem de mudança apra atualizar DOM
      //this.applicationRef.tick();
    });
  }

  selecionaLista(lista: Lista): void{
    console.log("estou recebendo");
    this.listaSelecionada= lista;
    this.listaSelecionadaEvento.emit(this.listaSelecionada);
  }
}

/*

id : string;
criadoPor : string;
nomeLista : string;
itens : Item[];*/

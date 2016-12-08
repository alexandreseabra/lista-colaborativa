import { Component, Input, Output, EventEmitter, ApplicationRef }          from '@angular/core';
import { OnInit }                    from '@angular/core';

import { Lista }                     from './model/lista';

import { UtilService }               from './util.service';
import { ListaService }           from './service/lista.service'

declare var Parse: any;

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
              [class.active]="listas[indexListaSelecionada]===lista">
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
  private indexListaSelecionada : number=0;
  private subscription: any;
  private auxListasComponent: ListasComponent; //

  constructor(private listaService: ListaService,
                private utilService:UtilService,
                private applicationRef: ApplicationRef){
  }

  ngOnInit(): void {
    this.listaService.getListas().then( (listas: any)=> {
      console.log("PARSE OBJECT %o",listas);

      this.listas = JSON.parse(JSON.stringify(listas,null,4));

      if( this.listas && this.listas.length > 0 ){
        this.listaSelecionadaEvento.emit( this.listas[this.indexListaSelecionada] );
      }
    });

    let Lista = Parse.Object.extend("Lista");
    let query = new Parse.Query(Lista);
    this.subscription = query.subscribe();

    this.subscription.on('open', () => {
     console.log('subscription opened');
    });
    this.subscription.on('close', () => {
      console.log('subscription closed');
    });


    this.subscription.on('create', (listaEvento:any) => {
      //TODO FUTURAMENTE VAMOS RETIRAR ESSSE CODIGO REPLICADO!
      this.listaService.getListas().then( (listas:any)=> {
        this.listas = JSON.parse(JSON.stringify(listas,null,4));
        this.listaSelecionadaEvento.emit( this.listas[this.indexListaSelecionada] );
      });
    });

    this.subscription.on('update', (listaEvento:any) => {
      //TODO FUTURAMENTE VAMOS RETIRAR ESSSE CODIGO REPLICADO!
      this.listaService.getListas().then( (listas:any)=> {
        this.listas = JSON.parse(JSON.stringify(listas,null,4));
        this.listaSelecionadaEvento.emit( this.listas[this.indexListaSelecionada] );
      });
    });

    this.subscription.on('enter', (listaEvento:any) => {
      //TODO FUTURAMENTE VAMOS RETIRAR ESSSE CODIGO REPLICADO!
      this.listaService.getListas().then( (listas:any)=> {
        this.listas = JSON.parse(JSON.stringify(listas,null,4));
        this.listaSelecionadaEvento.emit( this.listas[this.indexListaSelecionada] );
      });
    });

    this.subscription.on('delete', (listaEvento:any) => {
      //TODO FUTURAMENTE VAMOS RETIRAR ESSSE CODIGO REPLICADO!
      this.listaService.getListas().then( (listas:any)=> {
        this.listas = JSON.parse(JSON.stringify(listas,null,4));
        this.listaSelecionadaEvento.emit( this.listas[this.indexListaSelecionada] );
      });
    });

    this.subscription.on('leave', (listaEvento:any) => {
      //TODO FUTURAMENTE VAMOS RETIRAR ESSSE CODIGO REPLICADO!
      this.listaService.getListas().then( (listas:any)=> {
        this.listas = JSON.parse(JSON.stringify(listas,null,4));
        this.listaSelecionadaEvento.emit( this.listas[this.indexListaSelecionada] );
      });
    });

  }

  selecionaLista(lista: Lista): void{
    this.indexListaSelecionada= this.listas.indexOf(lista);
    this.listaSelecionadaEvento.emit( this.listas[this.indexListaSelecionada] );
  }
}

/*

id : string;
criadoPor : string;
nomeLista : string;
itens : Item[];*/

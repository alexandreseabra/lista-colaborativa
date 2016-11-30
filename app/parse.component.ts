import { Component } from '@angular/core';

declare var Parse: any;

@Component({
  selector: 'parse',
  template: `
    <div class="panel panel-primary">
      <button (click)='conectaParse()'>TESTA PARSE</button>
    </div>

  `
})
export class ParseComponent {


  conectaParse(): void {


    var TestObject = Parse.Object.extend("Lista");
    var testObject = new TestObject();
    testObject.save(
      {
        criadoPor: "alexandreseabra@gmail.com",
        nomeLista: "Compras 2016-11-12",
        itens: [
          {
            nome: "frango",
            status: "done",
            dtCriacao: new Date("2016-10-26")
          },
          {
            nome: "carne",
            status: "todo",
            dtCriacao: new Date("2016-10-26")
          }
        ]
      }
    ).then(function(object:any) {
      console.log("yay! it worked"+JSON.stringify(object));
    });
  }



}

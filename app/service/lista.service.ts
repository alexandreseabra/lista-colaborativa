/// <reference path="../../node_modules/typescript/lib/lib.es6.d.ts" />

import { Injectable } from '@angular/core';
import { Lista }      from '../model/lista';

import { LISTAS }     from '../mock-areas-de-compartilhamento';

declare var Parse: any;


@Injectable()
export class ListaService{

//  listas: Lista[]=LISTAS;


/*    let ListaParse = Parse.Object.extend("Lista");
    let query = new Parse.Query(ListaParse);
    query.limit(10);
    query.find({
      success: function(results: any){
        console.log("AQUIIIIIIIIIIIIIIIIIIIII");
        console.log(JSON.stringify(results));
      },error: function(error: any) {
        alert("Error: " + error.code + " " + error.message);
      }
    });*/


  getListas(): Promise<Lista[]>{
    /*
   return new Promise(function(resolve, reject){
     let listas: Lista[];
     let ListaParse = Parse.Object.extend("Lista");
     let query = new Parse.Query(ListaParse);
         query.limit(10);
     query.find({
       success: resolve,
       error: reject
     });

   });*/

   let query = new Parse.Query("Lista");
       query.limit(10);
   return query.find();

    //return Promise.resolve(LISTAS);
  }

  getLista(objectId:string): Promise<Lista>{
    let query = new Parse.Query("Lista");
    return query.get(objectId);
  }
}

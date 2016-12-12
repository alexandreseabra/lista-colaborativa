import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }  from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppComponent }  from './app.component';
import { ListaComponent } from './lista.component';
import { ListasComponent } from './listas.component';
import { ParseComponent } from './parse.component';

import { UtilService }    from './util.service';
import { ListaService }    from './service/lista.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'minhasListas',
        component: ListasComponent
      },
      {
        path: 'lista/:id',
        component: ListaComponent
      },
      {
        path: '',
        redirectTo: '/minhasListas',
        pathMatch: 'full'
      }
    ])
  ],
  declarations: [
    AppComponent,
    ListaComponent,
    ListasComponent,
    ParseComponent
    ],
  bootstrap: [ AppComponent ],
  providers: [ UtilService, ListaService ]
})
export class AppModule { }

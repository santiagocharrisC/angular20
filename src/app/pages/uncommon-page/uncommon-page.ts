import { Component, signal } from '@angular/core';
import { Card } from "../../components/card/card";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { timeout } from 'rxjs';

const client1 = {
  name: 'Santiago',
  gender: 'male',
  age: '21',
  address: 'Barranquilla, Colombia'
}
const client2 = {
  name: 'Yoana',
  gender: 'female',
  age: '29',
  address: 'la union, sucre'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [
    Card,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe
  ],
  templateUrl: './uncommon-page.html',
})
export default class UncommonPage {

  // i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  }

  changeClient() {
    if ( this.client() == client1 ) {
      this.client.set(client2)
      return
    }

    this.client.set(client1);
  }

  // i18 Plural
  clientsMap = signal({
    '=0' : 'no tenemos clientes esperando',
    '=1' : 'Tenemos 1 cliente esperando',
    '=2' : 'Tenemos 2 clientes esperando',
    other : 'Tenemos # clientes esperando',
  })

  clients = signal([
    'Mirian',
    'Francisco',
    'Fran',
    'Lucho',
    'Pepe',
    'Zapata',
    'CR7',
  ]);

  deleteClient() {
    this.clients.update(prev => prev.slice(1) );
  }

  // KeyValue Pipe
  profile = {
    name: 'Fran',
    age: 22,
    address: 'Barranquilla, Colombia'
  }

  // Async Pipe
  promiseValue: Promise<string> =  new Promise(( resolve, reject) => {
    setTimeout(() => {
      reject('tenemos un error en la data')
      // resolve('Tenemos data en la promesa.')
      console.log('promesa finalizada')
    },3500)
  })
}

import { Component, signal } from '@angular/core';
import { Card } from "../../components/card/card";
import { I18nPluralPipe, I18nSelectPipe, SlicePipe } from '@angular/common';

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
  imports: [Card, I18nSelectPipe, I18nPluralPipe, SlicePipe],
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

}

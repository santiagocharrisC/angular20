import { Routes } from '@angular/router';

export const routes: Routes = [


  {
    path: 'basic',
    title: 'Pipe Basicos',
    loadComponent: () => import('./pages/basic-page/basic-page'),
  },
  //
  {
    path: 'numbers',
    title: 'Pipe Numbers',
    loadComponent: () => import('./pages/numbers-page/numbers-page'),
  },
  //
  {
    path: 'uncommon',
    title: 'Pipe no tan Uncommon',
    loadComponent: () => import('./pages/uncommon-page/uncommon-page'),
  },
  //
  {
    path: 'custom',
    title: 'Pipe Personalizados',
    loadComponent: () => import('./pages/custom-page/custom-page'),
  },
  //
  {
    path: '**',
    redirectTo: 'basic'
  }



];

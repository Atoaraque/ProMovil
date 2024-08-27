import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutenticacionPage } from './autenticacion.page';

const routes: Routes = [
  {
    path: '',
    component: AutenticacionPage
  },  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recu-password',
    loadChildren: () => import('./recu-password/recu-password.module').then( m => m.RecuPasswordPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutenticacionPageRoutingModule {}

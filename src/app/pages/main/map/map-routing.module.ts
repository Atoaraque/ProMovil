import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { mapPage } from '../map/map.page';

const routes: Routes = [
  {
    path: '',
    component: mapPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class mapPageRoutingModule {}

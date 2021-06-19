import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComexPage } from './comex.page';

const routes: Routes = [
  {
    path: '',
    component: ComexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComexPageRoutingModule {}

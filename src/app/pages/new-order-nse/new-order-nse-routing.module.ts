import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOrderNsePage } from './new-order-nse.page';

const routes: Routes = [
  {
    path: '',
    component: NewOrderNsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOrderNsePageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOrderNsePageRoutingModule } from './new-order-nse-routing.module';

import { NewOrderNsePage } from './new-order-nse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewOrderNsePageRoutingModule
  ],
  declarations: [NewOrderNsePage]
})
export class NewOrderNsePageModule {}

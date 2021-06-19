import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComexPageRoutingModule } from './comex-routing.module';

import { ComexPage } from './comex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComexPageRoutingModule
  ],
  declarations: [ComexPage]
})
export class ComexPageModule {}

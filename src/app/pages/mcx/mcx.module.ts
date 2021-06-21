import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { McxPageRoutingModule } from './mcx-routing.module';

import { McxPage } from './mcx.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, McxPageRoutingModule],
  declarations: [McxPage],
})
export class McxPageModule {}

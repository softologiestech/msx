import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionsComponent } from './positions/positions.component';
import { DealsComponent } from './deals/deals.component';
import { OrdersComponent } from './orders/orders.component';
import { ChartsComponent } from './charts/charts.component';
import { TechnicalComponent } from './technical/technical.component';
import { NewsComponent } from './news/news.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    PositionsComponent,
    DealsComponent,
    OrdersComponent,
    ChartsComponent,
    TechnicalComponent,
    NewsComponent,
  ],
  exports: [
    PositionsComponent,
    DealsComponent,
    OrdersComponent,
    ChartsComponent,
    TechnicalComponent,
    NewsComponent,
  ],
  imports: [CommonModule, IonicModule],
})
export class SharedModule {}

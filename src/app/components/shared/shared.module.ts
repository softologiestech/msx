import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionsComponent } from '../positions/positions.component';
import { DealsComponent } from '../deals/deals.component';
import { OrdersComponent } from '../orders/orders.component';

@NgModule({
  declarations: [PositionsComponent, DealsComponent, OrdersComponent],
  exports: [PositionsComponent, DealsComponent, OrdersComponent],
  imports: [CommonModule],
})
export class SharedModule {}

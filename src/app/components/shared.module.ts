import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionsComponent } from './positions/positions.component';
import { DealsComponent } from './deals/deals.component';
import { OrdersComponent } from './orders/orders.component';
import { ChartsComponent } from './charts/charts.component';
import { TechnicalComponent } from './technical/technical.component';
import { NewsComponent } from './news/news.component';
import { IonicModule } from '@ionic/angular';
import { MonthComponent } from './month/month.component';
import { McxComponent } from './mcx/mcx.component';
import { NseComponent } from './nse/nse.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PositionsComponent,
    DealsComponent,
    OrdersComponent,
    ChartsComponent,
    TechnicalComponent,
    NewsComponent,
    MonthComponent,
    McxComponent,
    NseComponent,
    LoginComponent,
    ProfileComponent,
  ],
  exports: [
    PositionsComponent,
    DealsComponent,
    OrdersComponent,
    ChartsComponent,
    TechnicalComponent,
    NewsComponent,
    MonthComponent,
    McxComponent,
    NseComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule, RouterModule],
})
export class SharedModule {}

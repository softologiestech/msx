import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'quotes',
        loadChildren: () =>
          import('../quotes/quotes.module').then((m) => m.QuotesPageModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('../charts/charts.module').then((m) => m.ChartsPageModule),
      },
      {
        path: 'trade',
        loadChildren: () =>
          import('../trade/trade.module').then((m) => m.TradePageModule),
      },
      {
        path: 'history',
        loadChildren: () =>
          import('../history/history.module').then((m) => m.HistoryPageModule),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('../news/news.module').then((m) => m.NewsPageModule),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('../chat/chat.module').then((m) => m.ChatPageModule),
      },
      {
        path: '',
        redirectTo: 'quotes',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

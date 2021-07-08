import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./pages/add/add.module').then((m) => m.AddPageModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'new-order',
    loadChildren: () =>
      import('./pages/new-order/new-order.module').then(
        (m) => m.NewOrderPageModule
      ),
  },
  {
    path: 'info',
    loadChildren: () =>
      import('./pages/info/info.module').then((m) => m.InfoPageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'mcx',
    loadChildren: () =>
      import('./pages/mcx/mcx.module').then((m) => m.McxPageModule),
  },
  {
    path: 'nse',
    loadChildren: () =>
      import('./pages/nse/nse.module').then((m) => m.NsePageModule),
  },  {
    path: 'comex',
    loadChildren: () => import('./pages/comex/comex.module').then( m => m.ComexPageModule)
  },
  {
    path: 'new-order-nse',
    loadChildren: () => import('./pages/new-order-nse/new-order-nse.module').then( m => m.NewOrderNsePageModule)
  },
  {
    path: 'wallet-transactions',
    loadChildren: () => import('./pages/wallet-transactions/wallet-transactions.module').then( m => m.WalletTransactionsPageModule)
  },
  {
    path: 'deposits',
    loadChildren: () => import('./pages/deposits/deposits.module').then( m => m.DepositsPageModule)
  },
  {
    path: 'withdrawals',
    loadChildren: () => import('./pages/withdrawals/withdrawals.module').then( m => m.WithdrawalsPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

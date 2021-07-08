import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.page.html',
  styleUrls: ['./wallet-transactions.page.scss'],
})
export class WalletTransactionsPage implements OnInit {
  pages: any = [
    {
      name: 'Deposits',
      url: '/deposits',
    },
    {
      name: 'Withdrawals',
      url: '/withdrawals',
    },
  ];

  constructor() {}

  ngOnInit() {}
}

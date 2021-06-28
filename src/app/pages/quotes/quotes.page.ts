import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {
  exchange: string = 'mcx';
  exchanges: any = ['mcx', 'nse'];

  constructor() {}

  ngOnInit() {}

  getExchange() {
    console.log(this.exchange);
  }
}

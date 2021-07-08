import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {
  id: string = localStorage.getItem('id');
  exchange: string = 'mcx';
  exchanges: any = ['mcx', 'nse'];

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.id = localStorage.getItem('id');
    }, 500);
  }

  getExchange() {
    // console.log(this.exchange);
  }
}

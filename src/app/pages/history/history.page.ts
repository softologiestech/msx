import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  values: Array<String> = ['positions', 'orders', 'deals'];
  iValue: string = 'positions';

  constructor() {}

  ngOnInit() {}

  segmentChanged(e) {
    this.values;
  }
}

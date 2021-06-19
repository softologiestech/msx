import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnInit {
  months: Array<any> = [];
  date: number;

  constructor() {
    var now = new Date();
    for (let i = 0; i < 5; i++) {
      this.months.push(now.getMonth() + i);
    }

    console.log(this.months);
  }

  ngOnInit() {}
}

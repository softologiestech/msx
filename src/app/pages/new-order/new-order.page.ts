import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {
  info: any = {};
  counter: number = 1;
  sl: number = 0;
  tp: number = 0;
  deviation: number = 0;

  constructor(private router: Router) {
    this.info = this.router.getCurrentNavigation().extras.state;
    // console.log(this.info);
  }

  ngOnInit() {}

  add(n: number) {
    this.counter = this.counter + n;
  }

  subtract(n: number) {
    if (this.counter !== 1) this.counter = this.counter - n;

    return;
  }

  addSL() {
    this.sl += 1;
  }

  addTP() {
    this.tp += 1;
  }

  addDeviation() {
    this.deviation += 1;
  }

  subtractSL() {
    this.sl -= 1;
  }

  subtractTP() {
    this.tp -= 1;
  }

  subtractDeviation() {
    this.deviation -= 1;
  }
}

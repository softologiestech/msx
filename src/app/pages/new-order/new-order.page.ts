import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {
  info: any = {};
  newData: any = [];
  serverData: any = {};
  counter: number = 1;
  sl: number = 0;
  tp: number = 0;
  deviation: number = 0;

  constructor(private http: HTTP, private router: Router) {
    this.info = this.router.getCurrentNavigation().extras.state;
    // console.log(this.info);
  }

  ngOnInit() {
    setInterval(() => {
      this.fetchData();
    }, 500);
  }

  fetchData() {
    this.http
      .get(
        'https://api.datakick.in/REST/softRatesJSON.php?API_Key=12bb3d7a3db3ce6acd79ac08ad01a84b',
        {},
        {}
      )
      .then((res: any) => {
        var data = JSON.parse(res.data);
        this.serverData = data.rows;

        Object.entries(this.serverData).forEach((key) => {
          if (key[0] === this.info.key) {
            this.newData = key[1];
            // console.log(this.newData.buy, this.newData.sell);
          }
        });
      });
  }

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

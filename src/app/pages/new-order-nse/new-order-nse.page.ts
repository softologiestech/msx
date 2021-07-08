import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-order-nse',
  templateUrl: './new-order-nse.page.html',
  styleUrls: ['./new-order-nse.page.scss'],
})
export class NewOrderNsePage implements OnInit {
  info: any = {};
  userData: any = {};
  id: string = localStorage.getItem('id');
  equity: number = parseInt(localStorage.getItem('equity'));
  margin: number = parseInt(localStorage.getItem('margin'));
  free_margin: number = parseInt(localStorage.getItem('free_margin'));
  newData: any = [];
  serverData: any = {};
  counter: number = 1;
  sl: number = 0;
  tp: number = 0;
  // deviation: number = 0;

  constructor(
    private router: Router,
    private dataService: DataService,
    private db: AngularFirestore,
    private toastController: ToastController
  ) {
    this.info = this.router.getCurrentNavigation().extras.state;
    // console.log(this.info);
  }

  ngOnInit() {
    if (this.id) {
      this.db
        .doc(`user/${this.id}`)
        .valueChanges()
        .subscribe((data: any) => {
          this.userData = data;

          // console.log(this.userData);
        });
    }

    setInterval(() => {
      this.fetchData();
    }, 500);
  }

  fetchData() {
    this.dataService.nseData().then((res: any) => {
      // console.log(res);
      var data = JSON.parse(res.data);
      this.serverData = data.rows;

      Object.entries(this.serverData).forEach((key) => {
        // console.log(key[1]['symbol']);

        if (
          key[1]['symbol'] === this.info.value.symbol &&
          key[1]['expiry_date'] === this.info.value.expiry_date
        ) {
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

  // addDeviation() {
  //   this.deviation += 1;
  // }

  subtractSL() {
    this.sl -= 1;
  }

  subtractTP() {
    this.tp -= 1;
  }

  // subtractDeviation() {
  //   this.deviation -= 1;
  // }

  buy(info: any) {
    // console.log(info);
    var buy_cost = info.value.margin * this.counter;

    if (this.sl >= info.value.buy - info.value.sl)
      this.presentToast(`SL can't be less than ${info.value.sl} points`);
    else {
      if (this.free_margin >= buy_cost) {
        var transactionId = Math.random().toString(36).slice(-12);

        this.db
          .doc(`user/${this.id}`)
          .collection('buy_transaction')
          .doc(transactionId)
          .set({
            symbol: info.value.symbol,
            expiry_date: info.value.expiry_date,
            buy: info.value.buy,
            buy_cost,
            margin: info.value.margin,
            commission: info.value.commission,
            quantity: this.counter,
            lot_size: info.value.lot_size,
            type: 'nse',
            trade: 'buy',
            sl: this.sl,
            tp: this.tp,
            at: Date(),
            transactionId,
          })
          .then(() => {
            // this.db.doc(`user/${this.id}`).update({
            //   amountInWallet:
            //     this.userData.amountInWallet -
            //     this.counter * info.value.buy * info.value.lot_size,
            //   // buy_quantity: this.counter,
            // });

            this.margin += info.value.margin;
            this.free_margin = this.equity - this.margin;

            localStorage.setItem('margin', this.margin.toString());
            localStorage.setItem('free_margin', this.free_margin.toString());

            this.router.navigate(['/']);
          })
          .catch((err) => console.log(err));
      } else this.presentToast('You do not have sufficient funds.');
    }
  }

  sell(info: any) {
    var sell_cost = info.value.margin * this.counter;

    if (this.sl >= info.value.buy - info.value.sl)
      this.presentToast(`SL can't be less than ${info.value.sl} points`);
    else {
      if (this.free_margin >= sell_cost) {
        var transactionId = Math.random().toString(36).slice(-12);

        this.db
          .doc(`user/${this.id}`)
          .collection('sell_transaction')
          .doc(transactionId)
          .set({
            sell: info.value.sell,
            symbol: info.value.symbol,
            expiry_date: info.value.expiry_date,
            sell_cost,
            margin: info.value.margin,
            commission: info.value.commission,
            quantity: this.counter,
            lot_size: info.value.lot_size,
            type: 'nse',
            trade: 'sell',
            sl: this.sl,
            tp: this.tp,
            at: Date(),
            transactionId,
          })
          .then(() => {
            // this.db.doc(`user/${this.id}`).update({
            //   amountInWallet:
            //     this.userData.amountInWallet +
            //     this.counter * info.value.sell * info.value.lot_size,
            //   // sell_quantity: this.counter,
            // });

            this.margin += info.value.margin;
            this.free_margin = this.equity - this.margin;

            localStorage.setItem('margin', this.margin.toString());
            localStorage.setItem('free_margin', this.free_margin.toString());

            this.router.navigate(['/']);
          })
          .catch((err) => console.log(err));
      } else this.presentToast('You do not have sufficient funds.');
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }
}

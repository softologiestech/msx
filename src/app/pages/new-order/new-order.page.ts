import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IonNav, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {
  info: any = {};
  userData: any = {};
  id: string = localStorage.getItem('id');
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
    console.log(this.info);
  }

  ngOnInit() {
    if (this.id) {
      this.db
        .doc(`user/${this.id}`)
        .valueChanges()
        .subscribe((data: any) => {
          this.userData = data;

          console.log(this.userData);
        });
    }

    setInterval(() => {
      this.fetchData();
    }, 500);
  }

  fetchData() {
    this.dataService.mcxData().then((res: any) => {
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
    if (this.sl >= info.value.buy - 70)
      this.presentToast("SL can't be less than 70 points");
    else if (this.tp <= info.value.buy + 70)
      this.presentToast("TP can't be less than 70 points");
    else {
      if (this.userData.amountInWallet >= info.value.buy) {
        var transactionId = Math.random().toString(36).slice(-12);

        this.db
          .doc(`user/${this.id}`)
          .collection('buy_transaction')
          .doc(transactionId)
          .set({
            symbol: info.value.symbol,
            expiry_date: info.value.expiry_date,
            buy: info.value.buy,
            buy_cost: info.value.buy * this.counter * info.value.lot_size,
            quantity: this.counter,
            lot_size: info.value.lot_size,
            sl: this.sl,
            tp: this.tp,
            transactionId,
          })
          .then(() => {
            this.db.doc(`user/${this.id}`).update({
              amountInWallet:
                this.userData.amountInWallet -
                this.counter * info.value.buy * info.value.lot_size,
              buy_quantity: this.counter,
            });

            this.router.navigate(['/']);
          })
          .catch((err) => console.log(err));
      } else this.presentToast('You do not have sufficient funds.');
    }
  }

  sell(info: any) {
    if (this.sl >= info.value.buy - 70)
      this.presentToast("SL can't be less than 70 points");
    else if (this.tp <= info.value.buy + 70)
      this.presentToast("TP can't be less than 70 points");
    else {
      if (this.userData.amountInWallet >= info.value.buy) {
        var transactionId = Math.random().toString(36).slice(-12);

        this.db
          .doc(`user/${this.id}`)
          .collection('sell_transaction')
          .doc(transactionId)
          .set({
            sell: info.value.sell,
            symbol: info.value.symbol,
            expiry_date: info.value.expiry_date,
            sell_cost: info.value.sell * this.counter * info.value.lot_size,
            quantity: this.counter,
            lot_size: info.value.lot_size,
            sl: this.sl,
            tp: this.tp,
            transactionId,
          })
          .then(() => {
            this.db.doc(`user/${this.id}`).update({
              amountInWallet:
                this.userData.amountInWallet +
                this.counter * info.value.sell * info.value.lot_size,
              sell_quantity: this.counter,
            });

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

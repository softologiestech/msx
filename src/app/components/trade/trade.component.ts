import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PopoverController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
})
export class TradeComponent implements OnInit {
  @Input() data: any;
  id: string = localStorage.getItem('id');
  serverData: Array<any> = [];
  tradeData: any;
  userData: any = {};

  constructor(
    private dataService: DataService,
    private db: AngularFirestore,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    // console.log(this.data);

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
      this.id = localStorage.getItem('id');
      this.fetchData();
    }, 500);
  }

  fetchData() {
    if (this.data.type === 'mcx')
      this.dataService.mcxData().then((res: any) => {
        var data1 = JSON.parse(res.data);
        this.serverData = data1.rows;

        // console.log(this.serverData);

        this.tradeData = {};

        for (var key in this.serverData) {
          if (
            this.data.symbol === this.serverData[key].symbol &&
            this.data.expiry_date === this.serverData[key].expiry_date
          ) {
            this.tradeData = this.serverData[key];
            // console.log(this.tradeData);
          }
        }
      });
    else if (this.data.type === 'nse')
      this.dataService.nseData().then((res: any) => {
        var data1 = JSON.parse(res.data);
        this.serverData = data1.rows;

        // console.log(this.serverData);

        this.tradeData = {};

        for (var key in this.serverData) {
          if (
            this.data.symbol === this.serverData[key].symbol &&
            this.data.expiry_date === this.serverData[key].expiry_date
          ) {
            this.tradeData = this.serverData[key];
            // console.log(this.tradeData);
          }
        }
      });
  }

  buy(data: any, tradeData: any) {
    // console.log(data);

    var commission =
      (this.userData.mcx_commission / 100) *
      data.lot_size *
      tradeData.buy *
      data.quantity;

    // console.log(commission);

    this.db
      .doc(`user/${this.id}`)
      .collection('history')
      .doc(data.transactionId)
      .set({
        buy: tradeData.buy,
        sell: data.sell,
        symbol: tradeData.symbol,
        expiry_date: tradeData.expiry_date,
        buy_cost: tradeData.buy * data.quantity * data.lot_size,
        quantity: data.quantity,
        lot_size: data.lot_size,
        commission,
        type: 'buy',
        sl: data.sl,
        tp: data.tp,
        at: Date(),
        transactionId: data.transactionId,
      })
      .then(() => {
        this.db
          .doc(`user/${this.id}`)
          .collection('sell_transaction')
          .doc(data.transactionId)
          .delete();

        this.db.doc(`user/${this.id}`).update({
          amountInWallet:
            this.userData.amountInWallet +
            data.quantity * tradeData.buy * data.lot_size,
          // sell_quantity: data.quantity,
        });

        this.popoverController.dismiss();
        // this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
        this.popoverController.dismiss();
      });
  }

  sell(data: any, tradeData: any) {
    // console.log(data);

    var commission =
      (this.userData.mcx_commission / 100) *
      data.lot_size *
      tradeData.sell *
      data.quantity;

    // console.log(commission);

    this.db
      .doc(`user/${this.id}`)
      .collection('history')
      .doc(data.transactionId)
      .set({
        buy: data.buy,
        sell: tradeData.sell,
        symbol: tradeData.symbol,
        expiry_date: tradeData.expiry_date,
        sell_cost: tradeData.sell * data.quantity * data.lot_size,
        quantity: data.quantity,
        lot_size: data.lot_size,
        commission,
        type: 'sell',
        sl: data.sl,
        tp: data.tp,
        at: Date(),
        transactionId: data.transactionId,
      })
      .then(() => {
        this.db
          .doc(`user/${this.id}`)
          .collection('buy_transaction')
          .doc(data.transactionId)
          .delete();

        this.db.doc(`user/${this.id}`).update({
          amountInWallet:
            this.userData.amountInWallet +
            data.quantity * tradeData.sell * data.lot_size,
          // sell_quantity: data.quantity,
        });

        this.popoverController.dismiss();
        // this.router.navigate(['/']);
      })
      .catch((err) => {
        console.log(err);
        this.popoverController.dismiss();
      });
  }
}

import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TradeComponent } from 'src/app/components/trade/trade.component';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.page.html',
  styleUrls: ['./trade.page.scss'],
})
export class TradePage implements OnInit {
  id: string = localStorage.getItem('id');
  userData: any = {};
  buyDetails: Array<any> = [];
  sellDetails: Array<any> = [];
  mcxData: Array<any> = [];
  nseData: Array<any> = [];
  mcxArray: Array<any> = [];
  mcxFilterArray: Array<any> = [];
  nseArray: Array<any> = [];
  nseFilterArray: Array<any> = [];
  equity: number;
  margin: number;
  net: number = 0;
  free_margin: number;
  prft_loss: number;

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private walletService: WalletService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.userService.getUserData(this.id).subscribe((res) => {
      this.userData = res;
    });

    this.getBuyDetails();

    setInterval(() => {
      this.equity = parseInt(localStorage.getItem('equity'));
      this.margin = parseInt(localStorage.getItem('margin'));
      this.free_margin = parseInt(localStorage.getItem('free_margin'));

      this.getMcxData();
      this.filterData();
      this.pAndL();

      localStorage.setItem('net', this.net.toString());
    }, 500);
  }

  getBuyDetails() {
    this.walletService
      .getBuyDetails(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        this.buyDetails = res;
        // console.log(this.buyDetails);
      });
  }

  getMcxData() {
    this.dataService.mcxData().then((res: any) => {
      var data = JSON.parse(res.data);
      this.mcxArray = data.rows;

      // console.log(this.mcxArray);
    });
  }

  filterData() {
    // console.log(this.userData);
    this.mcxFilterArray = [];
    this.nseFilterArray = [];

    for (var k in this.buyDetails) {
      // console.log(this.buyDetails[k].type);

      if (this.buyDetails[k].type === 'mcx') {
        for (var j in this.mcxArray) {
          if (
            this.buyDetails[k].symbol === this.mcxArray[j].symbol &&
            this.buyDetails[k].expiry_date === this.mcxArray[j].expiry_date
          ) {
            this.mcxFilterArray.push({
              symbol: this.mcxArray[j].symbol,
              current_buy: this.mcxArray[j].buy,
              current_sell: this.mcxArray[j].sell,
              expiry_date: this.mcxArray[j].expiry_date,
              buy: this.buyDetails[k].buy,
              sell: this.buyDetails[k].sell,
              quantity: this.buyDetails[k].quantity,
              lot_size: this.buyDetails[k].lot_size,
            });

            // console.log(this.mcxFilterArray);
          }
        }
      }
    }
  }

  pAndL() {
    var profit,
      loss,
      tempProf,
      tempLoss,
      finalProf: number = 0,
      finalLoss: number = 0;

    for (var k in this.mcxFilterArray) {
      // console.log(this.mcxFilterArray[k]);

      if (this.mcxFilterArray[k].buy < this.mcxFilterArray[k].current_sell) {
        profit =
          parseInt(this.mcxFilterArray[k].current_sell) -
          parseInt(this.mcxFilterArray[k].buy);

        // console.log(
        //   `${this.mcxFilterArray[k].symbol} profit`,
        //   profit *
        //     this.mcxFilterArray[k].lot_size *
        //     this.mcxFilterArray[k].quantity
        // );

        tempProf =
          profit *
          this.mcxFilterArray[k].lot_size *
          this.mcxFilterArray[k].quantity;

        finalProf += parseInt(tempProf);
      } else if (
        this.mcxFilterArray[k].buy > this.mcxFilterArray[k].current_sell
      ) {
        loss =
          parseInt(this.mcxFilterArray[k].current_sell) -
          parseInt(this.mcxFilterArray[k].buy);

        // console.log(
        //   `${this.mcxFilterArray[k].symbol} loss`,
        //   -loss *
        //     this.mcxFilterArray[k].lot_size *
        //     this.mcxFilterArray[k].quantity
        // );

        tempLoss =
          -loss *
          this.mcxFilterArray[k].lot_size *
          this.mcxFilterArray[k].quantity;

        finalLoss = parseInt(tempLoss);
      }
    }
    // console.log('finalProf', finalProf);
    // console.log('finalLoss', finalLoss);

    this.net = finalProf - finalLoss;

    // console.log(net);
  }

  itemHeightFn(item, index) {
    return 130;
  }

  async openTrade(ev: any, data: any) {
    // console.log(data);
    const popover = await this.popoverController.create({
      component: TradeComponent,
      componentProps: { data: data },
      event: ev,
      translucent: false,
    });

    await popover.present();
  }
}

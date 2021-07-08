import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { WalletService } from 'src/app/services/wallet.service';
import { TradeComponent } from '../trade/trade.component';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
})
export class PositionsComponent implements OnInit {
  id: string = localStorage.getItem('id');
  buyDetails: Array<any> = [];
  sellDetails: Array<any> = [];

  constructor(
    private walletService: WalletService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.id = localStorage.getItem('id');
    }, 1000);

    this.walletService
      .getBuyDetails(this.id)
      .valueChanges()
      .subscribe((data) => {
        this.buyDetails = data;

        console.log(this.buyDetails);
      });

    this.walletService
      .getSellDetails(this.id)
      .valueChanges()
      .subscribe((data) => {
        this.sellDetails = data;

        // console.log(this.sellDetails);
      });
  }

  itemHeightFn(item, index) {
    return 150;
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

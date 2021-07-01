import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
})
export class PositionsComponent implements OnInit {
  id: string = localStorage.getItem('id');
  buyDetails: Array<any> = [];

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.walletService
      .getBuyDetails(this.id)
      .valueChanges()
      .subscribe((data) => {
        this.buyDetails = data;

        console.log(this.buyDetails);
      });
  }

  itemHeightFn(item, index) {
    return 180;
  }
}

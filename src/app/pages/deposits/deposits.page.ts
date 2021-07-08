import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.page.html',
  styleUrls: ['./deposits.page.scss'],
})
export class DepositsPage implements OnInit {
  id: string = localStorage.getItem('id');
  deposits: Array<any> = [];

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.depositDetails();
  }

  depositDetails() {
    this.walletService
      .getDepositDetails(this.id)
      .valueChanges()
      .subscribe((res) => {
        this.deposits = res;
        // console.log(res);
      });
  }
}

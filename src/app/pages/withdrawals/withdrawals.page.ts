import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.page.html',
  styleUrls: ['./withdrawals.page.scss'],
})
export class WithdrawalsPage implements OnInit {
  id: string = localStorage.getItem('id');
  withdrawals: Array<any> = [];

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.depositDetails();
  }

  depositDetails() {
    this.walletService
      .getWithdrawalDetails(this.id)
      .valueChanges()
      .subscribe((res) => {
        this.withdrawals = res;
        // console.log(res);
      });
  }
}

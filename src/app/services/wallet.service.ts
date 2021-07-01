import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private db: AngularFirestore) {}

  getBuyDetails(id: string) {
    return this.db.doc(`user/${id}`).collection('buy_transaction');
  }

  getSellDetails(id: string) {
    return this.db.doc(`user/${id}`).collection('sell_transaction');
  }
}

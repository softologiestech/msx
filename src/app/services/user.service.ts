import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  getUserData(id: string) {
    return this.db.doc(`user/${id}`).valueChanges();
  }

  getUserMargins(id: string) {
    return this.db.doc(`user/${id}`).collection('margin').valueChanges();
  }
}

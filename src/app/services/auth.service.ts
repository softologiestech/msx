import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.authState.subscribe((data) => {
      if (data) {
        this.user = data;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.clear();
      }

      // console.log(this.user);
    });
  }

  logout() {
    this.afAuth.signOut();
    localStorage.clear();
  }

  async sendVerificationMail() {
    (await this.afAuth.currentUser)
      .sendEmailVerification()
      .then(() => console.log('Verifiation Maoil Sent'));
  }

  recoverPassword(email: string) {
    this.afAuth
      .sendPasswordResetEmail(email)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  isLoggedIn() {
    const user = localStorage.getItem('user');
    return user !== null ? true : false;
  }
}

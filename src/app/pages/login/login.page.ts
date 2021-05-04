import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  login() {
    this.loadingSpinner();
    this.afAuth
      .signInWithEmailAndPassword(this.email, this.password)
      .then((data) => {
        this.router.navigate(['tabs/chat']);

        this.loadingCtrl.dismiss();
      })
      .catch((err) => console.log(err));
  }

  loginGoogle() {
    this.afAuth
      .signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
      .then((data) => {
        this.router.navigate(['tabs/chat']);

        // console.log(data);
      })
      .catch((err) => console.log(err));
  }

  async loadingSpinner() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      message: 'Loggin In',
      translucent: true,
      backdropDismiss: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }
}

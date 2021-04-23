import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  passErr: boolean = false;
  err: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private validator: ValidatorsService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  createAccount() {
    if (this.password.length < 6) {
      this.passErr = true;
      return;
    }

    if (this.validator.validateEmail(this.email)) {
      this.loadingSpinner();

      this.afAuth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.db.doc(`users/${data.user.uid}`).set({
            email: this.email,
            uid: data.user.uid,
          });

          this.router.navigate(['tabs/chat']);
          this.loadingCtrl.dismiss();

          // console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      this.err = true;
    }
  }

  async loadingSpinner() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      message: 'Creating User',
      translucent: true,
      backdropDismiss: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }
}

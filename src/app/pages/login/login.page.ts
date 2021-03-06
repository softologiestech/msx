import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import * as firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  loginData: any = [];
  sub: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }

  login() {
    if (this.username !== '' && this.password != '') {
      this.loadingSpinner();

      this.sub = this.authService
        .findData('user', this.username)
        .valueChanges()
        .subscribe((doc: any) => {
          this.loginData = doc;
          // console.log(this.loginData[0]);

          this.authService
            .login(doc[0].email, this.password)
            .then((data) => {
              console.log(data.user);
              localStorage.setItem('uid', data.user.uid);
              localStorage.setItem('type', doc[0].type);
              localStorage.setItem('id', doc[0].id);

              this.loadingCtrl.dismiss();
              this.router.navigate(['/profile']);
            })
            .catch((err) => {
              console.log(err);
              this.loadingCtrl.dismiss();
            });
        });
    }
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

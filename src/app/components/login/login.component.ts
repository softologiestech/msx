import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
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
              localStorage.setItem('id', doc[0].id);

              this.loadingCtrl.dismiss();
              this.router.navigate(['/tabs/person']);
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

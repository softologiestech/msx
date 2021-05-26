import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {
  serverData: any = [];

  constructor(private http: HTTP, private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      this.fetchData();
    }, 500);
  }

  fetchData() {
    this.http
      .get(
        'https://skymcx.in/softRatesJSON1.php?API_Key=12bb3d7a3db3ce6acd79ac08ad01a84b',
        {},
        {}
      )
      .then((res: any) => {
        this.serverData = JSON.parse(res.data);

        // console.log(this.serverData.data);
      });
  }

  newOrder(data: any) {
    this.router.navigate(['/new-order'], {
      state: data,
    });
  }

  info(data: any) {
    this.router.navigate(['/info'], {
      state: data,
    });
  }

  // async openBottomSheet(data: any) {
  //   const actionSheet = await this.asCtrl.create({
  //     header: data.key,
  //     cssClass: 'bottomSheet',
  //     buttons: [
  //       {
  //         text: 'New Order',
  //         handler: () => {
  //           this.router.navigate(['/new-order'], {
  //             state: data,
  //           });
  //         },
  //       },
  //       {
  //         text: 'Chart',
  //         handler: () => {
  //           console.log('Chart clicked');
  //         },
  //       },
  //       {
  //         text: 'Properties',
  //         handler: () => {
  //           console.log('Properties clicked');
  //         },
  //       },
  //       {
  //         text: 'Depth of Market',
  //         handler: () => {
  //           console.log('Depth of Market clicked');
  //         },
  //       },
  //       {
  //         text: 'Market Statistics',
  //         handler: () => {
  //           console.log('Market Statistics clicked');
  //         },
  //       },
  //       {
  //         text: 'Simple View Mode',
  //         handler: () => {
  //           console.log('Simple View Mode clicked');
  //         },
  //       },
  //     ],
  //   });
  //   await actionSheet.present();

  //   const { role } = await actionSheet.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }
}

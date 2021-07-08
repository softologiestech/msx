import { Component, OnInit } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;

  constructor(private bgMode: BackgroundMode) {
    this.sideMenu();
  }

  // ngOnInit() {
  //   this.bgMode.enable();
  // }

  sideMenu() {
    this.navigate = [
      {
        title: 'Quotes',
        url: 'tabs/quotes',
        icon: 'analytics-outline',
      },
      // {
      //   title: 'Charts',
      //   url: 'tabs/charts',
      //   icon: 'stats-chart-outline',
      // },
      {
        title: 'Trade',
        url: 'tabs/trade',
        icon: 'card-outline',
      },
      {
        title: 'History',
        url: 'tabs/history',
        icon: 'file-tray-outline',
      },
      // {
      //   title: 'News',
      //   url: 'tabs/news',
      //   icon: 'newspaper-outline',
      // },
      {
        title: 'Profile',
        url: 'tabs/person',
        icon: 'chatbubble-ellipses-outline',
      },
      {
        title: 'Settings',
        url: 'settings',
        icon: 'settings-outline',
      },
      {
        title: 'About',
        url: 'about',
        icon: 'information-circle-outline',
      },
    ];
  }
}

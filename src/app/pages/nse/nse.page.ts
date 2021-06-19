import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-nse',
  templateUrl: './nse.page.html',
  styleUrls: ['./nse.page.scss'],
})
export class NsePage implements OnInit {
  serverData: any = [];

  constructor(private http: HTTP, private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      this.fetchData();
    }, 500);
  }

  itemHeightFn(item, index) {
    return 110;
  }

  fetchData() {
    this.http
      .get(
        'https://api.datakick.in/NSE/ohlc?API_Key=f4f5f600e9f5610&m=FEDERALBNK/BAJAJELEC/ESSARSHPNG',
        {},
        {}
      )
      .then((res: any) => {
        var data = JSON.parse(res.data);
        this.serverData = data.data;

        // console.log(this.serverData);
      });
  }
}

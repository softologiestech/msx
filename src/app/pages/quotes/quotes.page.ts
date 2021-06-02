import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {
  serverData: any = [];

  constructor(private http: HTTP, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setInterval(() => {
      this.fetchData();
    }, 500);
  }

  fetchData() {
    this.http
      .get(
        'https://api.datakick.in/REST/softRatesJSON.php?API_Key=12bb3d7a3db3ce6acd79ac08ad01a84b',
        {},
        {}
      )
      .then((res: any) => {
        var data = JSON.parse(res.data);
        this.serverData = data.rows;

        // console.log(this.serverData);
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
}

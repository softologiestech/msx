import { Component, Input, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  @Input() data: any = {};
  serverData: any = {};
  newData: any = [];

  constructor(private http: HTTP) {}

  ngOnInit() {
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

        Object.entries(this.serverData).forEach((key) => {
          if (key[0] === this.data.key) {
            this.newData = key[1];
            // console.log(this.newData.last_price);
          }
        });
      });
  }

  ngAfterContentInit() {
    console.log(this.data);
  }
}

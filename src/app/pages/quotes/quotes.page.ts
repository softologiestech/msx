import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataWsService } from 'src/app/services/data-ws.service';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss'],
})
export class QuotesPage implements OnInit {
  serverData = [];

  constructor(private ds: DataWsService, private http: HTTP) {
    // this.ds.testwebsocket();

    this.fetchData();
  }

  ngOnInit() {}

  fetchData() {
    this.http
      .get('https://skymcx.in/API_JSON_Demo4.php', {}, {})
      .then((res) => {
        this.serverData = JSON.parse(res.data);
        console.log(this.serverData);
        // console.log(JSON.parse(res.data));
      });
  }
}

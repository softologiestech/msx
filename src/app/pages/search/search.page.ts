import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  pages: any = [
    {
      name: 'mcx',
      url: '/mcx',
    },
    {
      name: 'nse',
      url: '/nse',
    },
    {
      name: 'comex',
      url: '/comex',
    },
  ];

  constructor() {}

  ngOnInit() {}
}

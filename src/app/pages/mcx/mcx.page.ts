import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mcx',
  templateUrl: './mcx.page.html',
  styleUrls: ['./mcx.page.scss'],
})
export class McxPage implements OnInit {
  serverData: Array<object> = [];
  date: number;
  searchItems: any = [];
  data: any = [];
  month: string = '';
  months: Array<any> = [];
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.date = Date.now();

    var now = new Date();
    for (let i = 0; i < 3; i++) {
      this.months.push(this.monthNames[now.getMonth() + i]);
    }

    setInterval(() => {
      this.fetchData();
    }, 500);
  }

  getMonth() {
    this.data = [];

    console.log(this.month);

    for (var key in this.serverData) {
      var arr = this.serverData[key]['expiry_date'].split('-');
      var month_index = parseInt(arr[1], 10) - 1;

      // console.log(this.monthNames[month_index]);

      if (this.monthNames[month_index] === this.month) {
        this.data.push(this.serverData[key]);
        // console.log(this.data);
      }
    }
  }

  itemHeightFn(item, index) {
    return 180;
  }

  fetchData() {
    this.dataService.mcxData().then((res: any) => {
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

  addSymbol(data: any) {
    if (localStorage.getItem(data.key)) return;
    else {
      localStorage.setItem(data.key, JSON.stringify(data));
      console.log(data.key);
    }
  }
}

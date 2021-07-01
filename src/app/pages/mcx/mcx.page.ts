import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mcx',
  templateUrl: './mcx.page.html',
  styleUrls: ['./mcx.page.scss'],
})
export class McxPage implements OnInit {
  @ViewChild('search') search: any;

  serverData: Array<object> = [];
  date: number;
  symbol: string = '';
  searchItems: any = [];
  symbolData: Array<any> = [];
  data: any = [];
  mcxArray: Array<any> = [];
  expiry: Array<any> = [];
  expiry_date: string = '';
  allSymbols: any = [];
  // months: Array<any> = [];
  // monthNames = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];
  isSymbolAvailable = false;
  displaySymbols: any = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    // this.date = Date.now();

    // var now = new Date();
    // for (let i = 0; i < 3; i++) {
    //   this.months.push(this.monthNames[now.getMonth() + i]);
    // }

    setInterval(() => {
      this.fetchData();

      this.searchSymbol();
    }, 500);
  }

  getSymbols() {
    for (var key in this.serverData) {
      if (!this.allSymbols.includes(this.serverData[key]['symbol'])) {
        this.allSymbols.push(this.serverData[key]['symbol']);
      }
    }

    // console.log(this.allSymbols);
  }

  // getMonth() {
  //   this.data = [];

  //   // console.log(this.month);

  //   for (var key in this.serverData) {
  //     var arr = this.serverData[key]['expiry_date'].split('-');
  //     var month_index = parseInt(arr[1], 10) - 1;

  //     // console.log(this.monthNames[month_index]);

  //     if (this.monthNames[month_index] === this.month) {
  //       this.data.push(this.serverData[key]);
  //       // console.log(this.data);
  //     }
  //   }
  // }

  itemHeightFn(item, index) {
    return 180;
  }

  fetchData() {
    this.allSymbols = [];

    this.dataService.mcxData().then((res: any) => {
      var data = JSON.parse(res.data);
      this.serverData = data.rows;

      // console.log(this.serverData);
      this.getSymbols();
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
    if (this.mcxArray.includes(data)) {
      console.log(this.mcxArray);
      return;
    } else {
      this.mcxArray.push(data);

      localStorage.setItem('mcxArray', JSON.stringify(this.mcxArray));
      console.log(this.mcxArray);
    }
  }

  searchSymbol() {
    this.symbolData = [];
    this.expiry = [];

    for (var key in this.serverData) {
      if (
        this.serverData[key]['symbol'].toLowerCase().trim() ===
          this.symbol.toLowerCase() &&
        this.symbol !== ''
      ) {
        this.symbolData.push(this.serverData[key]);
        if (
          this.symbol.toLowerCase() ===
          this.serverData[key]['symbol'].toLowerCase().trim()
        )
          this.expiry.push(this.serverData[key]['expiry_date']);
      }
    }

    // console.log(this.expiry);
  }

  getExpiry(expiry_date: string) {
    // console.log(expiry_date);

    for (var key in this.symbolData) {
      if (this.symbolData[key]['expiry_date'] === expiry_date) {
        console.log(this.symbolData[key]);
      }
      // console.log(this.symbolData[key]['expiry_date']);
    }
  }

  showSymbol() {
    this.displaySymbols = [];
    this.isSymbolAvailable = true;

    for (let i = 0; i < this.allSymbols.length; i++) {
      if (
        this.allSymbols[i].toLowerCase().trim().includes(this.symbol) &&
        this.symbol !== ''
      ) {
        this.displaySymbols.push(this.allSymbols[i]);
        // console.log(this.displaySymbols);
      }
    }
  }

  selectItem(s: string) {
    this.symbol = s;
    this.search.setFocus();
  }
}

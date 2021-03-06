import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-nse',
  templateUrl: './nse.page.html',
  styleUrls: ['./nse.page.scss'],
})
export class NsePage implements OnInit {
  @ViewChild('search') search: any;

  serverData: Array<object> = [];
  date: number;
  symbol: string = '';
  searchItems: any = [];
  symbolData: any = [];
  data: any = [];
  expiry_date: string = '';
  expiry: Array<any> = [];
  nseArray: Array<any> = [];
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
    this.date = Date.now();

    // var now = new Date();
    // for (let i = 0; i < 3; i++) {
    //   this.months.push(this.monthNames[now.getMonth() + i]);
    // }

    setInterval(() => {
      this.fetchData();

      this.searchSymbol();

      if (JSON.parse(localStorage.getItem('nseArray')))
        this.nseArray = JSON.parse(localStorage.getItem('nseArray'));
      else this.nseArray = [];

      this.removeSymbol();
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
    return 170;
  }

  fetchData() {
    this.allSymbols = [];

    this.dataService.nseData().then((res: any) => {
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

  addSymbol(data: any, i: number) {
    // if (this.nseArray.length !== 0) {
    //   for (var key in this.nseArray) {
    //     // console.log(this.nseArray);

    //     if (
    //       this.nseArray[key].value.symbol === data.value.symbol &&
    //       this.nseArray[key].value.expiry_date === data.value.expiry_date
    //     ) {
    //       console.log('includes');
    //       return;
    //     }
    //   }
    // }

    this.nseArray.push(data);

    localStorage.setItem('nseArray', JSON.stringify(this.nseArray));
    // console.log(this.mcxArray);

    // this.symbolData.splice(i, 1);
    // console.log(this.symbolData);
  }

  searchSymbol() {
    this.symbolData = [];
    this.expiry = [];

    for (var key in this.serverData) {
      if (
        this.serverData[key]['symbol'].toLowerCase().trim() ===
          this.symbol.toLowerCase() &&
        this.symbol !== '' &&
        this.serverData[key]['open'] !== 0 &&
        this.serverData[key]['high'] !== 0 &&
        this.serverData[key]['low'] !== 0
      ) {
        this.symbolData.push(this.serverData[key]);
        this.expiry.push(this.serverData[key]['expiry_date']);
      }
    }

    // console.log(this.symbolData);
  }

  getExpiry(expiry_date: string) {
    console.log(expiry_date);
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

  removeSymbol() {
    for (var j in this.symbolData) {
      for (var k in this.nseArray) {
        if (
          this.symbolData[j].symbol === this.nseArray[k].value.symbol &&
          this.symbolData[j].expiry_date === this.nseArray[k].value.expiry_date
        ) {
          // this.symbolData.splice(this.nseArray[j], 1);
          this.symbolData.splice(parseInt(j), 1);
          // console.log(this.symbolData);
        }
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-nse',
  templateUrl: './nse.component.html',
  styleUrls: ['./nse.component.scss'],
})
export class NseComponent implements OnInit {
  nseData: Array<any> = [];
  filterArray: Array<any> = [];
  nseArray: Array<any> = JSON.parse(localStorage.getItem('nseArray'));

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // console.log(this.nseArray);

    setInterval(() => {
      this.nse();
    }, 500);
  }

  nse() {
    this.dataService.nseData().then((res: any) => {
      var data = JSON.parse(res.data);
      this.nseData = data.rows;

      // console.log(this.nseData);
      this.filterData();
    });
  }

  itemHeightFn(item, index) {
    return 180;
  }

  filterData() {
    this.filterArray = [];

    for (var i in this.nseData) {
      // console.log(this.nseData[i]);
      for (var j in this.nseArray) {
        if (
          this.nseData[i].expiry_date ===
            this.nseArray[j].value['expiry_date'] &&
          this.nseData[i].symbol === this.nseArray[j].value['symbol']
        ) {
          // console.log(this.nseArray[j]);
          if (!this.filterArray.includes(this.nseArray[j]))
            this.filterArray.push(this.nseData[i]);
        }
      }
    }
  }
}

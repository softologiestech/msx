import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-mcx',
  templateUrl: './mcx.component.html',
  styleUrls: ['./mcx.component.scss'],
})
export class McxComponent implements OnInit {
  mcxData: Array<any> = [];
  filterArray: Array<any> = [];
  mcxArray: Array<any> = JSON.parse(localStorage.getItem('mcxArray'));

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // console.log(this.mcxArray);

    setInterval(() => {
      this.nse();

      this.filterData();
    }, 500);
  }

  nse() {
    this.dataService.mcxData().then((res: any) => {
      var data = JSON.parse(res.data);
      this.mcxData = data.rows;

      // console.log(this.mcxData);
    });
  }

  itemHeightFn(item, index) {
    return 180;
  }

  filterData() {
    this.filterArray = [];

    for (var i in this.mcxData) {
      // console.log(this.mcxData[i]);
      for (var j in this.mcxArray) {
        if (
          this.mcxData[i].expiry_date ===
            this.mcxArray[j].value['expiry_date'] &&
          this.mcxData[i].symbol === this.mcxArray[j].value['symbol']
        ) {
          // console.log(this.mcxArray[j]);
          if (!this.filterArray.includes(this.mcxArray[j]))
            this.filterArray.push(this.mcxData[i]);
          // console.log(this.filterArray);
        }
      }
    }
  }
}
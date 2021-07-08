import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mcx',
  templateUrl: './mcx.component.html',
  styleUrls: ['./mcx.component.scss'],
})
export class McxComponent implements OnInit {
  id: string = localStorage.getItem('id');
  mcxData: Array<any> = [];
  userData: any = {};
  filterArray: Array<any> = [];
  mcxArray: Array<any>;
  lot_sizes: Array<any> = [];
  sl: Array<any> = [];
  margin: Array<any> = [];
  dmargin: Array<any> = []; // Display Margin
  dls: Array<any> = []; // Display Lot Size
  dsl: Array<any> = []; // Display SL

  constructor(
    private dataService: DataService,
    private router: Router,
    private db: AngularFirestore,
    private userService: UserService
  ) {}

  ngOnInit() {
    // console.log(this.mcxArray);

    this.userService.getUserData(this.id).subscribe((res) => {
      this.userData = res;
      // console.log(this.userData);
    });

    setInterval(() => {
      this.mcx();

      this.mcxArray = JSON.parse(localStorage.getItem('mcxArray'));
      this.filterData();
      this.filterLotSizes();
      this.filterSL();
      this.filterMargin();
      this.addLotSize();
      this.addSL();
      this.addMargin();
    }, 500);

    this.getLotSizes();
    this.getSL();
    this.getMargin();
  }

  mcx() {
    this.dataService.mcxData().then((res: any) => {
      var data = JSON.parse(res.data);
      this.mcxData = data.rows;

      // console.log(this.mcxData);
    });
  }

  itemHeightFn(item, index) {
    return 170;
  }

  filterData() {
    // console.log(this.userData);
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
            this.filterArray.push({
              ...this.mcxData[i],
              commission: this.userData.mcx_commission,
            });
          // console.log(this.filterArray);
        }
      }
    }
  }

  goto(d: any) {
    this.router.navigate(['/new-order'], {
      state: d,
    });
  }

  remove(item: any) {
    // console.log(item.key);

    for (var key in this.mcxArray) {
      if (
        this.mcxArray[key].value.symbol === item.value.symbol &&
        this.mcxArray[key].value.expiry_date === item.value.expiry_date
      ) {
        this.mcxArray.splice(item.key, 1);
        localStorage.setItem('mcxArray', JSON.stringify(this.mcxArray));
        console.log(this.mcxArray);
      }
    }
  }

  getLotSizes() {
    this.db
      .collection('lot_sizes')
      .valueChanges()
      .subscribe((res: any) => {
        this.lot_sizes = res[0];
        // console.log(this.lot_sizes);
      });
  }

  getSL() {
    this.db
      .collection('sl')
      .valueChanges()
      .subscribe((res: any) => {
        this.sl = res[0];
        // console.log(this.sl);
      });
  }

  getMargin() {
    this.userService.getUserMargins(this.id).subscribe((res: any) => {
      this.margin = res[0];
      // console.log(this.margin);
    });
  }

  filterLotSizes() {
    this.dls = [];

    for (var k in this.filterArray) {
      for (var j in this.lot_sizes) {
        if (j === this.filterArray[k].symbol) {
          this.dls.push({ symbol: j, lot_size: this.lot_sizes[j] });
        }
      }
    }

    // console.log(this.dls);
  }

  filterSL() {
    this.dsl = [];

    for (var k in this.filterArray) {
      for (var j in this.sl) {
        // console.log(j, this.sl[j]);

        if (j === this.filterArray[k].symbol) {
          this.dsl.push({ symbol: j, sl: this.sl[j] });
        }
      }
    }

    // console.log(this.dsl);
  }

  filterMargin() {
    this.dmargin = [];

    for (var k in this.filterArray) {
      for (var j in this.margin) {
        // console.log(j, this.sl[j]);

        if (j === this.filterArray[k].symbol) {
          this.dmargin.push({ symbol: j, margin: this.margin[j] });
        }
      }
    }

    // console.log(this.dmargin);
  }

  addLotSize() {
    for (var k in this.filterArray) {
      for (var j in this.dls) {
        if (this.dls[j].symbol === this.filterArray[k].symbol) {
          // console.log(this.dls[j].lot_size);

          this.filterArray[k] = {
            ...this.filterArray[k],
            lotSize: this.dls[j].lot_size,
          };
          // console.log(this.filterArray[k]);
        }
      }
    }
  }

  addSL() {
    for (var k in this.filterArray) {
      for (var j in this.dsl) {
        if (this.dsl[j].symbol === this.filterArray[k].symbol) {
          // console.log(this.dsl[j].lot_size);

          this.filterArray[k] = {
            ...this.filterArray[k],
            sl: this.dsl[j].sl,
          };
          // console.log(this.filterArray[k]);
        }
      }
    }
  }

  addMargin() {
    for (var k in this.filterArray) {
      for (var j in this.dmargin) {
        if (this.dmargin[j].symbol === this.filterArray[k].symbol) {
          // console.log(this.margin[j].lot_size);

          this.filterArray[k] = {
            ...this.filterArray[k],
            margin: this.dmargin[j].margin,
          };
          // console.log(this.filterArray[k]);
        }
      }
    }
  }
}

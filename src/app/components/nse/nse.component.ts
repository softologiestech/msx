import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nse',
  templateUrl: './nse.component.html',
  styleUrls: ['./nse.component.scss'],
})
export class NseComponent implements OnInit {
  id: string = localStorage.getItem('id');
  nseData: Array<any> = [];
  userData: any = {};
  filterArray: Array<any> = [];
  nseArray: Array<any>;

  constructor(
    private dataService: DataService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // console.log(this.nseArray);

    this.userService.getUserData(this.id).subscribe((res) => {
      this.userData = res;
      // console.log(this.userData);
    });

    setInterval(() => {
      this.nse();

      this.nseArray = JSON.parse(localStorage.getItem('nseArray'));
      this.filterData();
    }, 500);
  }

  nse() {
    this.dataService.nseData().then((res: any) => {
      var data = JSON.parse(res.data);
      this.nseData = data.rows;

      // console.log(this.nseData);
    });
  }

  itemHeightFn(item, index) {
    return 170;
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
            this.filterArray.push({
              ...this.nseData[i],
              commission: this.userData.nse_commission,
            });

          // console.log(this.filterArray);
        }
      }
    }
  }

  goto(d: any) {
    this.router.navigate(['/new-order-nse'], {
      state: d,
    });
  }

  remove(item: any) {
    console.log(item.key);

    for (var key in this.nseArray) {
      if (
        this.nseArray[key].value.symbol === item.value.symbol &&
        this.nseArray[key].value.expiry_date === item.value.expiry_date
      ) {
        this.nseArray.splice(item.key, 1);
        localStorage.setItem('nseArray', JSON.stringify(this.nseArray));
        console.log(this.nseArray);
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-comex',
  templateUrl: './comex.page.html',
  styleUrls: ['./comex.page.scss'],
})
export class ComexPage implements OnInit {
  serverData: any = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      this.fetchData();
    }, 500);
  }

  itemHeightFn(item, index) {
    return 145;
  }

  fetchData() {
    this.dataService.comexData().then((res: any) => {
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
}

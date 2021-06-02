import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  info: any = {};
  values: Array<String> = ['chart', 'technical', 'news'];
  iValue: string = 'chart';

  constructor(private router: Router) {
    this.info = this.router.getCurrentNavigation().extras.state;
    // console.log(this.info);
  }

  ngOnInit() {}

  segmentChanged(e) {
    this.values;
  }
}

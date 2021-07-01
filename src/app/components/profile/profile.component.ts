import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  id: string = localStorage.getItem('id');
  userData: any;

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.db
      .doc(`user/${this.id}`)
      .valueChanges()
      .subscribe((res) => {
        this.userData = res;
        console.log(res);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-pop-over',
  templateUrl: './chat-pop-over.component.html',
  styleUrls: ['./chat-pop-over.component.scss'],
})
export class ChatPopOverComponent implements OnInit {
  uid: string = localStorage.getItem('uid');

  constructor(
    public authService: AuthService,
    public popoverCtrl: PopoverController,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.popoverCtrl.dismiss();
    this.router.navigate(['/tabs/person']);
  }
}

import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ChatPopOverComponent } from 'src/app/components/chat-pop-over/chat-pop-over.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  uid: string;
  id: string = localStorage.getItem('id');

  constructor(
    public authService: AuthService,
    public popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.uid = localStorage.getItem('uid');
    });
  }

  async chatPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: ChatPopOverComponent,
      event: ev,
      cssClass: 'popover',
      translucent: true,
      animated: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}

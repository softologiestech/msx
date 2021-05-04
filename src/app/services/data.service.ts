import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private socket: WebSocketSubject<any>;
  private messagesSubject = new Subject();
  public messages = this.messagesSubject.pipe(
    switchAll(),
    catchError((e) => {
      throw e;
    })
  );

  constructor() {}

  public connect(): void {
    if (!this.socket || this.socket.closed) {
      this.socket = this.getNewWebSocket();
      const messages = this.socket.pipe(
        tap({
          error: (error) => console.log(error),
        }),
        catchError((_) => EMPTY)
      );

      this.messagesSubject.next(messages);
    }
  }

  private getNewWebSocket() {
    return webSocket({
      url: environment.wsUri,
      openObserver: {
        next: () => {
          console.log('Connection Established');
        },
      },
      closeObserver: {
        next: () => {
          console.log('[DataService]: connection closed');
        },
      },
    });
  }

  sendMessage(msg: any) {
    this.socket.next(msg);
  }

  close() {
    this.socket.complete();
  }
}

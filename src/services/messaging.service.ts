import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { environment } from '../environments/environment';
import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private socket;
  constructor(private utilSvc: UtilityService) {
    const chatServer = environment.apiServerUrl;
    this.socket = socketIo(chatServer);
  }

  send(message): void {
    this.socket.emit('chat_message', message);
  }

  onMessage(messages): void  {
    this.socket.on('chat_message', (msg) => {
      const isLoggedInUser = this.utilSvc.isLoggedInUser(msg.userId);
      msg.isLoggedInUser = isLoggedInUser;
      msg.username = isLoggedInUser ? 'You' : msg.username;
      messages.push(msg);
      this.utilSvc.displayLatestMsg();
    });
  }
}

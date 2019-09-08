import { Component, OnInit } from '@angular/core';
import { UtilityService, ChatMessage, StatusCode } from '../../services/utility.service';
import { MessageService } from '../../services/message.service';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  public chatMessages: ChatMessage[];
  public chatMessage = '';
  private loggedUserId: number;
  private loggedUserName: string;
  private users: any;
  constructor(private utilSvc: UtilityService,
              private msgSvc: MessageService,
              private chatSvc: MessagingService) { }

  ngOnInit() {
    const sessionData = this.utilSvc.getSession();
    this.loggedUserId = sessionData.loggedUserId;
    this.loggedUserName = sessionData.loggedUserName;
    this.users = JSON.parse(sessionData.users);
    if (this.loggedUserId === null) {
      location.href = '/login';
    }

    this.msgSvc.getAllMessages().subscribe(result => {
      this.chatMessages = this.parseChatMessages(result.data);
      this.chatSvc.onMessage(this.chatMessages);
      this.utilSvc.displayLatestMsg();
    });
  }

  logout(): void {
    this.utilSvc.destroySession();
    location.href = '/login';
  }

  sendMessage(): void {
    this.msgSvc.addMessage(this.loggedUserId, this.chatMessage).subscribe(result => {
      this.chatMessage = '';
      if (result.status === StatusCode.OK) {
        const chat: ChatMessage = {
          id: result.data.id,
          message: result.data.msg,
          username: this.loggedUserName,
          userId: this.loggedUserId,
          isLoggedInUser: null
        };
        this.chatSvc.send(chat);
      }
    });
  }

  parseChatMessages(messages): Array<ChatMessage> {
    const chats = [];
    messages.forEach(msg => {
      let chatOwner = this.users[msg.userId];
      if (!chatOwner) {
        chatOwner = 'unknown';
      }
      const isLoggedInUser =  this.utilSvc.isLoggedInUser(msg.userId);
      const chat: ChatMessage = {
        id: msg.id,
        message: msg.msg,
        username: isLoggedInUser ? 'You' : chatOwner,
        userId: msg.userId,
        isLoggedInUser
      };
      chats.push(chat);
    });
    return chats;
  }
}

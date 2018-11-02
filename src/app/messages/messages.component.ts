import { Component, OnInit } from '@angular/core';
import { MessageService } from "../message.service";
import { MessageType } from "../message";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private messageType = MessageType;

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

  clear(){
    this.messageService.clear();
  }

}

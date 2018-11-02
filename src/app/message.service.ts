import { Injectable } from '@angular/core';
import { Message, MessageType } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: Message

  constructor() { }

  add(text: string, type: MessageType){
    this.message = new Message();
    this.message.type = type;
    this.message.text = text;
  }

  clear(){
    this.message = null;
  }

}

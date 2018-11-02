export class Message{
    type: MessageType;
    text: string;
}

export enum MessageType{
    INFO, WARN, ERROR,
}
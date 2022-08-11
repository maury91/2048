import {
  ClientChatMessageParam,
  GameEvents,
  ServerChatMessageParam,
} from "shared/types";
import { Socket } from "socket.io-client";
import { newMessage } from "store/chat/slice";
import { AppStore } from "store/types";

import { Transport } from "./transport";

export class Chat {
  private socket: Socket;
  constructor(private store: AppStore, transport: Transport) {
    this.socket = transport.socket;
    this.setupSocket();
  }

  public sendMessage(message: ClientChatMessageParam) {
    this.socket.emit(GameEvents.CHAT_MESSAGE_EVENT, message);
  }

  private setupSocket() {
    this.socket.on(
      GameEvents.CHAT_MESSAGE_EVENT,
      (message: ServerChatMessageParam) => {
        this.store.dispatch(newMessage(message));
      }
    );
  }
}

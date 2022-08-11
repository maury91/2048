import { CHANNEL } from "consts";
import {
  ClientChatMessageParam,
  GameEvents,
  ServerChatMessageParam,
} from "shared/types";
import { Socket } from "socket.io";

export class Chat {
  private sockets: Socket[] = [];

  private sendMessage(from: string, message: string) {
    this.sockets.forEach((socket) => {
      // This is in a separate variable to ensure type-checking
      const chatMessage: ServerChatMessageParam = { from, message };
      return socket.emit(GameEvents.CHAT_MESSAGE_EVENT, chatMessage);
    });
  }

  private broadcastMessage =
    (from: string) => (message: ClientChatMessageParam) => {
      this.sendMessage(from, message);
    };

  /**
   * Bind a user to the chat, once a user is bind it will start receiving messages
   * and will be able to send messages
   * @param socket -- Socket of the user
   * @param name -- Name of the user
   */
  public bindUser(socket: Socket, name: string) {
    this.sockets.push(socket);
    this.sendMessage(CHANNEL, `User "${name}" has joined the game`);
    socket.on(GameEvents.CHAT_MESSAGE_EVENT, this.broadcastMessage(name));
    socket.on("disconnect", () => {
      // Unsubscribe
      this.sockets = this.sockets.filter((subscriber) => subscriber !== socket);
      this.sendMessage(CHANNEL, `User "${name}" has left the game`);
    });
  }
}

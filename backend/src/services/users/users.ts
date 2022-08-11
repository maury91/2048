import { CHANNEL } from "consts";
import {
  ClientLoginParam,
  GameEvents,
  ServerLoginFailedParam,
  ServerLoginSuccessParam,
} from "shared/types";
import { Socket } from "socket.io";

type LoginSubscriber = (socket: Socket, name: string) => void;

export class Users {
  private users: string[] = [CHANNEL];
  private subscribers: LoginSubscriber[] = [];

  private isNameAvailable(name: string): boolean {
    return !this.users.includes(name);
  }

  private addUser(name: string) {
    this.users.push(name);
  }

  private removeUser(name: string) {
    this.users = this.users.filter((userName) => userName !== name);
  }

  private notifySubscribers(socket: Socket, name: string) {
    this.subscribers.forEach((subscriber) => subscriber(socket, name));
  }

  // This exists only for type-safety
  static sendLoginSuccess(socket: Socket, name: ServerLoginSuccessParam) {
    socket.emit(GameEvents.LOGIN_SUCCESS_EVENT, name);
  }

  // This exists only for type-safety
  static sendLoginFailed(socket: Socket, name: ServerLoginFailedParam) {
    socket.emit(GameEvents.LOGIN_FAILED_EVENT, name);
  }

  /**
   * Subscribe to the login event
   * @param subscriber
   */
  public subscribeToLogin(subscriber: LoginSubscriber) {
    this.subscribers.push(subscriber);
  }

  /**
   * Bind a socket to the UserManager, the UserManager will listen to the user events on this socket
   * @param socket
   */
  public bindSocket = (socket: Socket) => {
    let userName: string | null = null;

    socket.emit(GameEvents.LOGIN_READY_EVENT);
    socket.on("disconnect", () => {
      if (userName) {
        this.removeUser(userName);
      }
    });
    socket.on(GameEvents.LOGIN_EVENT, (name: ClientLoginParam) => {
      if (this.isNameAvailable(name)) {
        userName = name;
        Users.sendLoginSuccess(socket, name);
        this.addUser(name);
        this.notifySubscribers(socket, name);
      } else {
        Users.sendLoginFailed(socket, `Name "${name}" already in use`);
      }
    });
  };
}

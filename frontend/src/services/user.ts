import {
  ClientLoginParam,
  GameEvents,
  ServerLoginFailedParam,
  ServerLoginSuccessParam,
} from "shared/types";
import { Socket } from "socket.io-client";
import { AppStore } from "store/types";
import { userConnected, userError } from "store/user/slice";

import { Transport } from "./transport";

export const SESSION_USER_NAME_KEY = "user-name";

export class User {
  private socket: Socket;

  constructor(private store: AppStore, transport: Transport) {
    this.socket = transport.socket;
    this.setupSocket();
  }

  private doSession() {
    const lastSessionUserName = sessionStorage.getItem(SESSION_USER_NAME_KEY);
    if (lastSessionUserName) {
      this.login(lastSessionUserName);
    }
  }

  private setupSocket() {
    this.socket.on(GameEvents.LOGIN_READY_EVENT, () => {
      this.doSession();
    });
    this.socket.on(
      GameEvents.LOGIN_SUCCESS_EVENT,
      (name: ServerLoginSuccessParam) => {
        sessionStorage.setItem(SESSION_USER_NAME_KEY, name);
        this.store.dispatch(userConnected(name));
      }
    );
    this.socket.on(
      GameEvents.LOGIN_FAILED_EVENT,
      (error: ServerLoginFailedParam) => {
        this.store.dispatch(userError(error));
      }
    );
  }

  public login(name: ClientLoginParam) {
    this.socket.emit(GameEvents.LOGIN_EVENT, name);
  }
}

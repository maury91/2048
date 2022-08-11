import { SERVER_URL } from "consts";
import { io, Socket } from "socket.io-client";
import { connected, connecting, disconnected } from "store/connection/slice";
import { AppStore } from "store/types";

export class Transport {
  public socket: Socket;

  constructor(private store: AppStore) {
    this.socket = io(SERVER_URL);
    this.store.dispatch(connecting());
    this.setupSocket();
  }

  private setupSocket() {
    this.socket.on("connect", () => {
      this.store.dispatch(connected());
    });
    this.socket.on("disconnect", (reason, description) => {
      const message = description
        ? description instanceof Error
          ? description.message
          : description.description
        : reason;
      this.store.dispatch(disconnected(message));
    });
  }
}

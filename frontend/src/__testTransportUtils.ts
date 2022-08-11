import { SERVER_URL } from "consts";
import { Server } from "mock-socket";
import configureStore from "redux-mock-store";
import { Socket } from "socket.io";
import { AppStore, RootState } from "store/types";

import { Transport } from "./services/transport";

jest.mock("socket.io-client", () => {
  const { SocketIO } = jest.requireActual("mock-socket");
  return { io: SocketIO };
});

export const createMockedTransport = (
  onReady: (socket: Socket, done: () => void) => void,
  done: jest.DoneCallback
) => {
  const mockServer = new Server(SERVER_URL);
  const store = configureStore<RootState>([])();
  const transport = new Transport(store);

  // @ts-ignore
  mockServer.on("connection", (socket: Socket) => {
    onReady(socket, () => {
      mockServer.close();
      done();
    });
  });

  return {
    store,
    transport,
  };
};

import { createServer } from "http";
import { AddressInfo } from "net";

import { Server, Socket } from "socket.io";
import { io as Client, Socket as ClientSocket } from "socket.io-client";

export interface MockedSocketConnection {
  connect: () => Promise<{
    client: ClientSocket;
    server: Socket;
  }>;
  clear: () => void;
}

export const createSocketConnection = (): Promise<MockedSocketConnection> =>
  new Promise((resolve) => {
    const httpServer = createServer();
    const server = new Server(httpServer);
    httpServer.listen(() => {
      const port = (httpServer.address() as AddressInfo).port;
      resolve({
        connect: () =>
          new Promise((connectResolve) => {
            const client = Client(`ws://localhost:${port}`);
            server.once("connection", (server) => {
              client.once("connect", () => {
                connectResolve({
                  client,
                  server,
                });
              });
            });
          }),
        clear: () => {
          server.close();
        },
      });
    });
  });

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

import {
  createSocketConnection,
  MockedSocketConnection,
  sleep,
} from "__testUtils";
import { GameEvents } from "shared/types";
import { Socket } from "socket.io";
import { Socket as ClientSocket } from "socket.io-client";

import { Users } from "./users";

describe("Test services/users", () => {
  let socketConnection: MockedSocketConnection,
    client: ClientSocket,
    server: Socket,
    clear: () => void;

  beforeEach(async () => {
    socketConnection = await createSocketConnection();
    clear = socketConnection.clear;
    const pair = await socketConnection.connect();
    client = pair.client;
    server = pair.server;
    jest.clearAllMocks();
  });

  afterEach(() => {
    clear();
    client.close();
  });

  it("When a client connects it should receive a login ready event", async () => {
    const users = new Users();
    const onLoginReady = jest.fn();
    client.on(GameEvents.LOGIN_READY_EVENT, onLoginReady);
    expect(onLoginReady).not.toHaveBeenCalled();
    users.bindSocket(server);
    await sleep(100);
    expect(onLoginReady).toHaveBeenCalled();
  });

  it("When a client logins all the subscribers should be notified", async () => {
    const users = new Users();
    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();
    users.subscribeToLogin(subscriber1);
    users.subscribeToLogin(subscriber2);
    users.bindSocket(server);
    await sleep(100);

    expect(subscriber1).not.toHaveBeenCalled();
    expect(subscriber2).not.toHaveBeenCalled();
    const name = "name";
    client.emit(GameEvents.LOGIN_EVENT, name);
    await sleep(100);
    expect(subscriber1).toHaveBeenCalledWith(server, name);
    expect(subscriber2).toHaveBeenCalledWith(server, name);
  });

  it("When a client logins successfully it should receive a login success event", async () => {
    const users = new Users();
    const onLoginSuccess = jest.fn();
    const onLoginFailed = jest.fn();
    client.on(GameEvents.LOGIN_SUCCESS_EVENT, onLoginSuccess);
    client.on(GameEvents.LOGIN_FAILED_EVENT, onLoginFailed);
    users.bindSocket(server);
    await sleep(100);
    expect(onLoginSuccess).not.toHaveBeenCalled();
    expect(onLoginFailed).not.toHaveBeenCalled();

    const name = "name";
    client.emit(GameEvents.LOGIN_EVENT, name);
    await sleep(100);
    expect(onLoginSuccess).toHaveBeenCalledWith(name);
    expect(onLoginFailed).not.toHaveBeenCalled();
  });

  it("It should not allow two client to login with the same name", async () => {
    const { server: server2, client: client2 } =
      await socketConnection.connect();

    const users = new Users();
    const onLoginSuccess = jest.fn();
    const onLoginFailed = jest.fn();
    client.on(GameEvents.LOGIN_SUCCESS_EVENT, onLoginSuccess);
    client.on(GameEvents.LOGIN_FAILED_EVENT, onLoginFailed);
    const onLoginSuccess2 = jest.fn();
    const onLoginFailed2 = jest.fn();
    client2.on(GameEvents.LOGIN_SUCCESS_EVENT, onLoginSuccess2);
    client2.on(GameEvents.LOGIN_FAILED_EVENT, onLoginFailed2);
    users.bindSocket(server);
    users.bindSocket(server2);
    await sleep(100);

    const name = "name";
    client.emit(GameEvents.LOGIN_EVENT, name);
    await sleep(100);
    expect(onLoginSuccess).toHaveBeenCalledWith(name);
    expect(onLoginSuccess2).not.toHaveBeenCalled();

    client2.emit(GameEvents.LOGIN_EVENT, name);
    await sleep(100);
    expect(onLoginSuccess2).not.toHaveBeenCalled();
    expect(onLoginFailed2).toHaveBeenCalled();
  });
});

import { createSocketConnection, sleep } from "__testUtils";
import { CHANNEL } from "consts";
import { GameEvents } from "shared/types";
import { Socket } from "socket.io";
import { Socket as ClientSocket } from "socket.io-client";

import { Chat } from "./index";

describe("Test chatMechanics", () => {
  let client1: ClientSocket,
    client2: ClientSocket,
    server1: Socket,
    server2: Socket,
    clear: () => void;
  const onChatMessage1 = jest.fn();
  const onChatMessage2 = jest.fn();
  const name1 = "foo";
  const name2 = "bar";

  beforeEach(async () => {
    const socketConnection = await createSocketConnection();
    clear = socketConnection.clear;
    const firstPair = await socketConnection.connect();
    client1 = firstPair.client;
    server1 = firstPair.server;
    const secondPair = await socketConnection.connect();
    client2 = secondPair.client;
    server2 = secondPair.server;
    client1.on(GameEvents.CHAT_MESSAGE_EVENT, onChatMessage1);
    client2.on(GameEvents.CHAT_MESSAGE_EVENT, onChatMessage2);
    jest.clearAllMocks();
  });

  afterEach(() => {
    clear();
    client1.close();
    client2.close();
  });

  it("Should send a message to the channel when a user joins", async () => {
    const chat = new Chat();
    chat.bindUser(server1, name1);
    chat.bindUser(server2, name2);
    // The message takes some time to reach the client
    await sleep(100);
    expect(onChatMessage1).toHaveBeenCalledWith({
      from: CHANNEL,
      message: expect.stringContaining(`"${name1}" has joined`),
    });
    expect(onChatMessage1).toHaveBeenCalledWith({
      from: CHANNEL,
      message: expect.stringContaining(`"${name2}" has joined`),
    });
    expect(onChatMessage2).toHaveBeenCalledWith({
      from: CHANNEL,
      message: expect.stringContaining(`"${name2}" has joined`),
    });
    expect(onChatMessage2).not.toHaveBeenCalledWith({
      from: CHANNEL,
      message: expect.stringContaining(`"${name1}" has joined`),
    });
  });

  it("Should broadcast a message when a user sends a message", async () => {
    const chat = new Chat();
    const message = "message";
    chat.bindUser(server1, name1);
    chat.bindUser(server2, name2);
    await sleep(100);
    jest.clearAllMocks();
    client1.emit(GameEvents.CHAT_MESSAGE_EVENT, message);
    await sleep(100);
    expect(onChatMessage1).toHaveBeenCalledWith({
      from: name1,
      message,
    });
    expect(onChatMessage2).toHaveBeenCalledWith({
      from: name1,
      message,
    });
  });

  it("Should send a message to the channel when a user disconnects", async () => {
    const chat = new Chat();
    chat.bindUser(server1, name1);
    chat.bindUser(server2, name2);
    await sleep(100);
    jest.clearAllMocks();
    client1.disconnect();
    await sleep(100);
    expect(onChatMessage2).toHaveBeenCalledWith({
      from: CHANNEL,
      message: expect.stringContaining(`"${name1}" has left`),
    });
    expect(onChatMessage1).not.toHaveBeenCalledWith({
      from: CHANNEL,
      message: expect.stringContaining(`"${name1}" has left`),
    });
  });
});

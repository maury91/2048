import { createMockedTransport } from "__testTransportUtils";
import { GameEvents } from "shared/types";
import { Socket } from "socket.io";
import { userConnected, userError } from "store/user/slice";

import { SESSION_USER_NAME_KEY, User } from "./user";

describe("Test services/user", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should send a login event when calling the method login", (done) => {
    const name = "name-1";
    const doTest = (socket: Socket, testDone: () => void) => {
      // This happens third
      socket.on(GameEvents.LOGIN_EVENT, (value) => {
        expect(value).toBe(name);
        testDone();
      });

      // This happens second
      user.login(name);
    };

    // This happens first
    const { store, transport } = createMockedTransport(doTest, done);
    const user = new User(store, transport);
  });

  it("should persist the session when a login is successful", (done) => {
    const name = "name-2";
    const doTest = (socket: Socket, testDone: () => void) => {
      // This happens third
      socket.on(GameEvents.LOGIN_EVENT, (value) => {
        socket.emit(GameEvents.LOGIN_SUCCESS_EVENT, value);

        setTimeout(() => {
          expect(sessionStorage.getItem(SESSION_USER_NAME_KEY)).toBe(value);
          testDone();
        });
      });

      // This happens second
      user.login(name);
    };

    // This happens first
    const { store, transport } = createMockedTransport(doTest, done);
    const user = new User(store, transport);
  });

  it("should dispatch userConnected when a login is successful", (done) => {
    const name = "name-3";
    const doTest = (socket: Socket, testDone: () => void) => {
      // This happens third
      socket.on(GameEvents.LOGIN_EVENT, (value) => {
        socket.emit(GameEvents.LOGIN_SUCCESS_EVENT, value);

        setTimeout(() => {
          expect(store.getActions()).toMatchObject(
            expect.arrayContaining([userConnected(name)])
          );
          testDone();
        });
      });

      // This happens second
      user.login(name);
    };

    // This happens first
    const { store, transport } = createMockedTransport(doTest, done);
    const user = new User(store, transport);
  });

  it("should dispatch userError when a login is failed", (done) => {
    const name = "name-4";
    const doTest = (socket: Socket, testDone: () => void) => {
      const error = "error-4";
      // This happens third
      socket.on(GameEvents.LOGIN_EVENT, () => {
        socket.emit(GameEvents.LOGIN_FAILED_EVENT, error);

        setTimeout(() => {
          expect(store.getActions()).toMatchObject(
            expect.arrayContaining([userError(error)])
          );
          testDone();
        });
      });

      // This happens second
      user.login(name);
    };

    // This happens first
    const { store, transport } = createMockedTransport(doTest, done);
    const user = new User(store, transport);
  });

  it("when a previous session exists it should auto-login", (done) => {
    const name = "name-5";
    const doTest = (socket: Socket, testDone: () => void) => {
      // This happens third
      socket.on(GameEvents.LOGIN_EVENT, (value) => {
        socket.emit(GameEvents.LOGIN_SUCCESS_EVENT, value);

        setTimeout(() => {
          expect(sessionStorage.getItem(SESSION_USER_NAME_KEY)).toBe(value);
          testDone();
        });
      });

      // This happens second
      socket.emit(GameEvents.LOGIN_READY_EVENT);
    };

    // This happens first
    sessionStorage.setItem(SESSION_USER_NAME_KEY, name);
    const { store, transport } = createMockedTransport(doTest, done);
    new User(store, transport);
  });
});

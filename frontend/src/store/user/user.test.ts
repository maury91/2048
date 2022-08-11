import { RootState } from "store/types";

import { initialState } from "./const";
import {
  isUserConnectingSelector,
  userErrorSelector,
  userNameSelector,
} from "./selectors";
import reducer, { connecting, userConnected, userError } from "./slice";
import { UserState } from "./types";

const wrapUserState = (user: UserState): RootState =>
  ({
    user,
  } as RootState);

const connectingState: UserState = {
  ...initialState,
  connecting: true,
};

const connectedState: UserState = {
  ...initialState,
  name: "name",
};

const errorState: UserState = {
  ...initialState,
  error: "error",
};

describe("Test store/user", () => {
  describe("when a connecting action is reduced", () => {
    it("should set connecting to true", () => {
      const nextState = wrapUserState(reducer(initialState, connecting()));
      expect(isUserConnectingSelector(nextState)).toBe(true);
    });

    it("should remove the error", () => {
      const nextState = wrapUserState(reducer(errorState, connecting()));
      expect(userErrorSelector(nextState)).toBe(null);
    });

    it("should remove the user name", () => {
      const nextState = wrapUserState(reducer(connectedState, connecting()));
      expect(userNameSelector(nextState)).toBe(null);
    });
  });

  describe("when a userConnected action is reduced", () => {
    it("should set connecting to false", () => {
      const name = "name-1";
      const nextState = wrapUserState(
        reducer(connectingState, userConnected(name))
      );
      expect(isUserConnectingSelector(nextState)).toBe(false);
    });

    it("should set the name of the user", () => {
      const name = "name-2";
      const nextState = wrapUserState(
        reducer(connectingState, userConnected(name))
      );
      expect(userNameSelector(nextState)).toBe(name);
    });

    it("should remove the error", () => {
      const name = "name-3";
      const nextState = wrapUserState(reducer(errorState, userConnected(name)));
      expect(userErrorSelector(nextState)).toBe(null);
    });
  });

  describe("when a userError action is reduced", () => {
    it("should set connecting to false", () => {
      const error = "error-1";
      const nextState = wrapUserState(
        reducer(connectingState, userError(error))
      );
      expect(isUserConnectingSelector(nextState)).toBe(false);
    });

    it("should set the error", () => {
      const error = "error-2";
      const nextState = wrapUserState(
        reducer(connectingState, userError(error))
      );
      expect(userErrorSelector(nextState)).toBe(error);
    });

    it("should remove the user name", () => {
      const error = "error-3";
      const nextState = wrapUserState(
        reducer(connectedState, userError(error))
      );
      expect(userNameSelector(nextState)).toBe(null);
    });
  });
});

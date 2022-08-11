import { RootState } from "store/types";

export const isUserConnectedSelector = (state: RootState): boolean =>
  state.user.name !== null;

export const isUserConnectingSelector = (state: RootState): boolean =>
  state.user.connecting;

export const userErrorSelector = (state: RootState): string | null =>
  state.user.error;

export const userNameSelector = (state: RootState): string | null =>
  state.user.name;

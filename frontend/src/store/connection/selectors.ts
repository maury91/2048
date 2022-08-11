import { RootState } from "store/types";

export const isServerConnectingSelector = (state: RootState): boolean =>
  state.connection.connecting;
export const isServerConnectedSelector = (state: RootState): boolean =>
  state.connection.connected;
export const serverConnectionErrorSelector = (
  state: RootState
): null | string => state.connection.error;

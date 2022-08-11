import { ConnectionState } from "./types";

export const initialState: ConnectionState = {
  connected: false,
  connecting: false,
  error: null,
};

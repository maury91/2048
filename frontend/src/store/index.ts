import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "./chat/slice";
import connectionReducer from "./connection/slice";
import gameReducer from "./game/slice";
import userReducer from "./user/slice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    connection: connectionReducer,
    game: gameReducer,
    user: userReducer,
  },
});

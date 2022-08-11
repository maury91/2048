import { store } from "store";

import { Chat } from "./chat";
import { Game } from "./game";
import { Transport } from "./transport";
import { User } from "./user";

export const transportService = new Transport(store);
export const userService = new User(store, transportService);
export const gameService = new Game(store, transportService);
export const chatService = new Chat(store, transportService);

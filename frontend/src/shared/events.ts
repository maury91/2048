/**
 * This file is part of a contract between Frontend and Backend, it must exist on both of them equally.
 * There's better ways to achieve this rather than a copy-paste, but for the sake of this project this is enough.
 */
export enum GameEvents {
  // This is the event fired by the both sockets when a chat message is sent
  CHAT_MESSAGE_EVENT = "chat-message",

  // This is the event fired by the client socket when a user chooses how many obstacles use in the game
  SET_OBSTACLES_EVENT = "game-obstacles-set",

  // This is the event fired by the client socket when a user starts a new game ( after losing/winning )
  NEW_GAME_EVENT = "new-game",

  // This is the event fired by the client socket when a user sends a command ( up/down/left/right )
  COMMAND_EVENT = "command",

  // This is the event fired by the server socket when the game board changes ( usually after a command is processed )
  BOARD_UPDATED_EVENT = "board-updated",

  // This is the event fired by the server socket when the game status changes ( the game is won / lost / starter / ready-to-restart )
  GAME_STATUS_EVENT = "game-status",
}

export interface ServerChatMessage {
  from: string;
  message: string;
}

export type ClientChatMessage = string;

/**
 * This file is part of a contract between Frontend and Backend, it must exist on both of them equally.
 * There's better ways to achieve this rather than a copy-paste, but for the sake of this project this is enough.
 */
export enum GameEvents {
  // This event is fired by the both sockets when a chat message is sent
  CHAT_MESSAGE_EVENT = "chat-message",

  // This event is fired by the client socket when a user chooses how many obstacles use in the game
  SET_OBSTACLES_EVENT = "game-obstacles-set",

  // This event is fired by the client socket when a user starts a new game ( after losing/winning )
  NEW_GAME_EVENT = "new-game",

  // This event is fired by the client socket when a user sends a command ( up/down/left/right )
  COMMAND_EVENT = "command",

  // This event is fired by the server socket when the game board changes ( usually after a command is processed )
  BOARD_UPDATED_EVENT = "board-updated",

  // This event is fired by the server socket when the game status changes ( the game is won / lost / starter / ready-to-restart )
  GAME_STATUS_EVENT = "game-status",

  // This event is fired by the server socket when it is ready to accept users ( it helps in case of re-connections )
  LOGIN_READY_EVENT = "ready",

  // This event is fired by the server socket when a login is successful
  LOGIN_SUCCESS_EVENT = "login-success",

  // This event is fired by the server socket when a login is unsuccessful
  LOGIN_FAILED_EVENT = "login-failed",

  // This event is fired by the client socket when attempting to log in
  LOGIN_EVENT = "login",
}

export interface ServerChatMessageParam {
  from: string;
  message: string;
}
export type ClientChatMessageParam = string;

export type ClientSetObstaclesParam = number;

export type Direction = "up" | "right" | "down" | "left";
export type ClientCommandParam = Direction;

export type ServerBoardUpdatedParam = string;

export type ServerGameStatusParam = "won" | "lost" | "starting" | "started";

export type ServerLoginSuccessParam = string;

export type ServerLoginFailedParam = string;

export type ClientLoginParam = string;

import { deserialize } from "shared/serialization";
import {
  ClientCommandParam,
  ClientSetObstaclesParam,
  GameEvents,
  ServerGameStatusParam,
  ServerBoardUpdatedParam,
} from "shared/types";
import { Socket } from "socket.io-client";
import { updateGameBoard, updateGameStatus } from "store/game/slice";
import { AppStore } from "store/types";

import { Transport } from "./transport";

export class Game {
  private socket: Socket;
  constructor(private store: AppStore, transport: Transport) {
    this.socket = transport.socket;
    this.setupSocket();
  }

  private onBoardUpdate = (serializedBoard: ServerBoardUpdatedParam) => {
    try {
      const board = deserialize(serializedBoard);
      this.store.dispatch(updateGameBoard(board));
    } catch (err) {
      /*
        FixMe: Handle this error, something went wrong with the transport layer
        and the message ended up broken ( I can't see for what other reason the
        received serialised board wasn't square )
       */
    }
  };

  private onGameStatus = (status: ServerGameStatusParam) => {
    this.store.dispatch(updateGameStatus(status));
  };

  private setupSocket() {
    this.socket.on(GameEvents.GAME_STATUS_EVENT, this.onGameStatus);
    this.socket.on(GameEvents.BOARD_UPDATED_EVENT, this.onBoardUpdate);
  }

  public sendCommand(direction: ClientCommandParam) {
    this.socket.emit(GameEvents.COMMAND_EVENT, direction);
  }

  public newGame() {
    this.socket.emit(GameEvents.NEW_GAME_EVENT);
  }

  public chooseObstacles(count: ClientSetObstaclesParam) {
    this.socket.emit(GameEvents.SET_OBSTACLES_EVENT, count);
  }
}

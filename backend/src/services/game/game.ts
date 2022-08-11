import { GRID_SIZE, WINNING_POWER } from "consts";
import { Board } from "gameLogic/board";
import { isValidDirection } from "gameLogic/direction";
import {
  GameEvents,
  ClientSetObstaclesParam,
  ServerGameStatusParam,
  ClientCommandParam,
  ServerBoardUpdatedParam,
} from "shared/types";
import { Socket } from "socket.io";

export class Game {
  private sockets: Socket[] = [];
  private board: Board;
  private gameStatus: ServerGameStatusParam = "starting";

  constructor(
    private gridSize = GRID_SIZE,
    private winningPower = WINNING_POWER
  ) {
    this.board = new Board(gridSize, winningPower, 2);
  }

  private sendBoard(socket: Socket, board: ServerBoardUpdatedParam) {
    socket.emit(GameEvents.BOARD_UPDATED_EVENT, board);
  }

  private sendGameStatus(socket: Socket) {
    socket.emit(GameEvents.GAME_STATUS_EVENT, this.gameStatus);
  }

  private sendUpdate() {
    const serialized = this.board.serialize();
    this.sockets.forEach((socket) => this.sendBoard(socket, serialized));
  }

  private broadcastGameStatus() {
    this.sockets.forEach((socket) => this.sendGameStatus(socket));
  }

  private onCommand = (direction: ClientCommandParam) => {
    if (isValidDirection(direction)) {
      switch (this.board.move(direction)) {
        case "win":
          this.gameStatus = "won";
          this.broadcastGameStatus();
          break;
        case "lose":
          this.gameStatus = "lost";
          this.broadcastGameStatus();
          break;
      }
      this.sendUpdate();
    }
  };

  private onSetObstacles = (count: ClientSetObstaclesParam) => {
    if (this.gameStatus === "starting") {
      this.board = new Board(this.gridSize, this.winningPower, count);
      this.gameStatus = "started";
      this.broadcastGameStatus();
      this.sendUpdate();
    }
  };

  private startNewGame = () => {
    if (this.gameStatus === "won" || this.gameStatus === "lost") {
      this.gameStatus = "starting";
      this.broadcastGameStatus();
    }
  };

  public bindSocket(socket: Socket) {
    this.sockets.push(socket);
    this.sendBoard(socket, this.board.serialize());
    this.sendGameStatus(socket);
    socket.on(GameEvents.COMMAND_EVENT, this.onCommand);
    socket.on(GameEvents.SET_OBSTACLES_EVENT, this.onSetObstacles);
    socket.on(GameEvents.NEW_GAME_EVENT, this.startNewGame);
    socket.on("disconnect", () => {
      // Unsubscribe
      this.sockets = this.sockets.filter((subscriber) => subscriber !== socket);
    });
  }
}

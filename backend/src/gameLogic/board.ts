import { OBSTACLE_VALUE } from "shared/consts";
import { serialize } from "shared/serialization";
import { Direction } from "shared/types";
import { emptyArray } from "utils";

import { allDirections } from "./direction";
import { applyGravity } from "./gravity";

interface Position {
  row: number;
  column: number;
}

export type MoveResult = "win" | "lose" | "none";

export class Board {
  private grid: number[][];
  private obstacles: Position[] = [];

  constructor(
    private gridSize: number,
    private winningPower: number,
    obstaclesCount: number
  ) {
    if (obstaclesCount >= gridSize * gridSize - 1) {
      throw new Error("Too many obstacles!");
    }
    this.grid = emptyArray(gridSize, []).map(() => emptyArray(gridSize, 0));
    emptyArray(obstaclesCount, "").forEach(() => this.addObstacle());
    this.add(2);
  }

  private hasWinningValue(): boolean {
    return this.grid.some((row) =>
      row.some((value) => value === this.winningPower)
    );
  }

  private emptyPositions(): Position[] {
    return this.grid.flatMap((values, row) =>
      values.reduce<Position[]>((arr, value, column) => {
        if (value === 0) {
          return [...arr, { row, column }];
        }
        return arr;
      }, [])
    );
  }

  private changeGravity(direction: Direction) {
    this.grid = applyGravity(this.grid, direction, OBSTACLE_VALUE);
  }

  private getRandomFreePosition(): Position | null {
    // Find an empty position
    const availablePositions = this.emptyPositions();
    if (availablePositions.length === 0) {
      // the board is full!
      return null;
    }
    const randomPositionIndex = Math.floor(
      Math.random() * availablePositions.length
    );
    return availablePositions[randomPositionIndex];
  }

  private add(value = 1) {
    const position = this.getRandomFreePosition();
    if (position === null) {
      // Move is not valid
      return;
    }
    this.grid[position.row][position.column] = value;
  }

  private addObstacle() {
    const position = this.getRandomFreePosition();
    if (position) {
      this.obstacles.push(position);
      this.grid[position.row][position.column] = OBSTACLE_VALUE;
    }
  }

  public hasNoValidMoves() {
    const currentSnapshot = this.serialize();
    return allDirections.every((direction) => {
      const possibleGird = applyGravity(this.grid, direction, OBSTACLE_VALUE);
      return serialize(possibleGird) === currentSnapshot;
    });
  }

  /**
   * Make a move
   * @param direction
   * @public
   * @returns Returns an enum saying if it is a winning, normal or losing move
   */
  public move(direction: Direction): MoveResult {
    this.changeGravity(direction);
    if (this.hasWinningValue()) {
      return "win";
    }
    this.add();
    if (this.emptyPositions().length === 0 && this.hasNoValidMoves()) {
      return "lose";
    }
    return "none";
  }

  /**
   * Serializes the grid to be sent over network in a semi-compressed way ( could be compressed further easily )
   * @returns {string} Serialized grid
   */
  public serialize(): string {
    return serialize(this.grid);
  }
}

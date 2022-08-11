import { Chat } from "components/Chat";
import { GameGrid } from "components/GameGrid";
import React from "react";
import { SwipeCallback } from "react-swipeable";
import { gameService } from "services";

import styles from "./Game.module.css";
import { keyToGameDirection, swipeToGameDirection } from "./Game.utils";

const listenToKeyPress = (ev: KeyboardEvent) => {
  const direction = keyToGameDirection(ev.key);
  if (direction !== null) {
    gameService.sendCommand(direction);
  }
};

const listenToOnSwipe: SwipeCallback = (ev) => {
  const direction = swipeToGameDirection(ev.dir);
  if (direction !== null) {
    gameService.sendCommand(direction);
  }
};

export const Game: React.FC = () => {
  React.useLayoutEffect(() => {
    window.addEventListener("keydown", listenToKeyPress);
    return () => {
      window.removeEventListener("keydown", listenToKeyPress);
    };
  }, []);
  return (
    <div className={styles.container}>
      <GameGrid onSwiped={listenToOnSwipe} />
      <Chat />
    </div>
  );
};

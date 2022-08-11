import React, { PropsWithChildren } from "react";
import { gameService } from "services";

import styles from "./GameMessage.module.css";

export const GameMessage: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const startNewGame = () => {
    gameService.newGame();
  };
  return (
    <div className={styles.overlay}>
      <h1>{children}</h1>
      <button className={styles.button} onClick={startNewGame}>
        Start a new game
      </button>
    </div>
  );
};

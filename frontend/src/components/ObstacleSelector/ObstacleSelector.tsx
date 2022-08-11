import { MAX_OBSTACLES } from "consts";
import React from "react";
import { gameService } from "services";
import { emptyArray } from "utils";

import styles from "./ObstacleSelector.module.css";

export const ObstacleSelector: React.FC = () => {
  const chooseObstacleCount = (count: number) => () => {
    gameService.chooseObstacles(count);
  };
  return (
    <div className={styles.container}>
      <h2>Obstacles: </h2>
      <div className={styles.list}>
        {emptyArray(MAX_OBSTACLES + 1).map((_, index) => (
          <div className={styles.box} onClick={chooseObstacleCount(index)}>
            {index}
          </div>
        ))}
      </div>
    </div>
  );
};

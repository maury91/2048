import { GameMessage } from "components/GameMessage";
import { GridCell } from "components/GridCell";
import { ObstacleSelector } from "components/ObstacleSelector";
import React from "react";
import { useSelector } from "react-redux";
import { SwipeCallback, useSwipeable } from "react-swipeable";
import { boardSizeSelector, gameStatusSelector } from "store/game/selectors";
import { emptyArray } from "utils";

import styles from "./GameGrid.module.css";

interface GameGridProps {
  onSwiped: SwipeCallback;
}

export const GameGrid: React.FC<GameGridProps> = ({ onSwiped }) => {
  const size = useSelector(boardSizeSelector);
  const status = useSelector(gameStatusSelector);
  const handlers = useSwipeable({
    onSwiped,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });
  return (
    <div className={styles.container} {...handlers}>
      {status === "starting" && <ObstacleSelector />}
      {status !== "starting" &&
        emptyArray(size).map((_, row) => (
          <div key={row} className={styles.row}>
            {emptyArray(size).map((_, column) => (
              <GridCell key={column} row={row} column={column} />
            ))}
          </div>
        ))}
      {status === "lost" && <GameMessage>You Lost!</GameMessage>}
      {status === "won" && <GameMessage>You Win!</GameMessage>}
    </div>
  );
};

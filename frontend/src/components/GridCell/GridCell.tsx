import classNames from "classnames/bind";
import { CellContent } from "components/CellContent";
import React from "react";
import { useSelector } from "react-redux";
import { OBSTACLE_VALUE } from "shared/consts";
import { boardCellSelector } from "store/game/selectors";

import styles from "./GridCell.module.css";
import { getCellContent } from "./utils";

interface GridElementProps {
  row: number;
  column: number;
}

const cx = classNames.bind(styles);

export const GridCell: React.FC<GridElementProps> = ({ row, column }) => {
  const power = useSelector(boardCellSelector(row, column));
  return (
    <div
      className={cx("element", {
        empty: power === 0,
        block: power === OBSTACLE_VALUE,
        [`power${power % 11}`]: power > 0 && power !== OBSTACLE_VALUE,
      })}
      role="gridcell"
    >
      <CellContent content={getCellContent(power)} />
    </div>
  );
};

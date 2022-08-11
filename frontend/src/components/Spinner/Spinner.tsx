import React from "react";

import style from "./Spinner.module.css";

interface SpinnerProps {
  color?: string;
}

const defaultColor = "#333";

export const Spinner: React.FC<SpinnerProps> = ({ color = defaultColor }) => (
  // @ts-ignore
  <div style={{ "--color": color }} className={style.root} />
);

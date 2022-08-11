import React from "react";

import style from "./CellContent.module.css";

interface CellContentProps {
  content: string;
}

export const CellContent: React.FC<CellContentProps> = ({ content }) => {
  if (content === "") {
    return null;
  }
  const contentWidth = 36 + content.length * 8;
  return (
    <svg className={style.svg} viewBox={`0 0 ${contentWidth} ${contentWidth}`}>
      <text x="50%" y={contentWidth / 2 + 2}>
        {content}
      </text>
    </svg>
  );
};

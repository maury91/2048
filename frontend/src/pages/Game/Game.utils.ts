import { SwipeDirections } from "react-swipeable";
import { Direction } from "shared/types";

export const keyToGameDirection = (key: string): Direction | null => {
  switch (key) {
    case "Down": // IE/Edge specific value
    case "ArrowDown":
      return "down";
    case "Up": // IE/Edge specific value
    case "ArrowUp":
      return "up";
    case "Left": // IE/Edge specific value
    case "ArrowLeft":
      return "left";
    case "Right": // IE/Edge specific value
    case "ArrowRight":
      return "right";
  }
  return null;
};

export const swipeToGameDirection = (
  dir: SwipeDirections
): Direction | null => {
  switch (dir) {
    case "Down":
      return "down";
    case "Left":
      return "left";
    case "Up":
      return "up";
    case "Right":
      return "right";
  }
  return null;
};

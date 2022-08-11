export const SERVER_URL =
  process.env.REACT_APP_HOST ||
  `${window.location.protocol === "http:" ? "ws" : "wss"}://${
    window.location.host
  }`;
export const MAX_OBSTACLES = 5;

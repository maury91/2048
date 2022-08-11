import React from "react";
import { useSelector } from "react-redux";

import { Game } from "./pages/Game";
import { ServerConnection } from "./pages/ServerConnection";
import { UserPrompt } from "./pages/UserPrompt";
import { isServerConnectedSelector } from "./store/connection/selectors";
import { isUserConnectedSelector } from "./store/user/selectors";

const App: React.FC = () => {
  const isServerConnected = useSelector(isServerConnectedSelector);
  const isUserConnected = useSelector(isUserConnectedSelector);
  if (!isServerConnected) {
    return <ServerConnection />;
  }
  if (!isUserConnected) {
    return <UserPrompt />;
  }
  return <Game />;
};

export default App;

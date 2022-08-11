import React from "react";
import { useSelector } from "react-redux";
import {
  isServerConnectingSelector,
  serverConnectionErrorSelector,
} from "store/connection/selectors";

export const ServerConnection: React.FC = () => {
  const isConnecting = useSelector(isServerConnectingSelector);
  const connectionError = useSelector(serverConnectionErrorSelector);

  if (isConnecting) {
    return <h2>Connecting...</h2>;
  }

  if (connectionError) {
    return (
      <div>
        <h2>Can't connect</h2>
        <h3>{connectionError}</h3>
      </div>
    );
  }

  return null;
};

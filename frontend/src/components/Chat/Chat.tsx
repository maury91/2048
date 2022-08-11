import { ChatActions } from "components/ChatActions";
import { ChatMessages } from "components/ChatMessages";
import React from "react";

import styles from "./Chat.module.css";

export const Chat: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        <ChatMessages />
      </div>
      <div className={styles.actions}>
        <ChatActions />
      </div>
    </div>
  );
};

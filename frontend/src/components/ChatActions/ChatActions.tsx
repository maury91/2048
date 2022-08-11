import React from "react";
import { chatService } from "services";

import styles from "./ChatActions.module.css";

export const ChatActions: React.FC = () => {
  const [message, setMessage] = React.useState("");
  const sendMessage: React.FormEventHandler = (ev) => {
    ev.preventDefault();
    if (message.trim()) {
      chatService.sendMessage(message);
      setMessage("");
    }
  };
  return (
    <form className={styles.container} onSubmit={sendMessage}>
      <input
        className={styles.input}
        value={message}
        type="text"
        onChange={(ev) => setMessage(ev.target.value)}
      />
      <button className={styles.button} type="submit">
        →
      </button>
    </form>
  );
};

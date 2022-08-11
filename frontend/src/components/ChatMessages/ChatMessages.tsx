import React from "react";
import { useSelector } from "react-redux";
import { chatMessagesSelector } from "store/chat/selectors";

import styles from "./ChatMessages.module.css";

export const ChatMessages: React.FC = () => {
  const messages = useSelector(chatMessagesSelector);
  return (
    <>
      {messages.map(({ from, message }, index) => (
        <div className={styles.message} key={index}>
          <strong>{from}</strong>: {message}
        </div>
      ))}
    </>
  );
};

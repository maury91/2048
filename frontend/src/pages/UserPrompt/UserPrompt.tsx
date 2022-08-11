import { Spinner } from "components/Spinner";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store/types";
import { connectUser } from "store/user/actions";
import {
  isUserConnectingSelector,
  userErrorSelector,
} from "store/user/selectors";

import style from "./UserPrompt.module.css";

export const UserPrompt: React.FC = () => {
  const [name, setName] = React.useState("");
  const connecting = useSelector(isUserConnectingSelector);
  const userError = useSelector(userErrorSelector);
  const dispatch: AppDispatch = useDispatch();
  const connectToServer: React.FormEventHandler = (ev) => {
    ev.preventDefault();
    dispatch(connectUser(name));
  };
  return (
    <form className={style.form} onSubmit={connectToServer}>
      <div />
      <input
        className={style.input}
        type="text"
        value={name}
        placeholder="Choose a nickname"
        required
        onChange={(ev) => setName(ev.target.value)}
        disabled={connecting}
      />
      {userError !== null && <span className={style.error}>{userError}</span>}
      <button disabled={connecting} className={style.submit} type="submit">
        {connecting ? <Spinner color="white" /> : "Play!"}
      </button>
      <div />
    </form>
  );
};

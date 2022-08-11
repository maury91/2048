import { userService } from "services";
import { AppThunkAction } from "store/types";

import { connecting } from "./slice";

export const connectUser =
  (name: string): AppThunkAction<void> =>
  (dispatch) => {
    dispatch(connecting());
    userService.login(name);
  };

import { AnyAction, ThunkAction } from "@reduxjs/toolkit";

import { store } from "./index";

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunkAction<ReturnType, ExtraThunkArg = void> = ThunkAction<
  ReturnType,
  RootState,
  ExtraThunkArg,
  AnyAction
>;

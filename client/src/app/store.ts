import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

// Import Reducers From Slices
import userReducer from "features/user/reducer";
import cellReducer from "features/cell/reducer";
import uiReducer from "features/ui/reducer";
import todoReducer from "features/todo/reducer";

import { holochainMiddleware } from "services/reduxMiddleware";
import { APP_WS_URL } from "./constants";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cell: cellReducer,
    ui: uiReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(holochainMiddleware(APP_WS_URL)),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

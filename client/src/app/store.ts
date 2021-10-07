import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "@/features/user/reducer";
import { holochainMiddleware } from "@/services/redux-middleware";
import { APP_WS_URL } from "./constants";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(holochainMiddleware(APP_WS_URL)),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

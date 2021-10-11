import { createSlice, AnyAction } from "@reduxjs/toolkit";
import { RequestState } from "./types";

export const dataState: RequestState = {
  status: "SUCCESS",
};
export const loadingState: RequestState = {
  status: "LOADING",
};
export const errorState: RequestState = {
  status: "ERROR",
};
export const idleState: RequestState = {
  status: "IDLE",
};

export const isDataAction = (action: AnyAction) => {
  return action.type.endsWith("_SUCCESS");
};

export const isErrorAction = (action: AnyAction) => {
  return action.type.endsWith("_FAILURE");
};

export const isLoadingAction = (action: AnyAction) => {
  return action.type.endsWith("_REQUESTED");
};

const dataIndicator = createSlice({
  name: "data",
  initialState: { responseStatus: idleState },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isDataAction, (state) => {
      return { responseStatus: dataState };
    });
    builder.addMatcher(isLoadingAction, (state) => ({
      responseStatus: loadingState,
    }));
    builder.addMatcher(isErrorAction, (state) => ({
      responseStatus: errorState,
    }));
    builder.addDefaultCase((state) => ({
      responseStatus: idleState,
    }));
  },
});

export default dataIndicator.reducer;

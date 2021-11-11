import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Space,
  SpaceInfo,
  NewSpacePayload,
  DeleteSpacePayload,
  UpdateSpacePayload,
} from "./types";
import merge from "deepmerge";

export const initialState: Partial<Space> = {
  "0": { id: "0", todos: [] },
};

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    createSpace(state, action: PayloadAction<NewSpacePayload>) {
      const { spaces, id } = action.payload.space;
      return {
        ...state,
        [String(id)]: { space: space || [] },
      };
    },
    deleteSpace(state, action: PayloadAction<DeleteSpacePayload>) {
      delete state[action.payload.id];
    },
    updateSpace(state, action: PayloadAction<NewSpacePayload>) {
      const { space, id } = action.payload.space;
      return {
        ...state,
        [String(id)]: { spaces },
      };
    },
  },
});

export default spaceSlice.reducer;

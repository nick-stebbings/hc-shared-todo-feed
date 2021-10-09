import cellReducer from "./reducer";
import { RootState } from "@app/store";

export const getStringId = (state: RootState) => state.cell.stringId;

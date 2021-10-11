import cellReducer from "./reducer";
import { RootState } from "@app/store";

export const getStringId = (state: RootState) => {
  console.log(state);
  return state?.cell?.cellIdString;
};

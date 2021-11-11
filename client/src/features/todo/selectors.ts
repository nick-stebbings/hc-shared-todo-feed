import { RootState } from "app/store";

export const getCurrent = (state: RootState) => {
  return state?.todo?.currentList;
};

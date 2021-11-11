import { RootState } from "app/store";

export const getMyRedDots = (state: RootState) => {
  return state?.habit?.myRedDots;
};

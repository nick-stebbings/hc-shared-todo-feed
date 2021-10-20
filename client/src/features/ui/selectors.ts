import { RootState } from "app/store";

export const getRequestStatus = (state: RootState) => {
  return state?.ui.responseStatus.status;
};

import { RootState } from "app/store";

export const getStringId = (state: RootState) => {
  return state?.cell?.cellIdString;
};

export const getAgentPublicKey = (state: RootState) => {
  return state?.cell?.agentPublicKey;
};

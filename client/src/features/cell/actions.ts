import { CellId } from "services/reduxMiddleware";
import { AgentPubKeyB64 } from "@holochain-open-dev/core-types";

const SET_CELL_ID = "cell/setCellIdString";
const SET_AGENT_PUB_KEY = "cell/setAgentPublicKey";

const setCellId = (cellId: CellId) => {
  return {
    type: SET_CELL_ID,
    payload: cellId,
  };
};
const setAgentPublicKey = (agentPublicKey: AgentPubKeyB64) => {
  return {
    type: SET_AGENT_PUB_KEY,
    payload: agentPublicKey,
  };
};
export { setCellId, setAgentPublicKey };

import { Buffer } from "buffer";
import { AgentPubKeyB64 } from "@holochain-open-dev/core-types";
import { AgentProfile } from "@features/user/types";

export const convertUint8ToHash = (arr: Uint8Array): AgentPubKeyB64 =>
  Buffer.from(arr).toString("base64");

export const getMyAgentProfile = (
  agentKey: AgentPubKeyB64,
  payload: [AgentProfile]
): AgentProfile => {
  for (let result of payload) {
    console.log("result :>> ", result);
    if (agentKey == result.agent_pub_key) return result;
  }
};

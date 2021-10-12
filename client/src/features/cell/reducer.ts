import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AgentPubKeyB64 } from "@holochain-open-dev/core-types";

interface CellState {
  cellIdString: string | null;
  agentPublicKey: AgentPubKeyB64 | null;
}

export const initialState: CellState = {
  cellIdString: null,
  agentPublicKey: null,
};

export const cellSlice = createSlice({
  name: "cell",
  initialState,
  reducers: {
    setCellIdString(state, action: PayloadAction<string>) {
      state.cellIdString = action.payload;
    },
    setAgentPublicKey(state, action: PayloadAction<AgentPubKeyB64>) {
      state.agentPublicKey = action.payload;
    },
  },
});

export default cellSlice.reducer;

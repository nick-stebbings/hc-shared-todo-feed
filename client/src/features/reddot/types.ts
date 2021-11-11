import {
  AgentPubKeyB64,
  HeaderHashB64,
  EntryHashB64,
} from "@holochain-open-dev/core-types";

import { TimeFrame } from "app/types";

export interface RedDot {
  timeframe: TimeFrame;
  habit_hash: HeaderHashB64;
}

export interface RedDotInfo {
  entry: RedDot;
  headerhash: HeaderHashB64;
  entryhash: EntryHashB64;
}

export interface NewRedDotPayload {
  redDotId: string;
  redDot: RedDot;
}

export interface DeleteRedDotPayload {
  redDotId: string;
}

export interface UpdateRedDotPayload {
  redDotId: string;
  redDotPatch: Partial<RedDot>;
}

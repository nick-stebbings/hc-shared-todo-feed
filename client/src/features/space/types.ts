import {
  AgentPubKeyB64,
  HeaderHashB64,
  EntryHashB64,
} from "@holochain-open-dev/core-types";

import { Duration, DateTime } from "@types/luxon";

interface TimeFrame {
  from_date: DateTime;
  to_date: DateTime;
  length: Duration;
}

export interface Space {
  timeframe: TimeFrame;
  habit_hash: HeaderHashB64;
}

export interface SpaceInfo {
  entry: Space;
  headerhash: HeaderHashB64;
  entryhash: EntryHashB64;
}

export interface NewSpacePayload {
  spaceId: string;
  space: Space;
}

export interface DeleteSpacePayload {
  spaceId: string;
}

export interface UpdateSpacePayload {
  spaceId: string;
  spacePatch: Partial<Space>;
}

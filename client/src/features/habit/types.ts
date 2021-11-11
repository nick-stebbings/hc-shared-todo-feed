import {
  AgentPubKeyB64,
  HeaderHashB64,
  EntryHashB64,
} from "@holochain-open-dev/core-types";

import { TimeFrame } from "app/types";

interface HabitMeta {
  name: string;
  id: number;
}

export interface Habit {
  timeframe: TimeFrame;
  list_hash: HeaderHashB64;
  meta: HabitMeta;
}

export interface HabitInfo {
  entry: Habit;
  headerhash: HeaderHashB64;
  entryhash: EntryHashB64;
}

export interface NewHabitPayload {
  id: number;
  habit: Habit;
}

export interface DeleteHabitPayload {
  id: number;
}

export interface UpdateHabitPayload {
  id: number;
  habitPatch: Partial<Habit>;
}

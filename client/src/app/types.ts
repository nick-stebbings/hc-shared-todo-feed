import { Duration, DateTime } from "@types/luxon";

export interface TimeFrame {
  from_date: DateTime;
  to_date: DateTime;
  length: Duration;
}

export type Dictionary<T> = { [key: string]: T };

import userReducer from "./reducer";
import { RootState } from "@app/store";

export const getName = (state: RootState) => state.user.name;
export const getAge = (state: RootState) => state.user.age;

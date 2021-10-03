import userReducer from "./reducer";
import { RootState } from "../../app/store";

export const getAge = (state: RootState) => state.user.age;

import { userSlice } from "./reducer";
import { createZomeCallAsyncAction } from "connoropolous-hc-redux-middleware";

import { createAsyncAction } from "typesafe-actions";
import { RootState } from "../../app/store";

const { gotOlder, doubledAge } = userSlice.actions;

const GET_USER_REQUEST = "fetch_users_request";
const GET_USER_FAIL = "fetch_users_fail";
const GET_USER_SUCCESS = "fetch_users_success";

const fetchAction = createAsyncAction(
  GET_USER_REQUEST,
  GET_USER_FAIL,
  GET_USER_SUCCESS
)<undefined, RootState[], Error>();
console.log(
  "success typesafe string",
  fetchAction.success([{ user: { name: "Dave", age: 34 } }])
);

export { gotOlder, doubledAge };

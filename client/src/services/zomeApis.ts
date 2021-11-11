// *** Centralised repo of action creators for each zome and each zome function.
// *** This allows action creators to be mocked during testing.

import { createZomeCallAsyncAction } from "./reduxMiddleware";

interface APIs {
  // One per zome
  profiles: object;
  redDot: object;
}

export enum RedDotActionTypes {}
// "create_todolist",
// "get_all_todolists",
// "update_todolist",

export enum ProfilesZomeActionStrings {
  "create_profile",
  "get_all_profiles",
  "get_my_profile",
  "get_agent_profile",
  "search_profiles",
}

const apis: APIs = { profiles: {}, redDot: {} };

for (const zomeFunctionName in ProfilesZomeActionStrings) {
  if (isNaN(+zomeFunctionName)) {
    apis.profiles[zomeFunctionName] = createZomeCallAsyncAction(
      "profiles",
      zomeFunctionName
    );
  }
}

for (const zomeFunctionName in RedDotActionTypes) {
  if (isNaN(+zomeFunctionName)) {
    apis.redDot[zomeFunctionName] = createZomeCallAsyncAction(
      "red_dot", // TODO rename this
      zomeFunctionName
    );
  }
}

export default apis;

// *** Centralised repo of action creators for each zome and each zome function.
// *** This allows action creators to be mocked during testing.

import { createZomeCallAsyncAction } from "./reduxMiddleware";

interface APIs {
  // One per zome
  profiles: object;
  todofeed: object;
}

enum userProfilesActionStrings {
  "create_profile",
  "get_all_profiles",
  "get_my_profile",
  "get_agent_profile",
  "search_profiles",
}

enum todoFeedActionStrings {
  "update_todolist",
}

const apis: APIs = { profiles: {}, todofeed: {} };

for (const zomeFunctionName in userProfilesActionStrings) {
  if (isNaN(+zomeFunctionName)) {
    apis.profiles[zomeFunctionName] = createZomeCallAsyncAction(
      "profiles",
      zomeFunctionName
    );
  }
}

for (const zomeFunctionName in todoFeedActionStrings) {
  if (isNaN(+zomeFunctionName)) {
    apis.todofeed[zomeFunctionName] = createZomeCallAsyncAction(
      "instafeed",
      zomeFunctionName
    );
  }
}

export default apis;

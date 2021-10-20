// *** Centralised repo of action creators for each zome and each zome function.
// *** This allows action creators to be mocked during testing.

import { createZomeCallAsyncAction } from "./reduxMiddleware";
// import {todoActions} from '@features/todo/actions'

interface APIs {
  // One per zome
  profiles: object;
  instafeed: object;
}

enum userProfilesActionStrings {
  "create_profile",
  "get_all_profiles",
  "get_my_profile",
  "get_agent_profile",
  "search_profiles",
}

const apis: APIs = { profiles: {}, instafeed: {} };

for (const zomeFunctionName in userProfilesActionStrings) {
  if (isNaN(+zomeFunctionName)) {
    apis.profiles[zomeFunctionName] = createZomeCallAsyncAction(
      "profiles",
      zomeFunctionName
    );
  }
}

export default apis;

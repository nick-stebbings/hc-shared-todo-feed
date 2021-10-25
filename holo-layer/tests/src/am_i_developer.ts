const sleep = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

import { InstallAgentApp, _log, Zome_Name } from "./common";

module.exports = async (orchestrator) => {
  orchestrator.registerScenario("Am I the developer?", async (s, t) => {
    // Alice is the developer
    const alice_cell = await InstallAgentApp(s, "alice-cell", true);

    let result_alice = await alice_cell.call(Zome_Name, "am_i_developer", null);

    t.deepEqual(result_alice, true);

    await sleep(10);

    // Bob is not the developer

    const bob_cell = await InstallAgentApp(s, "bob-cell", false);

    let result_bob = await bob_cell.call(Zome_Name, "am_i_developer", null);

    t.deepEqual(result_bob, false);

    await sleep(10);
  });
};

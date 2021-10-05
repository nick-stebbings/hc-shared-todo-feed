const sleep = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

import { InstallAgentApp, _log } from "./common";

module.exports = async (orchestrator) => {
  orchestrator.registerScenario("Am I the developer?", async (s, t) => {
    const alice_cell = await InstallAgentApp(s, "alice-cell");

    let result = await alice_cell.call("instafeed", "am_i_developer", null);
    // TODO add test
    await sleep(10);
  });
};

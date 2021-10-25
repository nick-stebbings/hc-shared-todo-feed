const sleep = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

import path from "path";
import fs from "fs";

import { InstallAgentsApp, _log, Zome_Name } from "./common";

const enum zome_function {
  create_todolist = "create_todolist",
}

module.exports = async (orchestrator) => {
  orchestrator.registerScenario("create todolist", async (s, t) => {
    const [alice] = await InstallAgentsApp(s, ["alice"]);

    //*********** Test Case: create_todolist, Success
    const todolist = {
      id: "1",
      todos: ["1", "2", "3"],
    };

    let create_todolist_result_alice = await alice.call(
      Zome_Name,
      zome_function.create_todolist,
      todolist
    );
    _log(
      "Create_todolist_Result",
      create_todolist_result_alice.toString("base64")
    );
    t.ok(create_todolist_result_alice);

    await sleep(10);

    const todolist2 = {
      id: "2",
      todos: ["1", "2", "3"],
    };
    let create_todolist_result_alice_2 = await alice.call(
      Zome_Name,
      zome_function.create_todolist,
      todolist2
    );
    t.ok(create_todolist_result_alice_2);

    await sleep(10);
  });
};

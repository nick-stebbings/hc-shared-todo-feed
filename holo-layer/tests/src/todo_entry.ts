const sleep = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

import path from "path";
import fs from "fs";

import { InstallAgentsApp, _log, Zome_Name } from "./common";

const enum zome_function {
  create_todolist = "create_todolist",
  get_todolist_element = "get_todolist_element",
  get_all_todolists = "get_all_todolists",
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

    //*********** Test Case: create_todolist, Failure due to no id
    const todolist2 = {
      id: "",
      todos: ["1", "2", "3"],
    };

    try {
      let create_todolist_result_alice_2 = await alice.call(
        Zome_Name,
        zome_function.create_todolist,
        todolist2
      );
      t.fail();
    } catch (e) {
      t.deepEqual(
        e?.data?.data,
        'Wasm error while working with Ribosome: Guest("Id can not be null or empty")'
      );
    }
    await sleep(10);

    //*********** Test Case: Get Element Alice

    let alice_read_element = await alice.call(
      Zome_Name,
      zome_function.get_todolist_element,
      todolist.id
    );

    _log("alice read element", alice_read_element);
    t.ok(alice_read_element);
    await sleep(10);

    //*********** Test Case: Get Element Bob
    const [bob] = await InstallAgentsApp(s, ["bob"]);

    let bob_read_element = await bob.call(
      Zome_Name,
      zome_function.get_todolist_element,
      todolist.id
    );

    t.ok(bob_read_element);

    _log("bob read element", bob_read_element);
    await sleep(10);

    //*********** Test Case: Get All Todolists
    let get_all_todolists_result = await alice.call(
      Zome_Name,
      zome_function.get_all_todolists,
      null
    );
    _log("alice get all todolists", get_all_todolists_result);
    t.ok(get_all_todolists_result);
    t.equal(get_all_todolists_result.length, 2);
    await sleep(10);
  });
};

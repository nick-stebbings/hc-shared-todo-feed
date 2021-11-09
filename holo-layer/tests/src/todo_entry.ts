const sleep = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

import { InstallAgentsApp, _log, Zome_Name } from "./common";

const enum zome_function {
  create_todolist = "create_todolist",
  get_todolist_entry = "get_todolist_entry",
  get_all_todolists = "get_all_todolists",
}

module.exports = async (orchestrator) => {
  orchestrator.registerScenario("create todolist", async (s, t) => {
    const [alice] = await InstallAgentsApp(s, ["alice"]);

    //*********** Test Case 1: create_todolist, Success
    const todolist = {
      id: "1",
      todos: { "1": "Get mail", "2": "Buy a paper", "3": "Get milk" },
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

    // *********** Test Case 2: create_todolist, Failure due to no id
    const todolist2 = {
      id: "",
      todos: { "1": "Get mail", "2": "Buy a paper", "3": "Get milk" },
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
        "Source chain error: InvalidCommit error: Id can not be null or empty"
      );
    }

    await sleep(10);

    //*********** Test Case 3: create_todolist, Failure due to no todos
    const todolist3 = {
      id: "1",
      todos: "",
    };

    try {
      let create_todolist_result_alice_3 = await alice.call(
        Zome_Name,
        zome_function.create_todolist,
        todolist3
      );

      t.fail();
    } catch (e) {
      t.deepEqual(
        e?.data,
        "Source chain error: InvalidCommit error: Todos can not be null or empty"
      );
    }

    await sleep(10);

    // //*********** Test Case 4: Get Element Alice

    // let alice_read_element = await alice.call(
    //   Zome_Name,
    //   zome_function.get_todolist_entry,
    //   todolist
    // );

    // _log("alice read element", alice_read_element);

    // t.ok(alice_read_element);

    // await sleep(10);

    // //*********** Test Case: Get Element Bob

    // const [bob] = await InstallAgentsApp(s, ["bob"]);

    // let bob_read_element = await bob.call(
    //   Zome_Name,
    //   zome_function.get_todolist_entry,
    //   todolist
    // );

    // t.ok(bob_read_element);

    // _log("bob read element", bob_read_element);

    // await sleep(10);

    //*********** Test Case 5: Get All Todolists
    const todolist4 = {
      id: "2",
      todos: { "1": "Go to doctors", "2": "Buy a car", "3": "Go for a run" },
    };

    let create_todolist_result_alice4 = await alice.call(
      Zome_Name,
      zome_function.create_todolist,
      todolist4
    );

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

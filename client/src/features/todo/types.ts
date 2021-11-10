import {
  AgentPubKeyB64,
  HeaderHashB64,
  EntryHashB64,
} from "@holochain-open-dev/core-types";

export type Dictionary<T> = { [key: string]: T };
export interface Todo {
  id: string | number;
  description: string;
  status: boolean;
}
export interface TodoList {
  id: string;
  todos: Todo[];
}
export interface TodoLists extends Dictionary<TodoList> {}

export interface TodoListInfo {
  entry: TodoList;
  headerhash: HeaderHashB64;
  entryhash: EntryHashB64;
}
export interface TodoListsInfo {
  lists: Dictionary<TodoList>;
  headerhash: HeaderHashB64;
  entryhash: EntryHashB64;
}

/* Example Zome Call fetch payload
 {goals: {
      '132,45,36,158,213,62,21,120,228,141,162,183,92,71,210,179,18,86,139,152,12,51,224,97,148,222,212,119,254,5,255,217,64,196,13,220,69,205,21[:cell_id_divider:]132,32,36,140,119,60,160,7,172,66,249,63,132,200,196,69,68,56,72,42,57,203,48,11,120,67,76,190,97,162,243,213,133,15,75,242,169,76,216': {},
      '132,45,36,196,79,177,111,45,202,202,47,58,27,214,103,223,206,230,239,196,55,251,75,115,41,148,138,43,114,36,240,27,97,91,128,205,116,20,192[:cell_id_divider:]132,32,36,140,119,60,160,7,172,66,249,63,132,200,196,69,68,56,72,42,57,203,48,11,120,67,76,190,97,162,243,213,133,15,75,242,169,76,216': {
        'uhCkkyJEzW5YyngF_-Nj1uAN8aYmZ9v_rCHOrGpHmXbPeUIvJjLCl': {
          content: 'another',
          user_hash: 'uhCAkjHc8oAesQvk_hMjERUQ4SCo5yzALeENMvmGi89WFD0vyqUzY',
          user_edit_hash: 'uhCAkjHc8oAesQvk_hMjERUQ4SCo5yzALeENMvmGi89WFD0vyqUzY',
          timestamp_created: 1636410496,
          timestamp_updated: 1636434248,
          hierarchy: 'Trunk',
          status: 'Uncertain',
          tags: null,
          description: '',
          time_frame: null,
          is_imported: false,
          headerHash: 'uhCkkyJEzW5YyngF_-Nj1uAN8aYmZ9v_rCHOrGpHmXbPeUIvJjLCl'
        },
        uhCkkH56cmX17efBixiIh6rzaONIDcUeFwthWat3a3lXM1TisJU59: {
          content: 'anothero one',
          user_hash: 'uhCAkjHc8oAesQvk_hMjERUQ4SCo5yzALeENMvmGi89WFD0vyqUzY',
          user_edit_hash: 'uhCAkjHc8oAesQvk_hMjERUQ4SCo5yzALeENMvmGi89WFD0vyqUzY',
          timestamp_created: 1636410505,
          timestamp_updated: 1636410564,
          hierarchy: 'NoHierarchy',
          status: 'Uncertain',
          tags: null,
          description: '',
          time_frame: null,
          is_imported: false,
          headerHash: 'uhCkkH56cmX17efBixiIh6rzaONIDcUeFwthWat3a3lXM1TisJU59'
        },
        'uhCkkI-qASp_x732jerMCH0FuJUhLyRMsBwzwqMOshb8_UHSzn0K9': {
          content: 'hhghghg',
          user_hash: 'uhCAkjHc8oAesQvk_hMjERUQ4SCo5yzALeENMvmGi89WFD0vyqUzY',
          user_edit_hash: null,
          timestamp_created: 1636434438,
          timestamp_updated: null,
          hierarchy: 'NoHierarchy',
          status: 'Uncertain',
          tags: null,
          description: '',
          time_frame: null,
          is_imported: false,
          headerHash: 'uhCkkI-qASp_x732jerMCH0FuJUhLyRMsBwzwqMOshb8_UHSzn0K9'
        }
      }
}
    

    edges: {
    '132,45,36,196,79,177,111,45,202,202,47,58,27,214,103,223,206,230,239,196,55,251,75,115,41,148,138,43,114,36,240,27,97,91,128,205,116,20,192[:cell_id_divider:]132,32,36,140,119,60,160,7,172,66,249,63,132,200,196,69,68,56,72,42,57,203,48,11,120,67,76,190,97,162,243,213,133,15,75,242,169,76,216': {
      uhCkkd2wEj33OvK506oA8mEHZYqTiCE2A40BIQzbrBBHViBRAfXCQ: {
        parent_address: 'uhCkkH56cmX17efBixiIh6rzaONIDcUeFwthWat3a3lXM1TisJU59',
        child_address: 'uhCkkI-qASp_x732jerMCH0FuJUhLyRMsBwzwqMOshb8_UHSzn0K9',
        randomizer: 1636434438117,
        is_imported: false,
        headerHash: 'uhCkkd2wEj33OvK506oA8mEHZYqTiCE2A40BIQzbrBBHViBRAfXCQ'
      }
    }
  }}

  */

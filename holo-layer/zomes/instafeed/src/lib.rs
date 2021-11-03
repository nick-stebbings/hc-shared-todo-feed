use hdk::prelude::holo_hash::EntryHashB64;
use hdk::prelude::*;
use crate::helpers::progenitor::DnaProperties;
use crate::entries::todo::TodoList;
use crate::entries::todo::TodoListDTO;
use crate::entries::todo::AllTodoListDTO;
mod helpers;
mod entries;

entry_defs![TodoList::entry_def(), Path::entry_def()];

#[hdk_extern]
pub fn who_am_i(_: ()) -> ExternResult<AgentPubKey> {
    Ok(agent_info()?.agent_latest_pubkey)
}

#[hdk_extern]
pub fn get_dna_properties(_: ()) -> ExternResult<ZomeInfo> {
    DnaProperties::get()
}

#[hdk_extern]
pub fn am_i_developer(_: ()) -> ExternResult<bool> {
    DnaProperties::am_i_developer()
}

#[hdk_extern]
pub fn create_todolist(input: TodoListDTO) -> ExternResult<EntryHashB64> {
    entries::todo::create_todolist(input)
}

#[hdk_extern]
pub fn get_todolist(input: TodoListDTO) -> ExternResult<TodoList> {
    entries::todo::get_todolist(input)
}

#[hdk_extern]
pub fn get_all_todolists(_input: TodoList) -> ExternResult<Vec<AllTodoListDTO>> {
    entries::todo::get_all_todolists()
}

#[hdk_extern]
pub fn update_todolist(_input: TodoList) -> ExternResult<EntryHashB64> {
    unimplemented!();
}
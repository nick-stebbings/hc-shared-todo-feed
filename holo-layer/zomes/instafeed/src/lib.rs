use hdk::prelude::*;
use crate::entries::todo::TodoList;
// use crate::entries::todo::TodoListDTO;
use crate::helpers::progenitor::DnaProperties;
use holo_hash::EntryHashB64;
mod helpers;
mod entries;

entry_defs![TodoList::entry_def(), Path::entry_def()];

#[hdk_extern]
pub fn who_am_i(_: ()) -> ExternResult<AgentPubKey> {
    Ok(agent_info()?.agent_latest_pubkey)
}

#[hdk_extern]
pub fn get_dna_properties(_: ()) -> ExternResult<DnaProperties> {
    DnaProperties::get()
}

#[hdk_extern]
pub fn am_i_developer(_: ()) -> ExternResult<bool> {
    DnaProperties::am_i_developer()
}

#[hdk_extern]
pub fn create_todolist(input: TodoList) -> ExternResult<EntryHashB64> {
    unimplemented!();
}

#[hdk_extern]
pub fn update_todolist(input: TodoList) -> ExternResult<EntryHashB64> {
    unimplemented!();
}
// use ::holo_hash::HoloHashB64;
use hdk::prelude::*;
use hdk_crud::{
    signals::{ActionSignal},
    wire_element::WireElement,
    retrieval::retrieval::FetchOptions,
};
use crate::helpers::progenitor::DnaProperties;
use crate::entries::todo::*;
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

// #[hdk_extern]
// pub fn get_todolist_entry(input: TodoListDTO) -> ExternResult<TodoList> {
//     entries::todo::get_todolist_entry(input)
// }

// #[hdk_extern]
pub fn get_all_todolists(_: ()) -> ExternResult<Vec<WireElement<TodoList>>> { 
    inner_fetch_todolists(FetchOptions::All, GetOptions::content())
}

/*
SIGNALS
*/

#[derive(Debug, Serialize, Deserialize, SerializedBytes)]
#[serde(untagged)]
pub enum SignalType {
    TodoList(ActionSignal<TodoList>),
}

pub fn get_peers() -> ExternResult<Vec<AgentPubKey>> {
    Ok(Vec::new())
}

pub fn get_peers_latest() -> ExternResult<Vec<AgentPubKey>> {
    get_peers()
}
pub fn get_peers_content() -> ExternResult<Vec<AgentPubKey>> {
    get_peers()
}

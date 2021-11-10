use hdk::prelude::*;
use hdk_crud::{
    crud,
    signals::{ActionSignal},
};
use crate::{get_peers_content, SignalType};

pub mod anchors;
pub mod validation;

pub fn _err(reason: &str) -> WasmError {
    WasmError::Guest(String::from(reason))
}

fn convert_to_receiver_signal(signal: ActionSignal<TodoList>) -> SignalType {
    SignalType::TodoList(signal)
}
#[hdk_entry(id="todolist")]
#[derive(Clone, PartialEq)]
pub struct TodoList {
    pub id: String,
    pub todos: String,
}

impl TodoList {
    pub fn new(id: &str, todos:&str) -> Self {
        TodoList {
            id: id.trim().to_string().clone(),
            todos: todos.to_string().clone(), //as Json
        }
    }
}

crud!(
    TodoList,
    todolist,
    "todolist",
    get_peers_content,
    convert_to_receiver_signal
);
#[derive(Clone, Serialize, Deserialize, Debug, SerializedBytes)]
pub struct TodoListDTO {
    pub id: String,
    pub todos: String,
}
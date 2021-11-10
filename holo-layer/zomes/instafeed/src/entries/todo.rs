use hdk::prelude::*;
use hdk_crud::{
    crud,
    signals::{ActionSignal},
};
use std::collections::BTreeMap;
use std::fmt;
use crate::{get_peers_content, SignalType};

pub mod anchors;
pub mod validation;

pub fn err(reason: &str) -> WasmError {
    WasmError::Guest(String::from(reason))
}

fn convert_to_receiver_signal(signal: ActionSignal<TodoList>) -> SignalType {
    SignalType::TodoList(signal)
}
#[hdk_entry(id="todolist", visibility="public")]
#[derive(Clone, PartialEq)]
pub struct TodoList {
    pub id: String,
    pub todos: BTreeMap<String, String>,
}

impl TodoList {
    pub fn new(id: &str, todos:BTreeMap<String,String>) -> Self {
        TodoList {
            id: id.trim().to_string().clone(),
            todos: todos.clone(),
        }
    }
}
#[derive(Debug, Serialize, Deserialize, SerializedBytes, Clone, PartialEq)]
pub struct UIEnum(pub String);

// #[derive(Serialize, Deserialize, Debug, SerializedBytes, Clone, PartialEq)]
// #[serde(from = "UIEnum")]
// #[serde(into = "UIEnum")]
// // pub enum Todos {
//     List,
// }

// impl From<UIEnum> for Todos {
//     fn from(ui_enum: UIEnum) -> Self {
//         match ui_enum.0.as_str() {
//             // "Incomplete" => Self::Incomplete,
//             // "InProcess" => Self::InProcess,
//             // "Complete" => Self::Complete,
//             // "InReview" => Self::InReview,
//             _ => Self::List,
//         }
//     }
// }
// impl From<Todos> for UIEnum {
//     fn from(todos_status: Todos) -> Self {
//         Self(todos_status.to_string())
//     }
// }

// impl fmt::Display for Todos {
//     fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//         write!(f, "{:?}", self)
//     }
// }

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
    pub todos: BTreeMap<String, String>,
}

impl TodoListDTO {
    pub fn validate(&self) -> Result<(), String> {
        let mut msgs: Vec<String> = Vec::new();
        let mut result: bool = true;

        // if self.id.trim().is_empty() {
        //     msgs.push("Id can not be null or empty".to_string());
        //     result = false;
        // }
        // if self.todos.is_empty() {
        //     msgs.push("Todos can not be null or empty".to_string());
        //     result = false;
        // }

        if result == false {
            return Err(msgs.join("\r"));
        } else {
            return Ok(());
        }
    }
}

pub fn get_todolist_entry(input: TodoListDTO) -> ExternResult<TodoList> {
    if let Err(e) = input.validate() {
        return Err(WasmError::Guest(e));
    }
    let hash: EntryHash = hash_entry(TodoList::new(&input.id, input.todos))?;
    let element: Element = get(EntryHash::from(hash), GetOptions::default())?.ok_or(err( "Can't find a list entry with that content") )?;
    
    let option: Option<TodoList> = element.entry().to_app_option()?;
    let todolist = option.ok_or(err("No Todolist in Option"))?;
    Ok(todolist)
}

// pub fn create_todolist(input: TodoListDTO) -> ExternResult<EntryHashB64> {
//     if let Err(e) = input.validate() {
//         return Err(WasmError::Guest(e));
//     }

//     let new_todolist = TodoList::new(&input.id, input.todos);
//     let _todolist_header_hash = create_entry(new_todolist.clone())?;

//     let entry_hash = hash_entry(new_todolist.clone())?;

//     let all_todolists_anchor = anchors::get_all_todolists_anchor_entry()?;

//     create_link(
//         all_todolists_anchor,
//         entry_hash,
//         LinkTag::new(anchors::ALL_TODOLIST_ANCHOR),
//     )?;

//     let todolist_entry_hash = hash_entry(new_todolist)?;
//     Ok(EntryHashB64::from(todolist_entry_hash))
// }

// #[derive(Clone, Serialize, Deserialize, Debug, SerializedBytes)]
// pub struct AllTodoListDTO {
//     pub id: String,
//     pub todos: BTreeMap<String, String>,
//     pub entry_hash: EntryHashB64
// }

// pub fn get_all_todolists () -> ExternResult<Vec<AllTodoListDTO>> {
//     let all_todolists_anchor: EntryHash = anchors::get_all_todolists_anchor_entry()?;
//     let mut all_todolists_dto: Vec<AllTodoListDTO> = Vec::new();
//     let linked_todolists: Vec<Link> = get_links(all_todolists_anchor, Some(LinkTag::new(anchors::ALL_TODOLIST_ANCHOR)))?;

//     for link in linked_todolists.into_iter() {
//         match get(link.target.clone(), GetOptions::content())? {
//             Some(element) => {
//                 let entry: Option<TodoList> = element.entry().to_app_option()?;

//                 match entry {
//                     Some(todolist) => {
//                         all_todolists_dto.push(AllTodoListDTO { id: todolist.id, todos: todolist.todos,
//                         entry_hash: EntryHashB64::from(link.target) });
//                     }
//                     None => {}
//                 }
//             }
            
//                     None => {}
//         }
//     }
//     Ok(all_todolists_dto)
// }
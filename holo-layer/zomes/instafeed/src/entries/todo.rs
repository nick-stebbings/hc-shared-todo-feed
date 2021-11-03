use hdk::prelude::*;
use holo_hash::EntryHashB64;
pub mod anchors;

#[hdk_entry(id="todolist", visibility="public")]
#[derive(Clone)]
pub struct TodoList {
    pub id: String,
}

impl TodoList {
  pub fn new(id: &str) -> Self {
        TodoList {
            id: id.trim().to_string().clone(),
            // todos: id.trim().to_string().clone(),
        }
  }
}

#[derive(Clone, Serialize, Deserialize, Debug, SerializedBytes)]
pub struct TodoListDTO {
    pub id: String,
    // pub todos: Vec<&'static str>
}

impl TodoListDTO {
    pub fn validate(&self) -> Result<(), String> {
        let mut msgs: Vec<String> = Vec::new();
        let mut result: bool = true;

        if self.id.trim().is_empty() {
            msgs.push("Id can not be null or empty".to_string());
            result = false;
        }

        if result == false {
            return Err(msgs.join("\r"));
        } else {
            return Ok(());
        }
    }
}

pub fn create_todolist(input: TodoListDTO) -> ExternResult<EntryHashB64> {
    if let Err(e) = input.validate() {
        return Err(WasmError::Guest(e));
    }

    let new_todolist = TodoList::new(&input.id);
    let _todolist_header_hash = create_entry(new_todolist.clone())?;

    let entry_hash = hash_entry(new_todolist.clone())?;

    let all_todolists_anchor = anchors::get_all_todolists_anchor_entry()?;

    create_link(
        all_todolists_anchor,
        entry_hash,
        LinkTag::new(anchors::ALL_TODOLIST_ANCHOR),
    )?;

    let todolist_entry_hash = hash_entry(new_todolist)?;
    Ok(EntryHashB64::from(todolist_entry_hash))
}
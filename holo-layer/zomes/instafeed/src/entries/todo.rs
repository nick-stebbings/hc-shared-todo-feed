use hdk::prelude::*;

// pub struct TodoListDTO {
//   pub id: String
// }

// #[hdk_entry(id="todolist", visibility = "public")]
// #[derive(Serialize, Deserialize, Clone, Debug,SerializedBytes)]
#[hdk_entry(id="todolist")]
pub struct TodoList {
  pub id: String,
}

// pub struct TodoListDTO {
//    pub id: String,
//    pub todos: Vec<&'static str>
// }

impl TodoList {
  pub fn new() -> () {
    unimplemented!();
  }
}
// #[hdk_extern]
// pub fn create_todolist(input: SomeExternalInput) -> ExternResult<HeaderHash> {
//     unimplemented!();
// }

// #[hdk_extern]
// pub fn update_todolist(input: SomeExternalInput) -> ExternResult<HeaderHash> {
//     unimplemented!();
// }


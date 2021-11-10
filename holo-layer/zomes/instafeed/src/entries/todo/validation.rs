use hdk::prelude::*;
use crate::TodoList;

use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {
    #[error("Deserialization Failed")]
    DeserializationFailed,

    #[error("Wasm Error {0}")]
    Wasm(WasmError)
}

impl From<Error> for ValidateCallbackResult {
    fn from(e: Error) -> Self {
        ValidateCallbackResult::Invalid(e.to_string())
    }
}

impl From<Error> for ExternResult<ValidateCallbackResult> {
    fn from(e: Error) -> Self {
        Ok(e.into())
    }
}

#[hdk_extern]
fn validate_create_entry_todolist(validate_data: ValidateData) -> ExternResult<ValidateCallbackResult> {
    let proposed_list = match TodoList::try_from(&validate_data.element) {
        Ok(list) => list,
        Err(e) => return Ok(ValidateCallbackResult::Invalid(e.to_string())),
    };
    let mut msgs: Vec<String> = Vec::new();
    let mut result: bool = true;

    if proposed_list.id.trim().is_empty() {
        msgs.push("Id can not be null or empty".to_string());
        result = false;
    }
    if proposed_list.todos == "{}" {
        msgs.push("Todos can not be null or empty".to_string());
        result = false;
    }

    if result == false {
        return Ok(ValidateCallbackResult::Invalid(msgs.join("\r")));
    } else {
        return Ok(ValidateCallbackResult::Valid);
    }
}
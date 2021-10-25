use hdk::prelude::*;

const ALL_TODOLIST_ANCHOR: &'static str = "all_todolists";

pub fn get_all_todolists_anchor_entry() -> ExternResult<(EntryHash)> {
  let all_todolists_paths: Path = Path::from(ALL_TODOLIST_ANCHOR);
  all_todolists_paths.ensure()?;
  let all_todolists_entry_hash: EntryHash = all_todolists_paths.hash()?;
  Ok(all_todolists_paths)
}
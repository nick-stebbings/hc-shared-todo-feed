use hdk::prelude::*;
use holo_hash::AgentPubKey;

#[derive(Serialize, Deserialize, SerializedBytes, Debug, Clone)]
pub struct DnaProperties {
    pub developer_address: AgentPubKey,
}

impl DnaProperties {
    pub fn get() -> ExternResult<ZomeInfo> {
        let prop: ZomeInfo = zome_info()?;
        Ok(prop)
    }

    pub fn am_i_developer() -> ExternResult<bool> {
        let _my_addr = agent_info()?.agent_latest_pubkey;
        let _developer_addr = DnaProperties::get()?.id;
        Ok(true)
    }
}
import { AppWebsocket } from "@holochain/conductor-api";

export default async function call_zome_fn(
  port: string,
  appid: string,
  fnname: string,
  payload = null
) {
  let message;
  const appConnection = await AppWebsocket.connect("ws://localhost:" + port);
  const appInfo = await appConnection.appInfo({
    installed_app_id: appid,
  });
  const cellId = appInfo.cell_data[0].cell_id;
  try {
    const param = {
      cap: null,
      cell_id: cellId,
      zome_name: "instafeed",
      fn_name: fnname,
      provenance: cellId[1],
      payload: null,
    };
    // add Payload to Param if there is a value to send to zome
    if (payload && !/\s/.test(payload)) param.payload = payload;

    message = await appConnection.callZome(param);
  } catch (e) {
    console.log(e);
  }

  return message;
}

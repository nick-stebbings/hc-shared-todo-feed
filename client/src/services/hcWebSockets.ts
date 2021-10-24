import {
  AppWebsocket,
  InstalledCell,
  CellId,
  AppSignalCb,
} from "@holochain/conductor-api";
import { APP_WS_URL, APP_ID } from "../app/constants";

interface CellClient {
  cellId: CellId;
  callZome(zomeName: string, fnName: string, payload: any): Promise<any>;
}
class HolochainClient implements CellClient {
  constructor(
    protected appWebsocket: AppWebsocket,
    protected cellData: InstalledCell
  ) {}

  get cellId() {
    return this.cellData.cell_id;
  }

  callZome(zomeName: string, fnName: string, payload: any): Promise<any> {
    return this.appWebsocket.callZome({
      cap: null as any,
      cell_id: this.cellId,
      zome_name: zomeName,
      fn_name: fnName,
      payload: payload,
      provenance: this.cellId[1],
    });
  }

  async addSignalHandler(signalHandler: AppSignalCb) {
    const appWs = await AppWebsocket.connect(
      this.appWebsocket.client.socket.url,
      15000,
      signalHandler
    );

    return {
      unsubscribe: () => {
        appWs.client.close();
      },
    };
  }
}

export default async function setupAppWsConnection() {
  const appWebsocket = await AppWebsocket.connect(APP_WS_URL, 12000);
  const appInfo = await appWebsocket.appInfo({
    installed_app_id: APP_ID,
  });
  const cellData = appInfo.cell_data[0];
  const cellClient = new HolochainClient(appWebsocket, cellData);

  return cellClient;
}

import React from "react";
import { render } from "react-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { App } from "./App";

import { convertUint8ToHash } from "./app/utils";
import { cellIdToString } from "services/redux-middleware";
import connect from "services/hcWebSockets";

import { setCellId, setAgentPublicKey } from "@features/cell/actions";

connect().then((client: any) => {
  const cellIdString = cellIdToString(client.cellData.cell_id);
  const agentPublicKey = convertUint8ToHash(client.cellData.cell_id[1]);

  store.dispatch(setCellId(cellIdString));
  store.dispatch(setAgentPublicKey(agentPublicKey));
});

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

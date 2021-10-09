import React from "react";
import { render } from "react-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";

import { App } from "./App";
import { setCellId } from "@features/cell/actions";

import { cellIdToString } from "@services/redux-middleware";
import connect from "@services/hcWebSockets";

connect().then((client: any) => {
  const cellIdString = cellIdToString(client.cellData.cell_id);
  store.dispatch(setCellId(cellIdString));
  console.log(cellIdString);
});

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

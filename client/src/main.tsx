import React from "react";
import { render } from "react-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";

import { App } from "./App";

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

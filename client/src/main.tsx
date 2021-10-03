import React from "react";
import { render } from "react-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";

import App from "./App";
import "./assets/styles/index.css";

// Make a zome function call to get the Agent's public key and log the result
import zomeFn from "./hcWebSockets";
zomeFn("8081", "insta", "who_am_i").then((result) => {
  console.log(result);
});

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

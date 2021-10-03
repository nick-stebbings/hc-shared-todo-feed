import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
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

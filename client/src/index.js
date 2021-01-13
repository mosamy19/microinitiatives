import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import jwtDecode from "jwt-decode";
import * as types from "./store/actions/types";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import CustomSnackbar from "./components/custom-snackbar/CustomSnackbar";
import Lottieforcelebration from "./components/lottie-animation";

let token = localStorage.getItem("auth_token");
if (token) {
  let decode = jwtDecode(token);
  setAuthToken(token);
  store.dispatch({
    type: types.SET_USER,
    payload: {
      user: decode,
    },
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Fragment>
        <App />
        <CustomSnackbar />
        <Lottieforcelebration />
      </React.Fragment>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../src/store/reducers/reducer";
import thunk from "redux-thunk";
import "./styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Routes from "./components/Routes/Routes";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ != "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : fn => fn
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);

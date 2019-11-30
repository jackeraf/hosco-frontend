import React from "react";
import ReactDOM from "react-dom";
import { initialState } from "store";
import "./styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Routes from "./components/Routes/Routes";
import { TrackListProvider } from "containers/contexts/TrackListProvider";

ReactDOM.render(
  <TrackListProvider initialState={initialState}>
    <Routes />
  </TrackListProvider>,
  document.getElementById("root")
);

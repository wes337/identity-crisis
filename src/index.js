import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import AppLoader from "./AppLoader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppLoader />
  </React.StrictMode>
);

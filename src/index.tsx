import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Paths from "./components/routes/Paths";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Paths />
  </React.StrictMode>
);

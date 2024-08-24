import React from "react";
import ReactDOM from "react-dom/client";
import { CapsuleDemo } from "@usecapsule/shared-examples";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CapsuleDemo framework="React" />;
  </React.StrictMode>
);

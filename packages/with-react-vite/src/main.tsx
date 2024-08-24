import React from "react";
import ReactDOM from "react-dom/client";
import { CapsuleDemo } from "@usecapsule/shared-examples";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CapsuleDemo framework="Vite/React" />
  </React.StrictMode>
);

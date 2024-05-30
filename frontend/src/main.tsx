// ========= MODULES ==========
import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/_globals.scss";

// ======= COMPONENTS =========
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

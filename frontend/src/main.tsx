// ============================
// ========= MODULES ==========
// ============================
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/_globals.scss";
// ============================
// ======= COMPONENTS =========
// ============================
import AppRoutes from "./AppRoutes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </React.StrictMode>
);

// ============================
// ========= MODULES ==========
// ============================
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./styles/_globals.scss";

// ============================
// ======= COMPONENTS =========
// ============================
import AppRoutes from "./AppRoutes";

// Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);

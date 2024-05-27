// ========= MODULES ==========
import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/_globals.scss";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// ======= COMPONENTS =========
import App from "./app";

// Create a QueryClient instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

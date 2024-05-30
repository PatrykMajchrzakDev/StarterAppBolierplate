import { Suspense } from "react";

import styles from "./styles/main-provider.module.scss";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/react-query";

// ======= COMPONENTS =========
import CircularProgress from "@mui/material/CircularProgress";
import Notification from "@/components/UI/Notification/Notification";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <div className={styles.centeredContent}>
          <CircularProgress size="xl" />
        </div>
      }
    >
      {/* Provides queryClient to component tree that is necessary to @tanstack/react-query to work */}
      <QueryClientProvider client={queryClient}>
        {/* This makes sure that notifications persist upon route changing */}
        {<Notification />}

        {/* Show ReactQueryDevTools if there is DEV */}
        {import.meta.env.DEV && <ReactQueryDevtools />}
        {children}
      </QueryClientProvider>
    </Suspense>
  );
};

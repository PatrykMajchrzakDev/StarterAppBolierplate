// ========= MODULES ==========
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useUser } from "@/lib/auth";
// ======= COMPONENTS =========
import CircularProgress from "@mui/material/CircularProgress";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

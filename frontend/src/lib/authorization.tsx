export enum ROLES {
  ADMIN = "ADMIN",
  MOD = "MOD",
  USER = "USER",
}

type RoleTypes = keyof typeof ROLES;

// This components functionality is to

// ========= MODULES ==========
import { useCallback } from "react";

import { useUser } from "@/lib/auth";

export const useAuthorization = () => {
  const { data } = useUser();

  if (!data) {
    throw Error("User does not exists!");
  }

  const checkAccess = useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0 && data.user) {
        return allowedRoles?.includes(data?.user.role);
      }

      return true;
    },
    [data.user]
  );
  return { checkAccess, role: data.user.role };
};

type AuthorizationProps = {
  children: React.ReactNode;
  forbiddenFallback: React.ReactNode;
  allowedRoles: RoleTypes[];
};

export const Authorization = ({
  children,
  allowedRoles,
  forbiddenFallback,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;
  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};

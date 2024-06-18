import { Outlet } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";

const AppRoot = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default AppRoot;

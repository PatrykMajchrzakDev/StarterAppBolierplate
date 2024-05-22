// ============================
// ========= MODULES ==========
// ============================
import { Route, Routes, Navigate } from "react-router-dom";

// ============================
// ======= COMPONENTS =========
// ============================
import Layout from "./layouts/Layout";
import SignIn from "@/components/Login/SignIn";
import SignUp from "@/components/Login/SignUp";

const AppRoutes = () => {
  return (
    <Routes>
      {/* IF USER TYPES WRONG ROUTE THEN REDIRECT TO "/" */}
      <Route path="*" element={<Navigate to="/" />}></Route>

      {/* ====================== */}
      {/* ======= ROUTES ======= */}
      {/* ====================== */}

      {/* ======= ROOT =======*/}
      <Route path="/" element={<Layout>HOME PAGE</Layout>}></Route>

      {/*======= AUTH =======*/}
      <Route
        path="/signin"
        element={
          <Layout>
            <SignIn />
          </Layout>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <Layout>
            <SignUp />
          </Layout>
        }
      ></Route>

      {/* ======= USER ======= */}
      <Route
        path="/user-profile"
        element={<span>USER PROFILE PAGE</span>}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;

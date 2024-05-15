// ============================
// ========= MODULES ==========
// ============================
import { Route, Routes, Navigate } from "react-router-dom";

// ============================
// ======= COMPONENTS =========
// ============================
import Layout from "./layouts/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* IF USER TYPES WRONG ROUTE THEN REDIRECT TO "/" */}
      <Route path="*" element={<Navigate to="/" />}></Route>

      {/* ====================== */}
      {/* ======= ROUTES ======= */}
      {/* ====================== */}
      <Route path="/" element={<Layout>HOME PAGE</Layout>}></Route>
      <Route
        path="/user-profile"
        element={<span>USER PROFILE PAGE</span>}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;

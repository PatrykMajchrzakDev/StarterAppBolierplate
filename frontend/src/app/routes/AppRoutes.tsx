// This components functionality is to provide routing system for different routes in the app

// ========= MODULES ==========
import { Route, Routes, Navigate } from "react-router-dom";

// ======= COMPONENTS =========
import Layout from "../../layouts/Layout";
import SignIn from "@/components/Login/SignIn";
import SignUp from "@/components/Login/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import AppRoot from "./Root";
import Dashboard from "./Dashboard";
import UserProfile from "./user/UserProfile";
import UserSettings from "./user/UserSettings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* IF USER TYPES WRONG ROUTE THEN REDIRECT TO "/" */}
      <Route path="*" element={<Navigate to="/" />}></Route>

      {/* ======= LANDING =======*/}
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

      {/* ======= APP ======= */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppRoot />
          </ProtectedRoute>
        }
      >
        {/* ======= /APP NESTED CHILDREN ======= */}

        {/* USER ROUTES */}
        <Route path="user-profile" element={<UserProfile />} />
        <Route path="user-profile/settings" element={<UserSettings />} />

        {/* DASHBOARD */}
        <Route path="" element={<Dashboard />} />

        {/* Add more nested routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;

// This components functionality is to provide routing system for different routes in the app

// ========= MODULES ==========
import { Route, Routes, Navigate } from "react-router-dom";

// ======= COMPONENTS =========
import SignIn from "@/components/Auth/SignIn";
import SignUp from "@/components/Auth/SignUp";
import ProtectedRoute from "@/app/routes/ProtectedRoute";
import AppRoot from "@/app/routes/Root";
import Dashboard from "@/app/routes/App/Dashboard";
import UserProfile from "@/app/routes/App/user/UserProfile";
import UserSettings from "@/app/routes/App/user/UserSettings";
import AdminDashboard from "@/app/routes/admin/Dashboard";
import ForgotPasword from "@/components/Auth/ForgotPassword";
import ResendEmail from "@/components/Auth/ResendEmail";
import ResetPassword from "@/components/Auth/ResetPassword";
import LandingLayout from "@/layouts/LandingLayout";
import LandingPage from "@/app/routes/Landing/Landing";
import AuthRedirect from "@/app/routes/AuthRedirect";
import Pricing from "@/app/routes/General/Pricing";
import PaymentFallback from "./General/PaymentFallback";

const AppRoutes = () => {
  return (
    <Routes>
      {/* IF USER TYPES WRONG ROUTE THEN REDIRECT TO "/" */}
      <Route path="*" element={<Navigate to="/" />}></Route>

      {/* ======= LANDING =======*/}
      <Route
        path="/"
        element={
          <LandingLayout>
            <LandingPage />
          </LandingLayout>
        }
      ></Route>

      {/*======= AUTH REDIRECT =======*/}
      <Route path="/auth/callback" element={<AuthRedirect />}></Route>

      {/*======= AUTH =======*/}
      <Route
        path="/signin"
        element={
          <LandingLayout>
            <SignIn />
          </LandingLayout>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <LandingLayout>
            <SignUp />
          </LandingLayout>
        }
      ></Route>
      <Route
        path="/forgotpassword"
        element={
          <LandingLayout>
            <ForgotPasword />
          </LandingLayout>
        }
      ></Route>
      <Route
        path="/resetpassword"
        element={
          <LandingLayout>
            <ResetPassword />
          </LandingLayout>
        }
      ></Route>
      <Route
        path="/resendemail"
        element={
          <LandingLayout>
            <ResendEmail />
          </LandingLayout>
        }
      ></Route>
      <Route
        path="/pricing"
        element={
          <LandingLayout>
            <Pricing />
          </LandingLayout>
        }
      ></Route>

      {/* ======= PAYMENT FALLBACK ======= */}

      {/* Payment successfull */}
      <Route
        path="/payment/success"
        element={
          <LandingLayout>
            <PaymentFallback isOk={true} />
          </LandingLayout>
        }
      ></Route>

      {/* Payment cancelled */}
      <Route
        path="/payment/cancelled"
        element={
          <LandingLayout>
            <PaymentFallback isOk={false} />
          </LandingLayout>
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
        <Route path="user-profile/admin" element={<AdminDashboard />} />
        {/* DASHBOARD */}
        <Route path="" element={<Dashboard />} />

        {/* Add more nested routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;

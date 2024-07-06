import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const AuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store the token
      Cookies.set("token", token);

      // Redirect to the app
      navigate("/app");
    } else {
      // If no token is found, redirect to signin
      navigate("/signin");
    }
  }, [location, navigate]);

  return null;
};

export default AuthRedirect;

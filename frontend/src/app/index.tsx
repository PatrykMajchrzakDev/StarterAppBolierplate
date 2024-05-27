import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./main-provider";
import AppRoutes from "@/app/routes/AppRoutes";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
};

export default App;

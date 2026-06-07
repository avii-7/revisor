import AuthPage from "./Components/Authentication/AuthPage"
import { BrowserRouter, Routes, Route } from "react-router"
import DashboardPage from "./Components/Dashboard/DashboardPage";
import CallbackHandlePage from "./Components/Authentication/GoogleAuthCallback";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="auth" >
          <Route index element={<AuthPage />} />
          <Route path="google/callback" element={<CallbackHandlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import AuthPage from "./components/Authentication/AuthPage"
import { BrowserRouter, Routes, Route } from "react-router"
import DashboardPage from "./components/Dashboard/DashboardPage";
import CallbackHandlePage from "./components/Authentication/GoogleAuthCallback";

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

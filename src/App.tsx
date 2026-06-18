import AuthPage from "./components/authentication/AuthPage"
import { BrowserRouter, Routes, Route } from "react-router"
import DashboardPage from "./components/dashboard/DashboardPage";
import CallbackHandlePage from "./components/authentication/GoogleAuthCallback";
import CreateItemPage from "./components/createItem/CreateItemPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="create" element={<CreateItemPage />} />
        <Route path="auth" >
          <Route index element={<AuthPage />} />
          <Route path="google/callback" element={<CallbackHandlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

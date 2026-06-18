import AuthPage from "./components/authentication/AuthPage.tsx"
import { HashRouter, Routes, Route } from "react-router"
import DashboardPage from "./components/dashboard/DashboardPage.tsx";
import CallbackHandlePage from "./components/authentication/GoogleAuthCallback.tsx";
import CreateItemPage from "./components/createItem/CreateItemPage.tsx";

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="create" element={<CreateItemPage />} />
        <Route path="auth" >
          <Route index element={<AuthPage />} />
          <Route path="google/callback" element={<CallbackHandlePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

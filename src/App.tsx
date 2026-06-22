import AuthPage from "./components/authentication/AuthPage.tsx"
import { Routes, Route, BrowserRouter } from "react-router"
import DashboardPage from "./components/dashboard/DashboardPage.tsx";
import CallbackHandlePage from "./components/authentication/GoogleAuthCallback.tsx";
import CreateItemPage from "./components/createItem/CreateItemPage.tsx";

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

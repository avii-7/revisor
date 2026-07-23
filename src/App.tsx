import LoginPage from "./components/login/LoginPage.tsx"
import { Routes, Route, BrowserRouter, useNavigate } from "react-router"
import DashboardPage from "./components/dashboard/DashboardPage.tsx";
import CallbackHandlePage from "./components/login/GoogleAuthCallback.tsx";
import CreateItemPage from "./components/createItem/CreateItemPage.tsx";
import ProblemLibraryPage from "./components/problemLibrary/ProblemLibraryPage.tsx";
import RevisionSessionPage from "./components/revisionSession/RevisionSessionPage.tsx";
import { useEffect } from "react";
import { authenticationService } from "./shared/authentication/index.ts";
import UserManager from "./shared/utilities/UserManager.ts";
import ProtectedRoute from "./components/routes/ProtectedRoutes.tsx";

function App() {

  const navigate = useNavigate();

  useEffect(() => {

    const handler = () => {
      UserManager.logout();
      navigate("/auth");
    };

    authenticationService.setAuthenticationExpiredHandler(handler);

    return () => {
      authenticationService.setAuthenticationExpiredHandler(undefined);
    };
  }, [navigate]);

  return (

    <Routes>

      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<DashboardPage />} />
        <Route path="create" element={<CreateItemPage />} />
        <Route path="problems" element={<ProblemLibraryPage />} />
        <Route path="revision" element={<RevisionSessionPage />} />
      </Route>

      <Route path="/auth" >
        <Route index element={<LoginPage />} />
        <Route path="google/callback" element={<CallbackHandlePage />} />
      </Route>
    </Routes>
    // </BrowserRouter>/
  );
}

export default App;

import LoginPage from "./components/login/LoginPage.tsx"
import { Routes, Route, useNavigate } from "react-router"
import DashboardPage from "./components/dashboard/DashboardPage.tsx";
import CallbackHandlePage from "./components/login/GoogleAuthCallback.tsx";
import CreateItemPage from "./components/createItem/CreateItemPage.tsx";
import ProblemLibraryPage from "./components/problemLibrary/ProblemLibraryPage.tsx";
import RevisionSessionPage from "./components/revisionSession/RevisionSessionPage.tsx";
import { useEffect } from "react";
import { authenticationService } from "./shared/authentication/index.ts";

function App() {

  const navigate = useNavigate();

  useEffect(() => {

    const handler = async () => {
      try {
        await authenticationService.logout();
      }
      catch (err) {
        console.error("Error logging out:", err);
      }
      finally {
        navigate("/auth");
      }
    };

    console.log("Setting up handlers");

    authenticationService.setAuthenticationExpiredHandler(handler);

    return () => {
      console.log("Removing handlers");
      authenticationService.setAuthenticationExpiredHandler(undefined);
    };
  }, [navigate]);

  return (

    <Routes>

      <Route index element={<DashboardPage />} />
      <Route path="create" element={<CreateItemPage />} />
      <Route path="edit/:id" element={<CreateItemPage />} />
      <Route path="problems" element={<ProblemLibraryPage />} />
      <Route path="revision" element={<RevisionSessionPage />} />

      <Route path="/auth" >
        <Route index element={<LoginPage />} />
        <Route path="google/callback" element={<CallbackHandlePage />} />
      </Route>
    </Routes>
    // </BrowserRouter>/
  );
}

export default App;

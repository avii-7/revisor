import AuthPage from "./Components/Authentication/AuthPage"
import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./Components/Dashboard/HomePage";
import CallbackHandlePage from "./Components/Authentication/GoogleAuthCallback";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="auth" >
          <Route index element={<AuthPage />} />
          <Route path="google/callback" element={<CallbackHandlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

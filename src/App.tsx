import AuthPageV2 from "./Components/Authentication/AuthPage"
import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./Components/Dashboard/HomePage";
import CallbackHandlePage from "./Components/Authentication/GoogleAuthCallback";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="auth" >
          <Route index element={<AuthPageV2 />} />
          <Route path="google/callback" element={<CallbackHandlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

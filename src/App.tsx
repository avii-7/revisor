import AuthPageV2 from "./components/Authentication/AuthPageV2"
import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./components/HomePage/HomePage";
import CallbackHandlePage from "./components/Authentication/GoogleAuthCallback";

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

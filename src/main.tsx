import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CookiesProvider } from 'react-cookie';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider
      defaultSetOptions={{
        path: "/",
        expires: (() => {
          // Will expire next month from now.
          const dateObject = new Date();
          dateObject.setMonth(dateObject.getMonth() + 1);
          return dateObject;
        })(),
      }}
    >
      <App />
    </CookiesProvider>
  </StrictMode>,
);

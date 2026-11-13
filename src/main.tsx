import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CookiesProvider } from 'react-cookie';
import { authenticationService } from "./shared/authentication/index.ts";
import apiClient from "./network/ApiClient.ts";
import { BrowserRouter } from "react-router";

authenticationService.configure(apiClient);

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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </StrictMode>,
);

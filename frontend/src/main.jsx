import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { WebsiteSettingsProvider } from "./context/WebsiteSettingsContext.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import App from "./App.jsx";
import "./index.css";
import "./i18n/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <WebsiteSettingsProvider>
          <AuthProvider>
            <App />
            <Toaster position="top-right" />
          </AuthProvider>
        </WebsiteSettingsProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

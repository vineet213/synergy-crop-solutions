import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import LanguageWelcomeModal from "./components/common/LanguageWelcomeModal.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import { useWebsiteSettings } from "./context/WebsiteSettingsContext.jsx";
import { setSEOSettings } from "./hooks/useSEO.js";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(false);
  const { settings } = useWebsiteSettings();

  useEffect(() => {
    const shown = localStorage.getItem("languageWelcomeShown");
    if (!shown) {
      setShowWelcome(true);
    }
  }, []);

  useEffect(() => {
    if (settings) {
      setSEOSettings(settings);
    }
  }, [settings]);

  return (
    <>
      <ScrollToTop />
      {showWelcome && (
        <LanguageWelcomeModal onComplete={() => setShowWelcome(false)} />
      )}
      <AppRoutes />
    </>
  );
}

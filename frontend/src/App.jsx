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

  useEffect(() => {
    if (settings?.assets?.favicon) {
      let link = document.querySelector("link[rel='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = `/${settings.assets.favicon}`;
    }
  }, [settings?.assets?.favicon]);

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

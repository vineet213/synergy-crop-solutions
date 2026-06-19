import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import LanguageWelcomeModal from "./components/common/LanguageWelcomeModal.jsx";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem("languageWelcomeShown");
    if (!shown) {
      setShowWelcome(true);
    }
  }, []);

  return (
    <>
      {showWelcome && (
        <LanguageWelcomeModal onComplete={() => setShowWelcome(false)} />
      )}
      <AppRoutes />
    </>
  );
}

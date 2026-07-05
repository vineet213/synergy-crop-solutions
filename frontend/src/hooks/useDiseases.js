import { useState, useEffect } from "react";
import diseaseService from "../services/diseaseService.js";

export function usePublicDiseases() {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await diseaseService.getPublicDiseases();
        if (!mounted) return;
        setDiseases(data || []);
      } catch (err) {
        if (!mounted) return;
        setError(err.response?.data?.message || err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  return { diseases, loading, error };
}

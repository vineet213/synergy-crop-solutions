import { useState, useEffect } from "react";
import cropService from "../services/cropService.js";

export function usePublicCrops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await cropService.getPublicCrops();
        if (!mounted) return;
        setCrops(data || []);
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

  return { crops, loading, error };
}

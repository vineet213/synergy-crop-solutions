import { useState, useEffect, useCallback } from "react";
import certificationService from "../services/certificationService.js";

export function usePublicCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await certificationService.getPublicCertifications();
        if (!mounted) return;
        setCertifications(data || []);
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

  return { certifications, loading, error };
}

export function useAdminCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await certificationService.adminListCertifications();
      setCertifications(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = useCallback(async (id) => {
    await certificationService.adminDeleteCertification(id);
    setCertifications((prev) => prev.filter((c) => c._id !== id));
  }, []);

  return { certifications, loading, error, reload: load, remove };
}

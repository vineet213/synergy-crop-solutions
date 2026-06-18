import { useState, useEffect, useCallback } from "react";
import distributorService from "../services/distributorService.js";

export function usePublicDistributors(params = {}) {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await distributorService.getPublicDistributors(params);
        if (!mounted) return;
        setDistributors(data || []);
      } catch (err) {
        if (!mounted) return;
        setError(err.response?.data?.message || err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [JSON.stringify(params)]);

  return { distributors, loading, error };
}

export function useAdminDistributors() {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await distributorService.adminListDistributors();
      setDistributors(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = useCallback(async (id) => {
    await distributorService.adminDeleteDistributor(id);
    setDistributors((prev) => prev.filter((d) => d._id !== id));
  }, []);

  return { distributors, loading, error, reload: load, remove };
}

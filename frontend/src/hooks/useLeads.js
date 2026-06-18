import { useState, useEffect, useCallback } from "react";
import leadService from "../services/leadService.js";

export function useAdminLeads(params = {}) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await leadService.adminListLeads(params);
      setLeads(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => { load(); }, [load]);

  const remove = useCallback(async (id) => {
    await leadService.adminDeleteLead(id);
    setLeads((prev) => prev.filter((l) => l._id !== id));
  }, []);

  const update = useCallback(async (id, payload) => {
    const updated = await leadService.adminUpdateLead(id, payload);
    setLeads((prev) => prev.map((l) => (l._id === id ? updated : l)));
    return updated;
  }, []);

  return { leads, loading, error, reload: load, remove, update };
}

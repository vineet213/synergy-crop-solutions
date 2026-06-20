import { useState, useEffect, useCallback } from "react";
import testimonialService from "../services/testimonialService.js";

export function usePublicTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await testimonialService.getPublicTestimonials();
        if (!mounted) return;
        setTestimonials(data || []);
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

  return { testimonials, loading, error };
}

export function useAdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await testimonialService.adminListTestimonials();
      setTestimonials(data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = useCallback(async (id) => {
    await testimonialService.adminDeleteTestimonial(id);
    setTestimonials((prev) => prev.filter((t) => t._id !== id));
  }, []);

  return { testimonials, loading, error, reload: load, remove };
}

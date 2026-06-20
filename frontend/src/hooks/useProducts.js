import { useState, useEffect, useCallback } from "react";
import productService from "../services/productService.js";

export function usePublicProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProducts(params);
        if (!mounted) return;
        setProducts(data.data || []);
      } catch (err) {
        if (!mounted) return;
        setError(err.response?.data?.message || err.message || "Failed to load products");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [JSON.stringify(params), version]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);

  return { products, loading, error, reload };
}

export function useProductBySlug(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!slug) {
        if (mounted) { setLoading(false); setProduct(null); }
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductBySlug(slug);
        if (!mounted) return;
        setProduct(data || null);
      } catch (err) {
        if (!mounted) return;
        if (err.response?.status === 404) {
          setProduct(null);
        } else {
          setError(err.response?.data?.message || err.message || "Failed to load product");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [slug]);

  return { product, loading, error };
}

export function usePublicProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!id) {
        if (mounted) { setLoading(false); setProduct(null); }
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getPublicProduct(id);
        if (!mounted) return;
        if (data) {
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (err) {
        if (!mounted) return;
        if (err.response?.status === 404) {
          setProduct(null);
        } else {
          setError(err.response?.data?.message || err.message || "Failed to load product");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  return { product, loading, error };
}

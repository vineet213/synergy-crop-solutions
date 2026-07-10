import { useMemo } from "react";
import enrichmentData from "../data/productEnrichment.js";

export default function useEnrichedProduct(product) {
  return useMemo(() => {
    if (!product) return null;

    const slug = product.slug;
    const enrichment = enrichmentData[slug];

    if (!enrichment) return product;

    const merged = { ...product };

    if (enrichment.videoUrl !== undefined) merged.videoUrl = enrichment.videoUrl;
    if (enrichment.cfu !== undefined) merged.cfu = enrichment.cfu;

    return merged;
  }, [product]);
}

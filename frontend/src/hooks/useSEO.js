import { useEffect, useRef } from "react";

const BASE_URL = "https://synergycrops.com";

const FALLBACK = {
  title: "Synergy Crop Solutions",
  description:
    "Synergy Crop Solutions provides innovative agricultural products, crop protection solutions, bio fertilizers, bio pesticides, fungicides, micronutrients, and distributor support in Maharashtra & Karnataka.",
  keywords:
    "Agriculture, Bio Fertilizers, Bio Pesticides, Fungicides, Micronutrients, Crop Protection, Farming Solutions, Synergy Crop Solutions",
};

let _settingsCache = null;

export function setSEOSettings(settings) {
  _settingsCache = settings;
}

function getSettings() {
  return _settingsCache;
}

function upsertMeta(attr, attrValue, content) {
  if (!content) return;
  const selector = `meta[${attr}="${attrValue}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function useSEO(options = {}) {
  const prev = useRef(null);

  useEffect(() => {
    const {
      title,
      description,
      keywords,
      canonical,
      type = "website",
    } = options;

    const s = getSettings();
    const siteName = s?.company?.name || FALLBACK.title;
    const pageTitle = title ? `${title} | ${siteName}` : siteName;
    const pageDesc = description || FALLBACK.description;
    const pageKeywords = keywords || FALLBACK.keywords;
    const canonicalUrl = canonical
      ? `${BASE_URL}${canonical}`
      : BASE_URL;

    if (prev.current === pageTitle) return;
    prev.current = pageTitle;

    document.title = pageTitle;

    upsertMeta("name", "description", pageDesc);
    upsertMeta("name", "keywords", pageKeywords);
    upsertMeta("name", "author", siteName);

    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", pageDesc);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", siteName);
    upsertMeta("property", "og:url", canonicalUrl);

    upsertMeta("property", "twitter:card", "summary_large_image");
    upsertMeta("property", "twitter:title", pageTitle);
    upsertMeta("property", "twitter:description", pageDesc);

    upsertLink("canonical", canonicalUrl);

    const lang = localStorage.getItem("appLanguage") || "en";
    document.documentElement.setAttribute("lang", lang);
  }, [options.title, options.description, options.keywords, options.canonical, options.type]);
}

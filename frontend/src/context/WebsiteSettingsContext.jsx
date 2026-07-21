import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import websiteSettingsService from "../services/websiteSettingsService.js";

const WebsiteSettingsContext = createContext(null);

const DEFAULTS = {
  company: {
    name: "Synergy Crop Solutions",
    tagline: "Residue-Free Agriculture",
    address: "Pune, Maharashtra, India",
    city: "Pune",
    state: "Maharashtra",
    pinCode: "",
  },
  contact: {
    phoneNumbers: [],
    whatsappNumber: "",
    email: "contact@synergycrops.com",
    officeHours: "Mon – Sat, 9:00 AM – 6:00 PM",
  },
  location: {
    googleMapsEmbedUrl: "",
  },
  socialMedia: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
  website: {
    footerText: "Modern agricultural solutions for sustainable growth.",
    copyrightText: "All rights reserved.",
  },
  assets: {
    logo: "",
    favicon: "",
  },
  certificates: [],
};

function mergeWithDefaults(data) {
  if (!data) return DEFAULTS;
  return {
    company: { ...DEFAULTS.company, ...(data.company || {}) },
    contact: { ...DEFAULTS.contact, ...(data.contact || {}) },
    location: { ...DEFAULTS.location, ...(data.location || {}) },
    socialMedia: { ...DEFAULTS.socialMedia, ...(data.socialMedia || {}) },
    website: { ...DEFAULTS.website, ...(data.website || {}) },
    assets: { ...DEFAULTS.assets, ...(data.assets || {}) },
    certificates: data.certificates || [],
  };
}

export function WebsiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULTS);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await websiteSettingsService.getPublicSettings();
      setSettings(mergeWithDefaults(data));
    } catch {
      setSettings(DEFAULTS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const refreshSettings = useCallback(async () => {
    await fetchSettings();
  }, [fetchSettings]);

  const value = { settings, isLoading, refreshSettings };

  return (
    <WebsiteSettingsContext.Provider value={value}>
      {children}
    </WebsiteSettingsContext.Provider>
  );
}

export function useWebsiteSettings() {
  const context = useContext(WebsiteSettingsContext);
  if (!context) {
    throw new Error("useWebsiteSettings must be used within a WebsiteSettingsProvider");
  }
  return context;
}

export { DEFAULTS as defaultSettings };

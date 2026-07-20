import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enNav from "./locales/en/navigation.json";
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enProducts from "./locales/en/products.json";
import enTestimonials from "./locales/en/testimonials.json";
import enCertifications from "./locales/en/certifications.json";
import enAdmin from "./locales/en/admin.json";
import hiNav from "./locales/hi/navigation.json";
import hiCommon from "./locales/hi/common.json";
import hiHome from "./locales/hi/home.json";
import hiProducts from "./locales/hi/products.json";
import hiTestimonials from "./locales/hi/testimonials.json";
import hiCertifications from "./locales/hi/certifications.json";
import hiAdmin from "./locales/hi/admin.json";
import mrNav from "./locales/mr/navigation.json";
import mrCommon from "./locales/mr/common.json";
import mrHome from "./locales/mr/home.json";
import mrProducts from "./locales/mr/products.json";
import mrTestimonials from "./locales/mr/testimonials.json";
import mrCertifications from "./locales/mr/certifications.json";
import mrAdmin from "./locales/mr/admin.json";
import knNav from "./locales/kn/navigation.json";
import knCommon from "./locales/kn/common.json";
import knHome from "./locales/kn/home.json";
import knProducts from "./locales/kn/products.json";
import knTestimonials from "./locales/kn/testimonials.json";
import knCertifications from "./locales/kn/certifications.json";
import knAdmin from "./locales/kn/admin.json";

const savedLang = localStorage.getItem("appLanguage") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { navigation: enNav, common: enCommon, home: enHome, products: enProducts, testimonials: enTestimonials, certifications: enCertifications, admin: enAdmin },
    hi: { navigation: hiNav, common: hiCommon, home: hiHome, products: hiProducts, testimonials: hiTestimonials, certifications: hiCertifications, admin: hiAdmin },
    mr: { navigation: mrNav, common: mrCommon, home: mrHome, products: mrProducts, testimonials: mrTestimonials, certifications: mrCertifications, admin: mrAdmin },
    kn: { navigation: knNav, common: knCommon, home: knHome, products: knProducts, testimonials: knTestimonials, certifications: knCertifications, admin: knAdmin },
  },
  lng: savedLang,
  fallbackLng: "en",
  ns: ["navigation", "common", "home", "products", "testimonials", "certifications", "admin"],
  defaultNS: "navigation",
  interpolation: { escapeValue: false },
});

export default i18n;

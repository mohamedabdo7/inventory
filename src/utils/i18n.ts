import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

// Import translations manually (only for small projects)
import ar from "../assets/locals/ar/translation.json";
import en from "../assets/locals/en/translation.json";

// Detect browser language first, then fallback to localStorage, then English
const detectedLang = navigator.language.split("-")[0] || localStorage.getItem("i18nextLng") || "en";

const resources = {
  en: {
    common: en, // Rename namespace for modular support
  },
  ar: {
    common: ar,
  },
};

i18n
  .use(Backend) // Remove if not using external API
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false, // Change to true for debugging
    lng: detectedLang,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    ns: ["common"], // Define namespaces (modular files)
    defaultNS: "common",
    saveMissing: true,

    interpolation: {
      escapeValue: false, // Prevent XSS
    },

    resources,
    react: {
      useSuspense: false,
    },

    returnNull: false, // Prevents returning `null` for missing keys
  });

// ✅ Automatically update `lang` and `dir` attributes on language change
i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng);
  document.documentElement.setAttribute("dir", i18n.dir(lng));
});

// ✅ Ensure the correct initial language settings
document.documentElement.lang = i18n.language;
document.documentElement.dir = i18n.dir();

// ✅ Function to change language dynamically
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  localStorage.setItem("i18nextLng", lng); // Persist selection
};

export default i18n;

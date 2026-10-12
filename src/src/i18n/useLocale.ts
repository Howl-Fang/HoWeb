import { useState, useEffect, useCallback } from "react";
import translations, { type Locale } from "./translations";

const STORAGE_KEY = "howeb-locale";

const isLocale = (value: string | null): value is Locale => value === "en" || value === "zh";

const detectLocale = (): Locale => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // storage can be unavailable (private mode, blocked cookies); fall through
  }

  const lang = navigator.language || "en";
  return lang.startsWith("zh") ? "zh" : "en";
};

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(detectLocale);

  const t = translations[locale];

  useEffect(() => {
    // Keep the document in sync with the visible language: screen readers
    // pick pronunciation from lang, and the description feeds search results
    // and link previews
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    document.title = t.head.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.head.description);

    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // the choice simply will not persist
    }
  }, [locale, t]);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "zh" : "en"));
  }, []);

  return { locale, t, toggleLocale };
}

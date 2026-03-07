import { useState, useEffect, useCallback } from "react";
import translations, { type Locale } from "./translations";

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(() => {
    const lang = navigator.language || "en";
    return lang.startsWith("zh") ? "zh" : "en";
  });

  const t = translations[locale];

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "zh" : "en"));
  }, []);

  return { locale, t, toggleLocale };
}

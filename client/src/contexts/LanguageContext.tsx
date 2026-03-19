import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isArabic: boolean;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get language from URL path
    const path = window.location.pathname;
    const pathLang = path.split("/")[1] as Language;
    
    if (pathLang === "ar" || pathLang === "en") {
      setLanguageState(pathLang);
    } else {
      // Get from localStorage or browser preference
      const saved = localStorage.getItem("language") as Language | null;
      const browserLang = navigator.language.startsWith("ar") ? "ar" : "en";
      setLanguageState(saved || browserLang);
    }
    
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    
    // Update URL to reflect language change
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/").filter(Boolean);
    
    if (pathParts[0] === "en" || pathParts[0] === "ar") {
      pathParts[0] = lang;
    } else {
      pathParts.unshift(lang);
    }
    
    window.history.pushState({}, "", "/" + pathParts.join("/"));
  };

  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  // Simple translation function - can be extended with i18n library
  const t = (key: string): string => {
    const translations: Record<string, Record<Language, string>> = {
      // Navigation
      "nav.markets": { en: "Markets & Applications", ar: "الأسواق والتطبيقات" },
      "nav.products": { en: "Products & Services", ar: "المنتجات والخدمات" },
      "nav.brands": { en: "Brands", ar: "العلامات التجارية" },
      "nav.resources": { en: "Resources", ar: "الموارد" },
      "nav.about": { en: "About", ar: "حول" },
      "nav.contact": { en: "Contact Us", ar: "اتصل بنا" },
      
      // Common
      "common.search": { en: "Search", ar: "بحث" },
      "common.language": { en: "Language", ar: "اللغة" },
      "common.english": { en: "English", ar: "الإنجليزية" },
      "common.arabic": { en: "العربية", ar: "العربية" },
      "common.learnMore": { en: "Learn More", ar: "اعرف المزيد" },
      "common.readMore": { en: "Read More", ar: "اقرأ المزيد" },
      "common.download": { en: "Download", ar: "تحميل" },
      "common.back": { en: "Back", ar: "العودة" },
      "common.next": { en: "Next", ar: "التالي" },
      "common.previous": { en: "Previous", ar: "السابق" },
      
      // Home
      "home.title": { en: "Water Science & Technology", ar: "علم وتكنولوجيا المياه" },
      "home.subtitle": { en: "Engineering the Future of Water", ar: "هندسة مستقبل المياه" },
      "home.description": { en: "Advanced solutions in water science and technology for sustainable water management", ar: "حلول متقدمة في علوم وتكنولوجيا المياه لإدارة المياه المستدامة" },
    };

    return translations[key]?.[language] || key;
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isArabic, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

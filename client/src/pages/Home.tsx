import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatisticsSection from "@/components/StatisticsSection";
import ProductsSection from "@/components/ProductsSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const handleLanguageChange = (lang: "en" | "ar") => {
    setLanguage(lang);
    // Update document direction
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header Navigation */}
      <Header language={language} onLanguageChange={handleLanguageChange} />

      {/* Hero Section */}
      <HeroSection language={language} />

      {/* Statistics Section */}
      <StatisticsSection language={language} />

      {/* Products Section */}
      <ProductsSection language={language} />

      {/* Blog Section */}
      <BlogSection language={language} />

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}

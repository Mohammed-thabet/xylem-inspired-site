import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  language: "en" | "ar";
}

export default function HeroSection({ language }: HeroSectionProps) {
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const content = {
    title: isArabic ? "بناء عالم أكثر أماناً للمياه" : "Building a More Water-Secure World",
    subtitle: isArabic
      ? "الابتكار والتعاون وربط القدرات المتنوعة والحلول والخبرة لدعم أولئك الذين يجعلون المياه تعمل كل يوم."
      : "Innovating, collaborating and connecting diverse capabilities, solutions and know-how, to champion those who make water work every day.",
    cta1: isArabic ? "اكتشف المزيد" : "Learn More",
    cta2: isArabic ? "اتصل بنا" : "Get in Touch",
  };

  return (
    <section dir={dir} className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-secondary/80 to-accent/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=900&fit=crop')",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container">
          <div className="max-w-2xl">
            {/* Animated decorative line */}
            <div className="h-1 w-20 bg-accent rounded-full mb-8 animate-slide-in-left" />

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-in-left leading-tight">
              {content.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
              {content.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
              <Button className="btn-primary flex items-center gap-2 group">
                {content.cta1}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button className="btn-secondary">
                {content.cta2}
              </Button>
            </div>

            {/* Scroll indicator */}
            <div className="mt-16 animate-bounce">
              <div className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ transform: "scaleY(-1)" }}
        >
          <path
            d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
            fill="white"
            fillOpacity="1"
          />
        </svg>
      </div>
    </section>
  );
}

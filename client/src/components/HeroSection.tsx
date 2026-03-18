import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  language: "en" | "ar";
}

export default function HeroSection({ language }: HeroSectionProps) {
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const content = {
    title: isArabic ? "هندسة مستقبل المياه" : "Engineering the Future of Water",
    subtitle: isArabic
      ? "حلول متقدمة في العلوم والتكنولوجيا لإدارة المياه المستدامة والابتكارات الرائدة في معالجة وتنقية المياه"
      : "Advanced solutions in water science and technology for sustainable water management and leading innovations in water treatment and purification",
    cta1: isArabic ? "اكتشف الحلول" : "Discover Solutions",
    cta2: isArabic ? "اتصل بنا" : "Get in Touch",
  };

  return (
    <section dir={dir} className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-cyan-600/80 to-emerald-600/75 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&h=900&fit=crop')",
          }}
        />
        {/* Water droplet decorations */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl z-0" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-cyan-300/10 rounded-full blur-2xl z-0" />
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-emerald-300/10 rounded-full blur-3xl z-0" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container">
          <div className="max-w-2xl">
            {/* Animated decorative line */}
            <div className="h-1 w-24 bg-accent rounded-full mb-8 animate-slide-in-left" />

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-in-left leading-tight">
              {content.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
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

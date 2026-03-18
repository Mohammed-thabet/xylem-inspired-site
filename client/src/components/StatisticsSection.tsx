import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

interface StatisticsSectionProps {
  language: "en" | "ar";
}

export default function StatisticsSection({ language }: StatisticsSectionProps) {
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const { data: stats = [] } = trpc.statistics.list.useQuery();

  const content = {
    title: isArabic ? "أرقام Xylem" : "Xylem by the Numbers",
    subtitle: isArabic
      ? "نحن نخدم أكثر من 150 دولة مع حلول مبتكرة وموثوقة"
      : "We serve over 150 countries with innovative and reliable solutions",
  };

  const AnimatedCounter = ({ value, unit }: { value: string; unit?: string | null }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const numericValue = parseInt(value.replace(/\D/g, ""), 10) || 0;

    useEffect(() => {
      let current = 0;
      const increment = Math.ceil(numericValue / 50);
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(numericValue);
          clearInterval(timer);
        } else {
          setDisplayValue(current);
        }
      }, 30);

      return () => clearInterval(timer);
    }, [numericValue]);

    return (
      <div className="text-4xl md:text-5xl font-bold gradient-text">
        {displayValue.toLocaleString()}{unit ? unit : "+"}
      </div>
    );
  };

  return (
    <section dir={dir} className="py-20 md:py-32 bg-gradient-to-b from-white to-muted">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.subtitle}</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.length > 0 ? (
            stats.map((stat, index) => (
              <div
                key={stat.id}
                className="bg-background rounded-xl p-8 shadow-elegant hover:shadow-elegant-lg transition-elegant text-center animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AnimatedCounter value={stat.value} unit={stat.unit} />
                <p className="text-foreground font-semibold mt-4">
                  {language === "en" ? stat.labelEn : stat.labelAr}
                </p>
                {stat.description && (
                  <p className="text-sm text-muted-foreground mt-2">{stat.description || ""}</p>
                )}
              </div>
            ))
          ) : (
            // Default statistics if none in database
            <>
              {[
                {
                  value: "23000",
                  label: isArabic ? "زملاء ومتخصصون" : "Colleagues with diverse expertise",
                  unit: "+",
                },
                {
                  value: "150",
                  label: isArabic ? "دول نخدمها" : "Countries where we operate",
                  unit: "",
                },
                {
                  value: "8300",
                  label: isArabic ? "براءات اختراع وعلامات تجارية" : "Patents and trademarks",
                  unit: "+",
                },
                {
                  value: "100",
                  label: isArabic ? "سنة من التميز" : "Years of excellence",
                  unit: "+",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-background rounded-xl p-8 shadow-elegant hover:shadow-elegant-lg transition-elegant text-center animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AnimatedCounter value={stat.value} unit={stat.unit} />
                  <p className="text-foreground font-semibold mt-4">{stat.label}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

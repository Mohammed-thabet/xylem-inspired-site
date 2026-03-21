import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, ShoppingCart, Zap, Globe } from "lucide-react";

const externalMarketplaces = [
  {
    id: 1,
    nameEn: "Global Water Solutions",
    nameAr: "حلول المياه العالمية",
    descriptionEn: "Premium water treatment products and solutions",
    descriptionAr: "منتجات وحلول معالجة المياه المتميزة",
    url: "https://marketplace.example.com/water-solutions",
    icon: <Globe className="w-8 h-8" />,
    category: "products",
  },
  {
    id: 2,
    nameEn: "Water Technology Store",
    nameAr: "متجر تكنولوجيا المياه",
    descriptionEn: "Advanced water technology equipment",
    descriptionAr: "معدات تكنولوجيا المياه المتقدمة",
    url: "https://marketplace.example.com/technology",
    icon: <Zap className="w-8 h-8" />,
    category: "technology",
  },
  {
    id: 3,
    nameEn: "Water Services Marketplace",
    nameAr: "سوق خدمات المياه",
    descriptionEn: "Professional water services and consulting",
    descriptionAr: "خدمات واستشارات المياه المهنية",
    url: "https://marketplace.example.com/services",
    icon: <ShoppingCart className="w-8 h-8" />,
    category: "services",
  },
];

export default function CommerceGateway() {
  const { isArabic } = useLanguage();
  const [, navigate] = useLocation();

  const getLabel = (item: any) => (isArabic ? item.nameAr : item.nameEn);
  const getDescription = (item: any) =>
    isArabic ? item.descriptionAr : item.descriptionEn;

  return (
    <div className={`min-h-screen bg-background ${isArabic ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {isArabic ? "بوابة السوق" : "Marketplace Gateway"}
          </h1>
          <p className="text-lg opacity-90">
            {isArabic
              ? "اكتشف أفضل المنتجات والخدمات من شركائنا الموثوقين"
              : "Discover the best products and services from our trusted partners"}
          </p>
        </div>
      </div>

      {/* Marketplace Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {externalMarketplaces.map((marketplace) => (
            <Card
              key={marketplace.id}
              className="hover:shadow-lg transition-shadow p-6 flex flex-col"
            >
              <div className="mb-4 text-primary">{marketplace.icon}</div>
              <h3 className="text-xl font-bold mb-2">{getLabel(marketplace)}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                {getDescription(marketplace)}
              </p>
              <a
                href={marketplace.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full" variant="default">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {isArabic ? "زيارة السوق" : "Visit Marketplace"}
                </Button>
              </a>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">
            {isArabic ? "لماذا اختيار متاجرنا الموثوقة؟" : "Why Choose Our Trusted Marketplaces?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2">
                {isArabic ? "جودة مضمونة" : "Guaranteed Quality"}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? "جميع المنتجات معتمدة وموثوقة من أفضل الموردين"
                  : "All products are certified and verified from top suppliers"}
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">
                {isArabic ? "دعم عملاء 24/7" : "24/7 Customer Support"}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? "فريق دعم متخصص جاهز لمساعدتك في أي وقت"
                  : "Specialized support team ready to help anytime"}
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">
                {isArabic ? "أسعار تنافسية" : "Competitive Pricing"}
              </h3>
              <p className="text-muted-foreground">
                {isArabic
                  ? "أفضل الأسعار مع ضمان الجودة والخدمة"
                  : "Best prices with quality and service guarantee"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
        >
          {isArabic ? "العودة إلى الرئيسية" : "Back to Home"}
        </Button>
      </div>
    </div>
  );
}

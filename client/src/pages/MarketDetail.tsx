import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

export default function MarketDetail() {
  const language = "en" as const;
  const isArabic = (language as any) === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const { slug } = useParams<{ slug: string }>();

  const { data: market, isLoading } = trpc.markets.getBySlug.useQuery({ slug: slug || "" });
  const { data: products } = trpc.products.list.useQuery({ limit: 6 });

  const content = {
    back: isArabic ? "العودة" : "Back",
    solutions: isArabic ? "الحلول" : "Solutions",
    applications: isArabic ? "التطبيقات" : "Applications",
    benefits: isArabic ? "الفوائد" : "Benefits",
    relatedProducts: isArabic ? "المنتجات ذات الصلة" : "Related Products",
    learnMore: isArabic ? "اعرف المزيد" : "Learn More",
    contactSales: isArabic ? "اتصل بفريق المبيعات" : "Contact Sales",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{isArabic ? "السوق غير موجود" : "Market Not Found"}</h1>
          <p className="text-muted-foreground mb-6">{isArabic ? "عذراً، لم نتمكن من العثور على هذا السوق." : "Sorry, we couldn't find this market."}</p>
          <Button onClick={() => window.location.href = "/"} className="btn-primary">
            {isArabic ? "العودة إلى الرئيسية" : "Back to Home"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div dir={dir} className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container">
          <button
            onClick={() => window.location.href = "/"}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-elegant mb-4"
          >
            ← {content.back}
          </button>
        </div>
      </div>

      {/* Market Hero */}
      <div className="bg-gradient-to-b from-primary/20 to-transparent py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-6">
            {isArabic ? market.nameAr : market.nameEn}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {isArabic ? market.descriptionAr : market.descriptionEn}
          </p>
        </div>
      </div>

      {/* Market Image */}
      {market.imageUrl && (
        <div className="w-full h-96 overflow-hidden">
          <img
            src={market.imageUrl}
            alt={isArabic ? market.nameAr : market.nameEn}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Market Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Benefits */}
          <div className="bg-muted p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">{content.benefits}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>{isArabic ? "حلول مخصصة" : "Customized Solutions"}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>{isArabic ? "دعم متخصص" : "Expert Support"}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>{isArabic ? "أداء موثوق" : "Reliable Performance"}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>{isArabic ? "توفير التكاليف" : "Cost Savings"}</span>
              </li>
            </ul>
          </div>

          {/* Applications */}
          <div className="bg-muted p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">{content.applications}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">→</span>
                <span>{isArabic ? "التطبيق الأول" : "Primary Application"}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">→</span>
                <span>{isArabic ? "التطبيق الثاني" : "Secondary Application"}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">→</span>
                <span>{isArabic ? "التطبيق الثالث" : "Tertiary Application"}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">→</span>
                <span>{isArabic ? "حالات استخدام متقدمة" : "Advanced Use Cases"}</span>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="bg-muted p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6">{content.solutions}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-1">◆</span>
                <span>{isArabic ? "حل متكامل" : "Integrated Solution"}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-1">◆</span>
                <span>{isArabic ? "حل مستدام" : "Sustainable Solution"}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-1">◆</span>
                <span>{isArabic ? "حل ذكي" : "Smart Solution"}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-1">◆</span>
                <span>{isArabic ? "حل قابل للتوسع" : "Scalable Solution"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Related Products */}
        {products && products.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">{content.relatedProducts}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product: any) => (
                <div
                  key={product.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-elegant cursor-pointer"
                  onClick={() => window.location.href = `/products/${product.slug}`}
                >
                  <div className="h-48 bg-muted flex items-center justify-center">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={isArabic ? product.nameAr : product.nameEn} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-muted-foreground">{isArabic ? "صورة" : "Image"}</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2">{isArabic ? product.nameAr : product.nameEn}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {isArabic ? product.descriptionAr : product.descriptionEn}
                    </p>
                    <Button className="btn-secondary w-full">{content.learnMore}</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-accent p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            {isArabic ? "هل تريد حلاً مخصصاً؟" : "Need a Customized Solution?"}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {isArabic
              ? "اتصل بفريقنا المتخصص للحصول على استشارة مجانية وحل مخصص لاحتياجاتك."
              : "Contact our specialized team for a free consultation and customized solution for your needs."}
          </p>
          <Button className="bg-white text-primary hover:bg-white/90">
            {content.contactSales}
          </Button>
        </div>
      </div>
    </div>
  );
}

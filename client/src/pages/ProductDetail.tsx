import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Share2, Download, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProductDetail() {
  const language = "en" as const;
  const isArabic = (language as string) === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const { slug } = useParams<{ slug: string }>();
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: product, isLoading } = trpc.products.getBySlug.useQuery({ slug: slug || "" });

  const content = {
    back: isArabic ? "العودة" : "Back",
    specifications: isArabic ? "المواصفات" : "Specifications",
    features: isArabic ? "الميزات" : "Features",
    applications: isArabic ? "التطبيقات" : "Applications",
    contactSales: isArabic ? "اتصل بفريق المبيعات" : "Contact Sales",
    requestQuote: isArabic ? "طلب عرض أسعار" : "Request Quote",
    addToFavorites: isArabic ? "إضافة إلى المفضلة" : "Add to Favorites",
    share: isArabic ? "مشاركة" : "Share",
    relatedProducts: isArabic ? "منتجات ذات صلة" : "Related Products",
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{isArabic ? "المنتج غير موجود" : "Product Not Found"}</h1>
          <p className="text-muted-foreground mb-6">{isArabic ? "عذراً، لم نتمكن من العثور على هذا المنتج." : "Sorry, we couldn't find this product."}</p>
          <Button onClick={() => window.location.href = "/products"} className="btn-primary">
            {isArabic ? "العودة إلى المنتجات" : "Back to Products"}
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
            onClick={() => window.location.href = "/products"}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-elegant mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {content.back}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden min-h-96">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={isArabic ? product.nameAr : product.nameEn}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4" />
                  <p className="text-muted-foreground">{isArabic ? "صورة المنتج" : "Product Image"}</p>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {isArabic ? product.nameAr : product.nameEn}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {isArabic ? product.descriptionAr : product.descriptionEn}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="btn-primary flex-1">
                {content.contactSales}
              </Button>
              <Button className="btn-secondary flex-1">
                {content.requestQuote}
              </Button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`px-4 py-2 rounded-lg border transition-elegant ${
                  isFavorite
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary"
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
              </button>
              <button className="px-4 py-2 rounded-lg border border-border hover:border-primary transition-elegant">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Product Meta */}
            <div className="space-y-4 pb-8 border-b border-border">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground min-w-32">{isArabic ? "الفئة" : "Category"}:</span>
                <span className="font-semibold">{isArabic ? "منتج" : "Product"}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground min-w-32">{isArabic ? "العلامة التجارية" : "Brand"}:</span>
                <span className="font-semibold">{isArabic ? "علامة" : "Brand"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{content.specifications}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-4">{content.features}</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{isArabic ? "أداء عالي" : "High Performance"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{isArabic ? "كفاءة الطاقة" : "Energy Efficient"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{isArabic ? "سهل التثبيت" : "Easy Installation"}</span>
                </li>
              </ul>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-4">{content.applications}</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{isArabic ? "الزراعة" : "Agriculture"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{isArabic ? "الصناعة" : "Industrial"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>{isArabic ? "البيئة" : "Environmental"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

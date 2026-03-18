import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface ProductsSectionProps {
  language: "en" | "ar";
}

export default function ProductsSection({ language }: ProductsSectionProps) {
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const { data: products = [] } = trpc.products.list.useQuery({ limit: 6 });

  const content = {
    title: isArabic ? "حلولنا الرائدة" : "Our Leading Solutions",
    subtitle: isArabic
      ? "اكتشف مجموعتنا الشاملة من المنتجات والخدمات المبتكرة"
      : "Discover our comprehensive range of innovative products and services",
    viewAll: isArabic ? "عرض جميع المنتجات" : "View All Products",
  };

  return (
    <section dir={dir} className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.subtitle}</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.length > 0 ? (
            products.map((product, index) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <a
                  className="group bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-elegant-lg transition-elegant animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Product Image */}
                  <div className="relative h-64 bg-muted overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={language === "en" ? product.nameEn : product.nameAr}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-2" />
                          <p className="text-muted-foreground text-sm">Product Image</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-elegant">
                      {language === "en" ? product.nameEn : product.nameAr}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {language === "en" ? product.descriptionEn : product.descriptionAr}
                    </p>

                    {/* Learn More Link */}
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>{isArabic ? "اكتشف المزيد" : "Learn More"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              </Link>
            ))
          ) : (
            // Placeholder products
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-card rounded-xl overflow-hidden shadow-elegant animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10" />
                <div className="p-6">
                  <div className="h-6 bg-muted rounded mb-2 w-3/4" />
                  <div className="h-4 bg-muted rounded mb-4 w-full" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/products">
            <a className="btn-primary inline-flex items-center gap-2 group">
              {content.viewAll}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}

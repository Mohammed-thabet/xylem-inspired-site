import { useLanguage } from "@/contexts/LanguageContext";
import { ShoppingCart, ExternalLink } from "lucide-react";

interface MarketplaceProduct {
  id: number;
  nameEn: string;
  nameAr: string;
  externalLink: string;
  imageUrl?: string;
}

interface MarketplaceSidebarProps {
  products?: MarketplaceProduct[];
  title?: string;
  isVisible?: boolean;
}

export function MarketplaceSidebar({ products = [], title, isVisible = true }: MarketplaceSidebarProps) {
  const { isArabic } = useLanguage();

  if (!isVisible || products.length === 0) return null;

  const getLabel = (product: MarketplaceProduct) => (isArabic ? product.nameAr : product.nameEn);

  return (
    <aside className={`w-80 bg-muted border border-border rounded-lg p-6 space-y-4 ${isArabic ? "order-first" : ""}`}>
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          {title || (isArabic ? "منتجات ذات صلة" : "Related Products")}
        </h3>
      </div>

      <div className="space-y-3">
        {products.map((product) => (
          <a
            key={product.id}
            href={product.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 bg-background border border-border rounded-lg hover:border-primary hover:shadow-md transition-all group"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={getLabel(product)}
                className="w-16 h-16 object-cover rounded-md"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                {getLabel(product)}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground group-hover:text-primary">
                <span>{isArabic ? "عرض المنتج" : "View Product"}</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </a>
        ))}
      </div>

      <a
        href="https://marketplace.example.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
      >
        <ShoppingCart className="w-4 h-4" />
        {isArabic ? "زيارة المتجر" : "Visit Marketplace"}
        <ExternalLink className="w-4 h-4" />
      </a>
    </aside>
  );
}

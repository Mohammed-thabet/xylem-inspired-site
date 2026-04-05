import { useRoute, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BrandDetail() {
  const [, params] = useRoute("/brands/:slug");
  const [, navigate] = useLocation();
  const slug = params?.slug as string;

  // Fetch brand by slug
  const { data: brand, isLoading: brandLoading } = trpc.brands.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  // Fetch products by brand
  const { data: products, isLoading: productsLoading } = trpc.products.getByBrand.useQuery(
    { brandId: brand?.id || 0 },
    { enabled: !!brand?.id }
  );

  if (brandLoading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Brand not found</p>
          <Link href="/">
            <a className="text-primary hover:text-primary/80">Back to Home</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-6 mb-8">
            {brand.logoUrl && (
              <img
                src={brand.logoUrl}
                alt={brand.nameEn}
                className="h-24 w-auto object-contain"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{brand.nameEn}</h1>
              <p className="text-lg text-muted-foreground">{brand.descriptionEn}</p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Products from {brand.nameEn}</h2>
          
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <a>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      {product.imageUrl && (
                        <div className="h-48 bg-muted overflow-hidden">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{product.name}</CardTitle>
                        <CardDescription className="line-clamp-3">
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {product.price && (
                          <p className="text-lg font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No products found for this brand
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

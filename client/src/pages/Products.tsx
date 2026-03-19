import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Filter, ChevronDown } from "lucide-react";

export default function Products() {
  const language = "en" as const;
  const isArabic = (language as any) === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  // State management
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"relevance" | "name" | "newest">("relevance");
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch data
  const { data: categories } = trpc.productCategories.list.useQuery();
  const { data: brands } = trpc.brands.list.useQuery();
  const { data: filteredProducts } = trpc.products.filter.useQuery({
    categoryIds: selectedCategories.length > 0 ? selectedCategories : undefined,
    brandIds: selectedBrands.length > 0 ? selectedBrands : undefined,
    searchQuery: searchQuery || undefined,
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });

  // Sort products
  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return [];
    const products = [...filteredProducts];

    switch (sortBy) {
      case "name":
        return products.sort((a, b) =>
          isArabic
            ? (a.nameAr || "").localeCompare(b.nameAr || "", "ar")
            : (a.nameEn || "").localeCompare(b.nameEn || "")
        );
      case "newest":
        return products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      default:
        return products;
    }
  }, [filteredProducts, sortBy, isArabic]);

  // Content
  const content = {
    title: isArabic ? "المنتجات" : "Products",
    subtitle: isArabic ? "اكتشف حلولنا الشاملة" : "Discover Our Comprehensive Solutions",
    filters: isArabic ? "التصفية" : "Filters",
    categories: isArabic ? "الفئات" : "Categories",
    brands: isArabic ? "العلامات التجارية" : "Brands",
    search: isArabic ? "ابحث عن المنتجات" : "Search Products",
    sortBy: isArabic ? "ترتيب حسب" : "Sort By",
    relevance: isArabic ? "الملاءمة" : "Relevance",
    name: isArabic ? "الاسم" : "Name",
    newest: isArabic ? "الأحدث" : "Newest",
    clearFilters: isArabic ? "مسح التصفية" : "Clear Filters",
    noResults: isArabic ? "لم يتم العثور على منتجات" : "No Products Found",
    learnMore: isArabic ? "اعرف المزيد" : "Learn More",
    results: isArabic ? "النتائج" : "Results",
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || searchQuery;

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  const handleBrandToggle = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div dir={dir} className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/20 to-transparent py-12">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl text-muted-foreground">{content.subtitle}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="bg-muted p-6 rounded-lg sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {content.filters}
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-1 hover:bg-background rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories Filter */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">{content.categories}</h3>
                <div className="space-y-3">
                  {categories?.map((category: any) => (
                    <label key={category.id} className="flex items-center gap-3 cursor-pointer hover:bg-background p-2 rounded">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm">{isArabic ? category.nameAr : category.nameEn}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">{content.brands}</h3>
                <div className="space-y-3">
                  {brands?.map((brand: any) => (
                    <label key={brand.id} className="flex items-center gap-3 cursor-pointer hover:bg-background p-2 rounded">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => handleBrandToggle(brand.id)}
                        className="w-4 h-4 rounded border-border"
                      />
                      <span className="text-sm">{isArabic ? brand.nameAr : brand.nameEn}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  onClick={handleClearFilters}
                  className="w-full btn-secondary"
                >
                  {content.clearFilters}
                </Button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={content.search}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full"
                />
              </div>

              <div className="flex gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-border rounded-lg bg-background"
                >
                  <option value="relevance">{content.relevance}</option>
                  <option value="name">{content.name}</option>
                  <option value="newest">{content.newest}</option>
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-4 py-2 border border-border rounded-lg hover:bg-muted"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts && sortedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {sortedProducts.map((product: any) => (
                    <div
                      key={product.id}
                      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-elegant cursor-pointer group"
                      onClick={() => (window.location.href = `/products/${product.slug}`)}
                    >
                      <div className="h-48 bg-muted flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={isArabic ? product.nameAr : product.nameEn}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-muted-foreground">{isArabic ? "صورة" : "Image"}</div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold mb-2 line-clamp-2">
                          {isArabic ? product.nameAr : product.nameEn}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {isArabic ? product.descriptionAr : product.descriptionEn}
                        </p>
                        <Button className="btn-secondary w-full">{content.learnMore}</Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-8">
                  {currentPage > 1 && (
                    <Button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="btn-secondary"
                    >
                      {isArabic ? "السابق" : "Previous"}
                    </Button>
                  )}
                  <span className="px-4 py-2 flex items-center">
                    {content.results}: {currentPage}
                  </span>
                  {sortedProducts.length === itemsPerPage && (
                    <Button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="btn-secondary"
                    >
                      {isArabic ? "التالي" : "Next"}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold mb-4">{content.noResults}</h3>
                <p className="text-muted-foreground mb-6">
                  {isArabic ? "جرب تغيير معايير البحث أو التصفية" : "Try changing your search or filter criteria"}
                </p>
                <Button onClick={handleClearFilters} className="btn-primary">
                  {content.clearFilters}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

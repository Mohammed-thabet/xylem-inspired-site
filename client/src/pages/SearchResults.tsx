import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Filter, X } from "lucide-react";

export default function SearchResults() {
  const language = "en" as const;
  const isArabic = (language as any) === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const [, setLocation] = useLocation();

  // Get search query from URL
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q") || "";

  // State management
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"relevance" | "name" | "newest">("relevance");
  const [showFilters, setShowFilters] = useState(true);

  // Fetch data
  const { data: categories } = trpc.productCategories.list.useQuery();
  const { data: brands } = trpc.brands.list.useQuery();
  const { data: searchResults } = trpc.products.filter.useQuery({
    searchQuery: searchQuery || undefined,
    categoryIds: selectedCategories.length > 0 ? selectedCategories : undefined,
    brandIds: selectedBrands.length > 0 ? selectedBrands : undefined,
    limit: 50,
  });

  // Sort results
  const sortedResults = useMemo(() => {
    if (!searchResults) return [];
    const results = [...searchResults];

    switch (sortBy) {
      case "name":
        return results.sort((a, b) =>
          isArabic
            ? (a.nameAr || "").localeCompare(b.nameAr || "", "ar")
            : (a.nameEn || "").localeCompare(b.nameEn || "")
        );
      case "newest":
        return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      default:
        return results;
    }
  }, [searchResults, sortBy, isArabic]);

  // Content
  const content = {
    searchResults: isArabic ? "نتائج البحث" : "Search Results",
    filters: isArabic ? "التصفية" : "Filters",
    categories: isArabic ? "الفئات" : "Categories",
    brands: isArabic ? "العلامات التجارية" : "Brands",
    sortBy: isArabic ? "ترتيب حسب" : "Sort By",
    relevance: isArabic ? "الملاءمة" : "Relevance",
    name: isArabic ? "الاسم" : "Name",
    newest: isArabic ? "الأحدث" : "Newest",
    clearFilters: isArabic ? "مسح التصفية" : "Clear Filters",
    noResults: isArabic ? "لم يتم العثور على نتائج" : "No Results Found",
    learnMore: isArabic ? "اعرف المزيد" : "Learn More",
    back: isArabic ? "العودة" : "Back",
    found: isArabic ? "تم العثور على" : "Found",
    results: isArabic ? "نتيجة" : "result",
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0;

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleBrandToggle = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div dir={dir} className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/20 to-transparent py-8">
        <div className="container">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-elegant mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {content.back}
          </button>
          <h1 className="text-4xl font-bold mb-4">{content.searchResults}</h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder={isArabic ? "ابحث..." : "Search..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="btn-primary">
              {isArabic ? "بحث" : "Search"}
            </Button>
          </form>
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

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
              <div>
                <p className="text-muted-foreground">
                  {content.found} <span className="font-bold text-foreground">{sortedResults.length}</span> {content.results}
                </p>
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

            {/* Results Grid */}
            {sortedResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedResults.map((product: any) => (
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
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold mb-4">{content.noResults}</h3>
                <p className="text-muted-foreground mb-6">
                  {isArabic ? "جرب كلمات مفتاحية مختلفة أو غيّر معايير البحث" : "Try different keywords or change your search criteria"}
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

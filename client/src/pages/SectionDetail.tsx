import { useLanguage } from "@/contexts/LanguageContext";
import { useRoute } from "wouter";
import { useState, useMemo } from "react";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { Link } from "wouter";
import { TrustMetaBlock } from "@/components/TrustMetaBlock";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SectionDetail() {
  const { isArabic, language } = useLanguage();
  const [, params] = useRoute("/:lang/sections/:slug");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);

  const slug = params?.slug as string;

  // Fetch section by slug
  const { data: section, isLoading: sectionLoading } = trpc.sections.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  // Fetch content for section
  const { data: content, isLoading: contentLoading } = trpc.sections.getContent.useQuery(
    { sectionId: section?.id || 0 },
    { enabled: !!section?.id }
  );

  const getLabel = (obj: any, field: string) => (isArabic ? obj[`${field}Ar`] : obj[`${field}En`]);

  // Combine all content types
  const allContent = useMemo(() => {
    if (!content) return [];
    const items = [
      ...(content.articles || []).map((item: any) => ({ ...item, type: "article" })),
      ...(content.reports || []).map((item: any) => ({ ...item, type: "report" })),
      ...(content.processes || []).map((item: any) => ({ ...item, type: "process" })),
      ...(content.techniques || []).map((item: any) => ({ ...item, type: "technique" })),
      ...(content.books || []).map((item: any) => ({ ...item, type: "book" })),
      ...(content.tools || []).map((item: any) => ({ ...item, type: "tool" })),
      ...(content.courses || []).map((item: any) => ({ ...item, type: "course" })),
    ];
    return items;
  }, [content]);

  // Filter content based on search and type
  const filteredContent = useMemo(() => {
    let filtered = allContent;

    if (selectedContentType) {
      filtered = filtered.filter((item) => item.type === selectedContentType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          getLabel(item, "title").toLowerCase().includes(query) ||
          getLabel(item, "description").toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.publishedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    });
  }, [searchQuery, selectedContentType, allContent]);

  const contentTypes = [
    { value: "article", label: isArabic ? "مقالات" : "Articles" },
    { value: "report", label: isArabic ? "تقارير" : "Reports" },
    { value: "process", label: isArabic ? "عمليات" : "Processes" },
    { value: "technique", label: isArabic ? "تقنيات" : "Techniques" },
    { value: "book", label: isArabic ? "كتب" : "Books" },
    { value: "tool", label: isArabic ? "أدوات" : "Tools" },
    { value: "course", label: isArabic ? "دورات" : "Courses" },
  ];

  if (sectionLoading) {
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

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">{isArabic ? "القسم غير موجود" : "Section not found"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/${language}`}>
            <a className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="w-4 h-4" />
              {isArabic ? "العودة" : "Back"}
            </a>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">{getLabel(section, "name")}</h1>
          <p className="text-lg text-muted-foreground">{getLabel(section, "description")}</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={isArabic ? "ابحث عن محتوى..." : "Search content..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Content Type Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedContentType(null)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedContentType === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {isArabic ? "الكل" : "All"}
            </button>
            {contentTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedContentType(type.value)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedContentType === type.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        {contentLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item: any) => (
              <Link key={`${item.type}-${item.id}`} href={`/${language}/${item.type}/${item.slug}`}>
                <a>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                          {contentTypes.find((t) => t.value === item.type)?.label}
                        </span>
                        {item.publishedAt && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.publishedAt).toLocaleDateString(isArabic ? "ar-SA" : "en-US")}
                          </span>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2">{getLabel(item, "title")}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {getLabel(item, "description")}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              {isArabic ? "لا يوجد محتوى في هذا القسم" : "No content found in this section"}
            </p>
          </div>
        )}

        {/* Trust Meta Block */}
        <div className="mt-16">
          <TrustMetaBlock />
        </div>
      </div>
    </div>
  );
}

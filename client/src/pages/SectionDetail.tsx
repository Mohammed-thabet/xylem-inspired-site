import { useLanguage } from "@/contexts/LanguageContext";
import { useRoute } from "wouter";
import { useState, useMemo } from "react";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { Link } from "wouter";
import { TrustMetaBlock } from "@/components/TrustMetaBlock";

// Mock data for sections
const mockSections: Record<string, any> = {
  intelligence: {
    id: 1,
    slug: "intelligence",
    nameEn: "Water Intelligence",
    nameAr: "ذكاء المياه",
    descriptionEn: "Data-driven insights and analytics for water management",
    descriptionAr: "رؤى وتحليلات قائمة على البيانات لإدارة المياه",
  },
  "science-health": {
    id: 2,
    slug: "science-health",
    nameEn: "Science & Health",
    nameAr: "العلوم والصحة",
    descriptionEn: "Scientific research on water quality and health impacts",
    descriptionAr: "البحث العلمي حول جودة المياه وتأثيراتها الصحية",
  },
};

// Mock content data
const mockContent = [
  {
    id: 1,
    type: "article",
    titleEn: "Water Quality Standards",
    titleAr: "معايير جودة المياه",
    descriptionEn: "Understanding international water quality standards",
    descriptionAr: "فهم معايير جودة المياه الدولية",
    slug: "water-quality-standards",
    sectionId: 1,
    publishedAt: new Date("2026-03-15"),
  },
  {
    id: 2,
    type: "report",
    titleEn: "Global Water Report 2026",
    titleAr: "تقرير المياه العالمي 2026",
    descriptionEn: "Comprehensive analysis of global water resources",
    descriptionAr: "تحليل شامل للموارد المائية العالمية",
    slug: "global-water-report-2026",
    sectionId: 1,
    publishedAt: new Date("2026-03-10"),
  },
  {
    id: 3,
    type: "process",
    titleEn: "Water Purification Process",
    titleAr: "عملية تنقية المياه",
    descriptionEn: "Step-by-step water purification methodology",
    descriptionAr: "منهجية تنقية المياه خطوة بخطوة",
    slug: "water-purification-process",
    sectionId: 1,
    publishedAt: new Date("2026-03-05"),
  },
];

export default function SectionDetail() {
  const { isArabic, language } = useLanguage();
  const [, params] = useRoute("/:lang/sections/:slug");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);

  const slug = params?.slug as string;
  const section = mockSections[slug];

  const getLabel = (obj: any, field: string) => (isArabic ? obj[`${field}Ar`] : obj[`${field}En`]);

  // Filter content based on search and type
  const filteredContent = useMemo(() => {
    let filtered = mockContent.filter((item) => item.sectionId === section?.id);

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

    return filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [searchQuery, selectedContentType, section?.id]);

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">{isArabic ? "القسم غير موجود" : "Section not found"}</p>
      </div>
    );
  }

  const contentTypes = [
    { value: "article", labelEn: "Articles", labelAr: "مقالات" },
    { value: "report", labelEn: "Reports", labelAr: "تقارير" },
    { value: "process", labelEn: "Processes", labelAr: "عمليات" },
    { value: "technique", labelEn: "Techniques", labelAr: "تقنيات" },
    { value: "book", labelEn: "Books", labelAr: "كتب" },
    { value: "tool", labelEn: "Tools", labelAr: "أدوات" },
    { value: "course", labelEn: "Courses", labelAr: "دورات" },
  ];

  return (
    <div className={`min-h-screen bg-background ${isArabic ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <Link href={`/${language}`}>
            <a className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span>{isArabic ? "العودة" : "Back"}</span>
            </a>
          </Link>
          <h1 className="text-4xl font-bold mb-2">{getLabel(section, "name")}</h1>
          <p className="text-lg opacity-90">{getLabel(section, "description")}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-8 ${isArabic ? "lg:grid-flow-dense" : ""}`}>
          {/* Sidebar - Filters */}
          <aside className={`lg:col-span-1 ${isArabic ? "lg:order-last" : ""}`}>
            <div className="bg-muted border border-border rounded-lg p-6 space-y-6 sticky top-20">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  {isArabic ? "بحث" : "Search"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={isArabic ? "ابحث عن المحتوى..." : "Search content..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {/* Content Type Filter */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                  <Filter className="w-4 h-4" />
                  {isArabic ? "نوع المحتوى" : "Content Type"}
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedContentType(null)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedContentType === null
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-background text-foreground"
                    }`}
                  >
                    {isArabic ? "الكل" : "All"}
                  </button>
                  {contentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedContentType(type.value)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedContentType === type.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-background text-foreground"
                      }`}
                    >
                      {isArabic ? type.labelAr : type.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {isArabic
                    ? `${filteredContent.length} نتيجة`
                    : `${filteredContent.length} results`}
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className={`lg:col-span-3 ${isArabic ? "lg:order-first" : ""}`}>
            {filteredContent.length > 0 ? (
              <div className="space-y-6">
                {filteredContent.map((item) => (
                  <article
                    key={item.id}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    {/* Content Type Badge */}
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase">
                        {contentTypes.find((t) => t.value === item.type)?.[isArabic ? "labelAr" : "labelEn"]}
                      </span>
                      <time className="text-xs text-muted-foreground">
                        {new Date(item.publishedAt).toLocaleDateString(isArabic ? "ar-SA" : "en-US")}
                      </time>
                    </div>

                    {/* Title */}
                    <Link href={`/${language}/${item.type}/${item.slug}`}>
                      <a className="block">
                        <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors mb-2">
                          {getLabel(item, "title")}
                        </h3>
                      </a>
                    </Link>

                    {/* Description */}
                    <p className="text-foreground/80 mb-4">{getLabel(item, "description")}</p>

                    {/* Trust Meta */}
                    <TrustMetaBlock
                      metadata={{
                        reviewer: "Editorial Team",
                        lastUpdated: new Date(item.publishedAt).toLocaleDateString(isArabic ? "ar-SA" : "en-US"),
                        confidenceLevel: "high",
                        scientificTags: ["Water Quality", "Research"],
                      }}
                    />

                    {/* Read More Link */}
                    <Link href={`/${language}/${item.type}/${item.slug}`}>
                      <a className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 font-medium transition-colors">
                        {isArabic ? "اقرأ المزيد" : "Read More"}
                        <span className={`${isArabic ? "rotate-180" : ""}`}>→</span>
                      </a>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  {isArabic ? "لم يتم العثور على محتوى" : "No content found"}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

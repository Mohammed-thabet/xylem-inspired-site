import { useLanguage } from "@/contexts/LanguageContext";
import { useRoute } from "wouter";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { Link } from "wouter";
import { TrustMetaBlock } from "@/components/TrustMetaBlock";

// Mock article data
const mockArticles: Record<string, any> = {
  "water-quality-standards": {
    id: 1,
    titleEn: "Water Quality Standards",
    titleAr: "معايير جودة المياه",
    contentEn: `Water quality standards are essential guidelines that define the acceptable levels of various physical, chemical, and biological parameters in water. These standards ensure that water is safe for human consumption, agriculture, and industrial use.

International organizations like the WHO and EPA have established comprehensive water quality standards that are adopted by many countries worldwide. These standards cover parameters such as pH, dissolved oxygen, turbidity, and the presence of harmful microorganisms.

Compliance with water quality standards is crucial for public health and environmental protection. Regular monitoring and testing of water sources help ensure that these standards are met and maintained.`,
    contentAr: `معايير جودة المياه هي إرشادات أساسية تحدد المستويات المقبولة للعديد من المعاملات الفيزيائية والكيميائية والبيولوجية في المياه. تضمن هذه المعايير أن المياه آمنة للاستهلاك البشري والزراعة والاستخدام الصناعي.

وضعت المنظمات الدولية مثل منظمة الصحة العالمية والوكالة الأمريكية لحماية البيئة معايير شاملة لجودة المياه يتم اعتمادها من قبل العديد من الدول في جميع أنحاء العالم. تغطي هذه المعايير معاملات مثل الرقم الهيدروجيني والأكسجين الذائب والعكارة ووجود الكائنات الحية الضارة.

الامتثال لمعايير جودة المياه أمر حاسم لصحة الإنسان وحماية البيئة. يساعد الرصد والاختبار المنتظم لمصادر المياه على ضمان الامتثال لهذه المعايير والحفاظ عليها.`,
    authorEn: "Dr. Sarah Johnson",
    authorAr: "د. سارة جونسون",
    publishedAt: new Date("2026-03-15"),
    sectionId: 1,
    scientificTags: ["Water Quality", "Standards", "Public Health"],
    reviewer: "Editorial Team",
    confidenceLevel: "high" as const,
  },
};

export default function ArticleDetail() {
  const { isArabic, language } = useLanguage();
  const [, params] = useRoute("/:lang/article/:slug");

  const slug = params?.slug as string;
  const article = mockArticles[slug];

  const getLabel = (obj: any, field: string) => (isArabic ? obj[`${field}Ar`] : obj[`${field}En`]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">{isArabic ? "المقالة غير موجودة" : "Article not found"}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${isArabic ? "rtl" : "ltr"}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <Link href={`/${language}`}>
            <a className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span>{isArabic ? "العودة" : "Back"}</span>
            </a>
          </Link>
          <h1 className="text-4xl font-bold mb-4">{getLabel(article, "title")}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{getLabel(article, "author")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.publishedAt).toLocaleDateString(isArabic ? "ar-SA" : "en-US")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <article className="bg-card border border-border rounded-lg p-8 space-y-8">
          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {getLabel(article, "content").split("\n\n").map((paragraph: string, index: number) => (
              <p key={index} className="text-foreground/90 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Trust Meta Block */}
          <div className="border-t border-border pt-8">
            <TrustMetaBlock
              metadata={{
                reviewer: article.reviewer,
                lastUpdated: new Date(article.publishedAt).toLocaleDateString(isArabic ? "ar-SA" : "en-US"),
                confidenceLevel: article.confidenceLevel,
                scientificTags: article.scientificTags,
              }}
            />
          </div>

          {/* Share Section */}
          <div className="border-t border-border pt-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-foreground">
                {isArabic ? "شارك هذا المقال:" : "Share this article:"}
              </span>
              <button className="p-2 hover:bg-muted rounded-md transition-colors">
                <Share2 className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </button>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {isArabic ? "مقالات ذات صلة" : "Related Articles"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {isArabic ? `مقالة ذات صلة ${i}` : `Related Article ${i}`}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isArabic
                    ? "وصف مختصر للمقالة ذات الصلة"
                    : "Brief description of the related article"}
                </p>
                <Link href={`/${language}`}>
                  <a className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
                    {isArabic ? "اقرأ المزيد" : "Read More"}
                    <span className={`${isArabic ? "rotate-180" : ""}`}>→</span>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

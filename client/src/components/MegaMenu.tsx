import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Zap, BookOpen, Users, Settings, Globe } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const sectionIcons: Record<string, React.ReactNode> = {
  intelligence: <Globe className="w-5 h-5" />,
  "science-health": <BookOpen className="w-5 h-5" />,
  sustainability: <Zap className="w-5 h-5" />,
  treatment: <Settings className="w-5 h-5" />,
  innovation: <Zap className="w-5 h-5" />,
  education: <BookOpen className="w-5 h-5" />,
  policy: <Globe className="w-5 h-5" />,
  community: <Users className="w-5 h-5" />,
  technology: <Settings className="w-5 h-5" />,
  resources: <BookOpen className="w-5 h-5" />,
  partnerships: <Users className="w-5 h-5" />,
  marketplace: <Globe className="w-5 h-5" />,
};

// Mock sections data - will be replaced with tRPC query
const mockSections = [
  { id: 1, slug: "intelligence", nameEn: "Water Intelligence", nameAr: "ذكاء المياه", descriptionEn: "Data-driven insights", descriptionAr: "رؤى قائمة على البيانات", isCommerceGateway: false },
  { id: 2, slug: "science-health", nameEn: "Science & Health", nameAr: "العلوم والصحة", descriptionEn: "Scientific research", descriptionAr: "البحث العلمي", isCommerceGateway: false },
  { id: 3, slug: "sustainability", nameEn: "Sustainability", nameAr: "الاستدامة", descriptionEn: "Environmental practices", descriptionAr: "ممارسات بيئية", isCommerceGateway: false },
  { id: 12, slug: "marketplace", nameEn: "Marketplace Gateway", nameAr: "بوابة السوق", descriptionEn: "External marketplace", descriptionAr: "السوق الخارجية", isCommerceGateway: true, externalLinks: ["https://marketplace.example.com"] },
];

export function MegaMenu() {
  const { isArabic, language } = useLanguage();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const sections = mockSections; // TODO: Replace with trpc.sections.list.useQuery()

  const getLabel = (section: any) => (isArabic ? section.nameAr : section.nameEn);
  const getDescription = (section: any) => (isArabic ? section.descriptionAr : section.descriptionEn);

  const commerceSection = sections.find((s: any) => s.isCommerceGateway);
  const regularSections = sections.filter((s: any) => !s.isCommerceGateway);

  return (
    <nav className={`hidden lg:flex items-center gap-1 ${isArabic ? "flex-row-reverse" : ""}`}>
      {regularSections.map((section: any) => (
        <div
          key={section.id}
          className="relative group"
          onMouseEnter={() => setOpenSection(section.slug)}
          onMouseLeave={() => setOpenSection(null)}
        >
          <button
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted ${
              openSection === section.slug ? "bg-muted text-primary" : ""
            }`}
          >
            {sectionIcons[section.slug]}
            <span>{getLabel(section)}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${openSection === section.slug ? "rotate-180" : ""}`} />
          </button>

          {/* Mega Menu Dropdown */}
          {openSection === section.slug && (
            <div className="absolute top-full left-0 w-80 bg-background border border-border rounded-lg shadow-lg p-4 z-50">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">{getLabel(section)}</p>
              <p className="text-sm text-foreground mb-4">{getDescription(section)}</p>

              <Link href={`/${language}/sections/${section.slug}`}>
                <a className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                  {isArabic ? "استكشف" : "Explore"}
                  <ChevronDown className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                </a>
              </Link>
            </div>
          )}
        </div>
      ))}

      {/* Commerce Gateway - External Link */}
      {commerceSection && (
        <a
          href={commerceSection.externalLinks?.[0] || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
        >
          {sectionIcons[commerceSection.slug]}
          <span>{getLabel(commerceSection)}</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      )}
    </nav>
  );
}

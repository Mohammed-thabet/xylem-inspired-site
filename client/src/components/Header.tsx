import { useState } from "react";
import { Menu, X, Globe, Search } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  language: "en" | "ar";
  onLanguageChange: (lang: "en" | "ar") => void;
}

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663452852665/aZuFuGh9mWovGiZpowAffj/IMG-20260318-WA0001_cbcdc45b.jpg";
const SITE_NAME = "Water Science & Technology";
const SITE_TAGLINE = "Engineering the Future of Water";

export default function Header({ language, onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const menuItems = {
    markets: {
      label: isArabic ? "الأسواق والتطبيقات" : "Markets & Applications",
      items: [
        { label: isArabic ? "الزراعة" : "Agriculture", slug: "agriculture" },
        { label: isArabic ? "الاستزراع السمكي" : "Aquaculture", slug: "aquaculture" },
        { label: isArabic ? "المباني والمرافق" : "Buildings & Facilities", slug: "buildings" },
        { label: isArabic ? "مراكز البيانات" : "Data Centers", slug: "data-centers" },
        { label: isArabic ? "الطاقة والكهرباء" : "Energy & Power", slug: "energy" },
        { label: isArabic ? "الصناعة العامة" : "General Industry", slug: "industry" },
      ],
    },
    products: {
      label: isArabic ? "المنتجات والخدمات" : "Products & Services",
      items: [
        { label: isArabic ? "أنظمة الضخ" : "Pumps & Systems", slug: "pumps" },
        { label: isArabic ? "أنظمة التصفية" : "Filtration Systems", slug: "filtration" },
        { label: isArabic ? "أنظمة المعالجة" : "Treatment Systems", slug: "treatment" },
        { label: isArabic ? "أنظمة المراقبة" : "Monitoring Systems", slug: "monitoring" },
        { label: isArabic ? "البرامج" : "Software", slug: "software" },
        { label: isArabic ? "الخدمات" : "Services", slug: "services" },
      ],
    },
    brands: {
      label: isArabic ? "العلامات التجارية" : "Brands",
      items: [
        { label: "Flygt", slug: "flygt" },
        { label: "Lowara", slug: "lowara" },
        { label: "Goulds", slug: "goulds" },
        { label: "Jabsco", slug: "jabsco" },
        { label: "Sanitaire", slug: "sanitaire" },
        { label: "YSI", slug: "ysi" },
      ],
    },
    resources: {
      label: isArabic ? "الموارد" : "Resources",
      items: [
        { label: isArabic ? "المقالات" : "Articles", slug: "articles" },
        { label: isArabic ? "المدونة" : "Blog", slug: "blog" },
        { label: isArabic ? "دراسات الحالة" : "Case Studies", slug: "case-studies" },
        { label: isArabic ? "الأسئلة الشائعة" : "FAQs", slug: "faqs" },
        { label: isArabic ? "الندوات" : "Webinars", slug: "webinars" },
        { label: isArabic ? "الأوراق البيضاء" : "White Papers", slug: "white-papers" },
      ],
    },
    about: {
      label: isArabic ? "حول الشركة" : "About",
      items: [
        { label: isArabic ? "نبذة عن الشركة" : "About Us", slug: "about" },
        { label: isArabic ? "الوظائف" : "Careers", slug: "careers" },
        { label: isArabic ? "المستثمرون" : "Investors", slug: "investors" },
        { label: isArabic ? "غرفة الأخبار" : "Newsroom", slug: "newsroom" },
        { label: isArabic ? "الاستدامة" : "Sustainability", slug: "sustainability" },
        { label: isArabic ? "المسؤولية الاجتماعية" : "CSR", slug: "csr" },
      ],
    },
  };

  return (
    <header dir={dir} className="sticky top-0 z-50 bg-background border-b border-border shadow-elegant">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80 transition-elegant">
              <img
                src={LOGO_URL}
                alt={SITE_NAME}
                className="h-14 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <div className="font-bold text-sm leading-tight">{SITE_NAME}</div>
                <div className="text-xs text-muted-foreground">{SITE_TAGLINE}</div>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {Object.entries(menuItems).map(([key, menu]) => (
              <div
                key={key}
                className="relative group"
                onMouseEnter={() => setActiveMegaMenu(key)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-elegant rounded-lg hover:bg-muted">
                  {menu.label}
                </button>

                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-background border border-border rounded-lg shadow-elegant-lg p-4 mt-2">
                  <div className="space-y-2">
                    {menu.items.map((item) => (
                      <Link key={item.slug} href={`/${item.slug}`}>
                        <a className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-lg transition-elegant">
                          {item.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="p-2 text-foreground hover:text-primary transition-elegant hover:bg-muted rounded-lg">
              <Search className="w-5 h-5" />
            </button>

            {/* Language Switcher */}
            <div className="relative group">
              <button className="p-2 text-foreground hover:text-primary transition-elegant hover:bg-muted rounded-lg flex items-center gap-1">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">{isArabic ? "العربية" : "EN"}</span>
              </button>
              <div className="absolute top-full right-0 hidden group-hover:block bg-background border border-border rounded-lg shadow-elegant-lg p-2 mt-2 min-w-max">
                <button
                  onClick={() => onLanguageChange("en")}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg transition-elegant ${
                    language === "en"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => onLanguageChange("ar")}
                  className={`block w-full text-left px-4 py-2 text-sm rounded-lg transition-elegant ${
                    language === "ar"
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

            {/* Contact Button */}
            <Button className="hidden sm:inline-flex btn-primary">
              {isArabic ? "اتصل بنا" : "Contact Us"}
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-elegant hover:bg-muted rounded-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 space-y-4">
            {Object.entries(menuItems).map(([key, menu]) => (
              <div key={key}>
                <button
                  onClick={() => setActiveMegaMenu(activeMegaMenu === key ? null : key)}
                  className="w-full text-left px-4 py-2 font-medium text-foreground hover:text-primary transition-elegant rounded-lg hover:bg-muted"
                >
                  {menu.label}
                </button>
                {activeMegaMenu === key && (
                  <div className="ml-4 space-y-1 mt-2">
                    {menu.items.map((item) => (
                      <Link key={item.slug} href={`/${item.slug}`}>
                        <a className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-lg transition-elegant">
                          {item.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  language: "en" | "ar";
}

export default function Footer({ language }: FooterProps) {
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const content = {
    company: isArabic ? "الشركة" : "Company",
    products: isArabic ? "المنتجات" : "Products",
    resources: isArabic ? "الموارد" : "Resources",
    support: isArabic ? "الدعم" : "Support",
    legal: isArabic ? "القانونية" : "Legal",
    followUs: isArabic ? "تابعنا" : "Follow Us",
    copyright: isArabic
      ? "جميع الحقوق محفوظة © 2026 Water Science & Technology"
      : "Copyright © 2026 Water Science & Technology. All Rights Reserved.",
    privacyPolicy: isArabic ? "سياسة الخصوصية" : "Privacy Policy",
    termsConditions: isArabic ? "الشروط والأحكام" : "Terms & Conditions",
    contactUs: isArabic ? "اتصل بنا" : "Contact Us",
  };

  const footerLinks = {
    company: [
      { label: isArabic ? "نبذة عن الشركة" : "About Us", href: "/about" },
      { label: isArabic ? "الوظائف" : "Careers", href: "/careers" },
      { label: isArabic ? "المستثمرون" : "Investors", href: "/investors" },
      { label: isArabic ? "الاستدامة" : "Sustainability", href: "/sustainability" },
    ],
    products: [
      { label: isArabic ? "جميع المنتجات" : "All Products", href: "/products" },
      { label: isArabic ? "الأسواق" : "Markets", href: "/markets" },
      { label: isArabic ? "العلامات التجارية" : "Brands", href: "/brands" },
      { label: isArabic ? "الحلول" : "Solutions", href: "/solutions" },
    ],
    resources: [
      { label: isArabic ? "المدونة" : "Blog", href: "/blog" },
      { label: isArabic ? "دراسات الحالة" : "Case Studies", href: "/case-studies" },
      { label: isArabic ? "الأسئلة الشائعة" : "FAQs", href: "/faqs" },
      { label: isArabic ? "الندوات" : "Webinars", href: "/webinars" },
    ],
    support: [
      { label: isArabic ? "مركز الدعم" : "Support Center", href: "/support" },
      { label: isArabic ? "تنزيل المنتجات" : "Downloads", href: "/downloads" },
      { label: isArabic ? "الوثائق" : "Documentation", href: "/docs" },
      { label: isArabic ? "اتصل بنا" : "Contact", href: "/contact" },
    ],
  };

  return (
    <footer dir={dir} className="bg-foreground text-background">
      <div className="container py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-bold text-xl">Water Science & Technology</span>
              <p className="text-xs text-background/60 mt-1">{isArabic ? "هندسة مستقبل المياه" : "Engineering the Future of Water"}</p>
            </div>
            <p className="text-background/80 text-sm mb-6">
              {isArabic
                ? "حلول متقدمة في العلوم والتكنولوجيا لإدارة المياه المستدامة والابتكارات الرائدة في معالجة وتنقية المياه."
                : "Advanced solutions in water science and technology for sustainable water management and leading innovations in water treatment and purification."}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-background/80 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-background/80 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@xylem.com</span>
              </div>
              <div className="flex items-center gap-2 text-background/80 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{isArabic ? "نيويورك، الولايات المتحدة" : "New York, USA"}</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="font-semibold mb-4">
                {content[key as keyof typeof content]}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className="text-background/80 hover:text-accent transition-elegant text-sm">
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/80 text-sm">{content.copyright}</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy">
              <a className="text-background/80 hover:text-accent transition-elegant text-sm">
                {content.privacyPolicy}
              </a>
            </Link>
            <Link href="/terms">
              <a className="text-background/80 hover:text-accent transition-elegant text-sm">
                {content.termsConditions}
              </a>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {["facebook", "twitter", "linkedin", "instagram"].map((social) => (
              <a
                key={social}
                href={`https://${social}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-background/20 hover:bg-accent flex items-center justify-center transition-elegant text-sm font-medium"
              >
                {social.charAt(0).toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

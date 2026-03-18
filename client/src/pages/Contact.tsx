import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const handleLanguageChange = (lang: "en" | "ar") => {
    setLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const content = {
    title: isArabic ? "اتصل بنا" : "Contact Us",
    subtitle: isArabic
      ? "نحن هنا للإجابة على أسئلتك والمساعدة في احتياجاتك"
      : "We're here to answer your questions and help with your needs",
    getInTouch: isArabic ? "تواصل معنا" : "Get in Touch",
    visitUs: isArabic ? "زيارة مكاتبنا" : "Visit Our Offices",
    businessHours: isArabic ? "ساعات العمل" : "Business Hours",
    monday: isArabic ? "الاثنين - الجمعة" : "Monday - Friday",
    saturday: isArabic ? "السبت" : "Saturday",
    sunday: isArabic ? "الأحد" : "Sunday",
    closed: isArabic ? "مغلق" : "Closed",
  };

  const locations = [
    {
      nameEn: "New York Headquarters",
      nameAr: "المقر الرئيسي بنيويورك",
      addressEn: "123 Water Street, New York, NY 10005",
      addressAr: "123 شارع المياه، نيويورك، نيويورك 10005",
      phone: "+1 (212) 555-0100",
      email: "headquarters@xylem.com",
    },
    {
      nameEn: "Middle East Regional Office",
      nameAr: "مكتب الشرق الأوسط الإقليمي",
      addressEn: "456 Gulf Avenue, Dubai, UAE",
      addressAr: "456 شارع الخليج، دبي، الإمارات",
      phone: "+971 (4) 555-0200",
      email: "mena@xylem.com",
    },
    {
      nameEn: "Europe Regional Office",
      nameAr: "مكتب أوروبا الإقليمي",
      addressEn: "789 Rhine Street, Amsterdam, Netherlands",
      addressAr: "789 شارع الراين، أمستردام، هولندا",
      phone: "+31 (20) 555-0300",
      email: "europe@xylem.com",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-background">
      <Header language={language} onLanguageChange={handleLanguageChange} />

      {/* Hero Section */}
      <section dir={dir} className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container">
          <Link href="/">
            <a className="text-white/80 hover:text-white transition-elegant mb-4 inline-block">
              {isArabic ? "← الرئيسية" : "← Home"}
            </a>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
          <p className="text-lg text-white/90 max-w-2xl">{content.subtitle}</p>
        </div>
      </section>

      {/* Main Content */}
      <section dir={dir} className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">{content.getInTouch}</h2>
              <ContactForm language={language} />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">{content.visitUs}</h2>

              {/* Locations */}
              <div className="space-y-8">
                {locations.map((location, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 shadow-elegant">
                    <h3 className="text-xl font-bold mb-4">
                      {language === "en" ? location.nameEn : location.nameAr}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <p className="text-muted-foreground">
                          {language === "en" ? location.addressEn : location.addressAr}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                        <a href={`tel:${location.phone}`} className="text-primary hover:underline">
                          {location.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                        <a href={`mailto:${location.email}`} className="text-primary hover:underline">
                          {location.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="bg-muted rounded-xl p-6 mt-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  {content.businessHours}
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    {content.monday}: <span className="text-foreground font-semibold">9:00 AM - 6:00 PM</span>
                  </p>
                  <p>
                    {content.saturday}: <span className="text-foreground font-semibold">10:00 AM - 2:00 PM</span>
                  </p>
                  <p>
                    {content.sunday}: <span className="text-foreground font-semibold">{content.closed}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
}

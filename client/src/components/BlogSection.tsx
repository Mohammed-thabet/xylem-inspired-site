import { trpc } from "@/lib/trpc";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogSectionProps {
  language: "en" | "ar";
}

export default function BlogSection({ language }: BlogSectionProps) {
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const { data: posts = [] } = trpc.blog.list.useQuery({ limit: 3 });

  const content = {
    title: isArabic ? "أحدث الأخبار والمقالات" : "Latest News & Articles",
    subtitle: isArabic
      ? "ابق على اطلاع بأحدث التطورات في صناعة المياه والتكنولوجيا"
      : "Stay informed with the latest developments in water industry and technology",
    readMore: isArabic ? "اقرأ المزيد" : "Read More",
    viewAll: isArabic ? "عرض جميع المقالات" : "View All Articles",
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(isArabic ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section dir={dir} className="py-20 md:py-32 bg-muted">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.subtitle}</p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div
                key={post.id}
                onClick={() => window.location.href = `/blog/${post.slug}`}
                className="group bg-background rounded-xl overflow-hidden shadow-elegant hover:shadow-elegant-lg transition-elegant animate-slide-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Featured Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  {post.featuredImageUrl ? (
                    <img
                      src={post.featuredImageUrl}
                      alt={language === "en" ? post.titleEn : post.titleAr}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-full mx-auto mb-2" />
                        <p className="text-muted-foreground text-xs">Featured Image</p>
                      </div>
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </div>
                </div>

                {/* Post Info */}
                <div className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-elegant line-clamp-2">
                    {language === "en" ? post.titleEn : post.titleAr}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {language === "en" ? post.excerptEn : post.excerptAr}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>{content.readMore}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Placeholder blog posts
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-background rounded-xl overflow-hidden shadow-elegant animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10" />
                <div className="p-6">
                  <div className="h-4 bg-muted rounded mb-3 w-1/3" />
                  <div className="h-6 bg-muted rounded mb-3 w-full" />
                  <div className="h-4 bg-muted rounded mb-4 w-full" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => window.location.href = "/blog"}
            className="btn-primary inline-flex items-center gap-2 group"
          >
            {content.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

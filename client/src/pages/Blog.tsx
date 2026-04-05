import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Calendar } from "lucide-react";

export default function Blog() {
  const { lang = "en" } = useParams();
  const [, navigate] = useLocation();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all blog posts
  const { data: posts, isLoading } = trpc.blog.list.useQuery({ limit: 100 });

  // Filter posts based on search term
  const filteredPosts = posts?.filter((post: any) =>
    lang === "ar"
      ? (post.titleAr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerptAr?.toLowerCase().includes(searchTerm.toLowerCase()))
      : (post.titleEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerptEn?.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handlePostClick = (slug: string) => {
    navigate(`/${lang}/blog/${slug}`);
  };

  const getTitle = (post: any) => lang === "ar" ? post.titleAr : post.titleEn;
  const getExcerpt = (post: any) => lang === "ar" ? post.excerptAr : post.excerptEn;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-6 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {lang === "ar" ? "مدونة المياه" : "Water Blog"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {lang === "ar"
              ? "اكتشف أحدث المقالات والأخبار عن تكنولوجيا المياه والاستدامة"
              : "Discover the latest articles and news about water technology and sustainability"}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder={lang === "ar" ? "ابحث عن مقالات..." : "Search articles..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post: any) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handlePostClick(post.slug)}
              >
                {post.featuredImageUrl && (
                  <div className="h-48 bg-muted overflow-hidden">
                    <img
                      src={post.featuredImageUrl}
                      alt={getTitle(post)}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString(lang === "ar" ? "ar-SA" : "en-US")
                      : ""}
                  </div>
                  <CardTitle className="line-clamp-2">
                    {getTitle(post)}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {getExcerpt(post)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="group w-full justify-between"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePostClick(post.slug);
                    }}
                  >
                    {lang === "ar" ? "اقرأ المزيد" : "Read More"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              {lang === "ar" ? "لم يتم العثور على مقالات" : "No articles found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Share2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";

export default function BlogDetail() {
  const language = "en" as const;
  const isArabic = (language as string) === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery({ slug: slug || "" });

  const content = {
    back: isArabic ? "العودة" : "Back",
    publishedOn: isArabic ? "نُشر في" : "Published on",
    category: isArabic ? "الفئة" : "Category",
    readMore: isArabic ? "اقرأ المزيد" : "Read More",
    relatedArticles: isArabic ? "مقالات ذات صلة" : "Related Articles",
    share: isArabic ? "مشاركة" : "Share",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{isArabic ? "المقالة غير موجودة" : "Article Not Found"}</h1>
          <p className="text-muted-foreground mb-6">{isArabic ? "عذراً، لم نتمكن من العثور على هذه المقالة." : "Sorry, we couldn't find this article."}</p>
          <Button onClick={() => window.location.href = "/blog"} className="btn-primary">
            {isArabic ? "العودة إلى المدونة" : "Back to Blog"}
          </Button>
        </div>
      </div>
    );
  }

  const publishDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(isArabic ? "ar-SA" : "en-US") : "";

  return (
    <div dir={dir} className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container">
          <button
            onClick={() => window.location.href = "/blog"}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-elegant mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {content.back}
          </button>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isArabic ? post.titleAr : post.titleEn}
          </h1>
          <div className="flex flex-wrap gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{content.publishedOn} {publishDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="capitalize">{content.category}: {post.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImageUrl && (
        <div className="w-full h-96 overflow-hidden">
          <img
            src={post.featuredImageUrl}
            alt={isArabic ? post.titleAr : post.titleEn}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Article Body */}
          <div className="prose prose-lg max-w-none mb-12">
            <Streamdown>
              {isArabic ? post.contentAr : post.contentEn}
            </Streamdown>
          </div>

          {/* Share Section */}
          <div className="flex items-center gap-4 py-8 border-t border-b border-border">
            <span className="font-semibold">{content.share}:</span>
            <button className="p-2 rounded-lg hover:bg-muted transition-elegant">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              {isArabic ? "هل تريد معرفة المزيد؟" : "Want to Learn More?"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {isArabic
                ? "اتصل بفريقنا للحصول على معلومات إضافية حول حلول المياه المتقدمة."
                : "Contact our team for more information about advanced water solutions."}
            </p>
            <Button className="btn-primary">
              {isArabic ? "اتصل بنا" : "Contact Us"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

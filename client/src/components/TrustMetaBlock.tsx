import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, Calendar, User } from "lucide-react";

interface TrustMetadata {
  reviewer?: string;
  reviewDate?: string;
  scientificTags?: string[];
  confidenceLevel?: "high" | "medium" | "low";
  lastUpdated?: string;
  sources?: string[];
}

interface TrustMetaBlockProps {
  metadata?: TrustMetadata;
  className?: string;
}

export function TrustMetaBlock({ metadata, className = "" }: TrustMetaBlockProps) {
  const { isArabic } = useLanguage();

  if (!metadata) return null;

  const content = {
    reviewedBy: isArabic ? "تم المراجعة بواسطة" : "Reviewed by",
    lastUpdated: isArabic ? "آخر تحديث" : "Last Updated",
    scientificTags: isArabic ? "الوسوم العلمية" : "Scientific Tags",
    highConfidence: isArabic ? "ثقة عالية" : "High Confidence",
    mediumConfidence: isArabic ? "ثقة متوسطة" : "Medium Confidence",
    lowConfidence: isArabic ? "ثقة منخفضة" : "Low Confidence",
    sources: isArabic ? "المصادر" : "Sources",
  };

  const confidenceColors = {
    high: "bg-green-100 text-green-800 border-green-300",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    low: "bg-red-100 text-red-800 border-red-300",
  };

  const confidenceLabels = {
    high: content.highConfidence,
    medium: content.mediumConfidence,
    low: content.lowConfidence,
  };

  return (
    <div className={`bg-muted border border-border rounded-lg p-4 space-y-4 ${className}`}>
      {/* Confidence Badge */}
      {metadata.confidenceLevel && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${confidenceColors[metadata.confidenceLevel]}`}>
            {confidenceLabels[metadata.confidenceLevel]}
          </span>
        </div>
      )}

      {/* Reviewer */}
      {metadata.reviewer && (
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium">{content.reviewedBy}</p>
            <p className="text-sm text-muted-foreground">{metadata.reviewer}</p>
          </div>
        </div>
      )}

      {/* Last Updated */}
      {metadata.lastUpdated && (
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium">{content.lastUpdated}</p>
            <p className="text-sm text-muted-foreground">{metadata.lastUpdated}</p>
          </div>
        </div>
      )}

      {/* Scientific Tags */}
      {metadata.scientificTags && metadata.scientificTags.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">{content.scientificTags}</p>
          <div className="flex flex-wrap gap-2">
            {metadata.scientificTags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {metadata.sources && metadata.sources.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">{content.sources}</p>
          <ul className="space-y-1">
            {metadata.sources.map((source, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{source}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

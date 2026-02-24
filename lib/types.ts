export interface VisibilityScore {
  overall: number;
  jsonLd: number;
  semantic: number;
  robots: number;
  breakdown: {
    category: string;
    score: number;
    weight: number;
  }[];
}

export interface CrawlerStatus {
  name: string;
  visible: boolean;
  score: number;
  recommendations: string[];
}

export interface ScanResult {
  company: string;
  url: string;
  score: VisibilityScore;
  crawlers: CrawlerStatus[];
  scanDate: string;
  htmlContent?: string;
  hasJsonLd: boolean;
  hasOpenGraph: boolean;
  hasMetaTags: boolean;
  robotsRules: {
    allowsGPT: boolean;
    allowsGoogle: boolean;
    allowsClaude: boolean;
  };
}

export interface ComparisonMetric {
  name: string;
  legacy: boolean;
  ai: boolean;
  description: string;
}

export interface PaymentStatus {
  success: boolean;
  userId?: string;
  scanId?: string;
  timestamp?: string;
}

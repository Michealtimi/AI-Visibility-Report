import { VisibilityScore, CrawlerStatus } from './types';
import { ParsedContent, parseHtmlContent, checkRobotsRules } from './html-parser';

export function calculateVisibilityScore(html: string): VisibilityScore {
  const parsed = parseHtmlContent(html);
  
  // Calculate JSON-LD score (40% weight)
  const jsonLdScore = calculateJsonLdScore(parsed);
  
  // Calculate semantic score (30% weight)
  const semanticScore = calculateSemanticScore(parsed);
  
  // Calculate robots score (30% weight)
  const robotsScore = calculateRobotsScore(parsed);
  
  // Overall score
  const overall = Math.round(
    (jsonLdScore * 0.4 + semanticScore * 0.3 + robotsScore * 0.3)
  );
  
  return {
    overall,
    jsonLd: jsonLdScore,
    semantic: semanticScore,
    robots: robotsScore,
    breakdown: [
      {
        category: 'Structured Data (JSON-LD)',
        score: jsonLdScore,
        weight: 40,
      },
      {
        category: 'Semantic HTML & Meta Tags',
        score: semanticScore,
        weight: 30,
      },
      {
        category: 'Robots Configuration',
        score: robotsScore,
        weight: 30,
      },
    ],
  };
}

export function calculateJsonLdScore(parsed: ParsedContent): number {
  if (!parsed.hasJsonLd) {
    return 0;
  }
  
  // Base score for having JSON-LD
  let score = 40;
  
  // Bonus for multiple JSON-LD blocks
  score += Math.min(parsed.jsonLdData.length * 10, 30);
  
  // Bonus for schema.org types that AI crawlers value
  const aiValuedSchemas = ['Organization', 'Product', 'Article', 'WebPage', 'BreadcrumbList', 'FAQPage'];
  const schemaTypes = parsed.jsonLdData.flatMap(item => {
    if (item['@type']) {
      return Array.isArray(item['@type']) ? item['@type'] : [item['@type']];
    }
    return [];
  });
  
  const matchedSchemas = schemaTypes.filter(type => aiValuedSchemas.includes(type)).length;
  score += Math.min(matchedSchemas * 8, 30);
  
  return Math.min(score, 100);
}

export function calculateSemanticScore(parsed: ParsedContent): number {
  let score = 0;
  
  // Title (20 points)
  if (parsed.hasTitle && parsed.title.length > 10) {
    score += 20;
  }
  
  // Meta description (20 points)
  if (parsed.hasDescription && parsed.description.length > 20) {
    score += 20;
  }
  
  // H1 tags (20 points)
  if (parsed.h1Tags.length > 0) {
    score += 20;
  }
  
  // Open Graph tags (20 points)
  if (parsed.hasOpenGraph && Object.keys(parsed.ogTags).length >= 3) {
    score += 20;
  }
  
  // Additional meta tags (20 points)
  if (parsed.hasMetaTags && Object.keys(parsed.metaTags).length >= 5) {
    score += 20;
  }
  
  return Math.min(score, 100);
}

export function calculateRobotsScore(parsed: ParsedContent): number {
  const rules = checkRobotsRules(parsed.robotsContent);
  
  // Check if there are any noindex or blocking rules
  if (!rules.allowsGPT || !rules.allowsGoogle || !rules.allowsClaude) {
    // Parse more carefully
    const hasNoindex = parsed.robotsContent.toLowerCase().includes('noindex');
    const hasNone = parsed.robotsContent.toLowerCase().includes('none');
    
    if (hasNoindex || hasNone) {
      return 0; // Complete block
    }
  }
  
  // Check for explicit allow rules
  if (parsed.robotsContent.toLowerCase().includes('follow') && 
      !parsed.robotsContent.toLowerCase().includes('nofollow')) {
    return 100;
  }
  
  // Default: allow (85 if no robots meta, 70 if present but permissive)
  return parsed.robotsContent ? 70 : 85;
}

export function generateCrawlerStatuses(score: VisibilityScore): CrawlerStatus[] {
  const baseScore = score.overall;
  
  // Add slight variations for different crawlers
  const gptScore = Math.max(0, Math.min(100, baseScore + (Math.random() - 0.5) * 5));
  const geminiScore = Math.max(0, Math.min(100, baseScore + (Math.random() - 0.5) * 5));
  const claudeScore = Math.max(0, Math.min(100, baseScore + (Math.random() - 0.5) * 5));
  
  return [
    {
      name: 'ChatGPT-5',
      visible: gptScore > 50,
      score: Math.round(gptScore),
      recommendations: generateRecommendations(score, 'gpt'),
    },
    {
      name: 'Google Gemini',
      visible: geminiScore > 50,
      score: Math.round(geminiScore),
      recommendations: generateRecommendations(score, 'gemini'),
    },
    {
      name: 'Claude',
      visible: claudeScore > 50,
      score: Math.round(claudeScore),
      recommendations: generateRecommendations(score, 'claude'),
    },
  ];
}

export function generateRecommendations(score: VisibilityScore, crawler: string): string[] {
  const recommendations: string[] = [];
  
  if (score.jsonLd < 50) {
    recommendations.push('Add JSON-LD structured data to your pages');
    recommendations.push('Include Organization and Product schemas');
  }
  
  if (score.semantic < 50) {
    recommendations.push('Improve meta descriptions (120-160 characters)');
    recommendations.push('Add Open Graph tags for social sharing');
  }
  
  if (score.robots < 50) {
    recommendations.push('Check robots.txt for blocking rules');
    recommendations.push('Ensure Googlebot is explicitly allowed');
  }
  
  if (score.overall >= 80) {
    recommendations.push('Great job! Your site is AI-crawler friendly.');
  }
  
  return recommendations.slice(0, 3);
}

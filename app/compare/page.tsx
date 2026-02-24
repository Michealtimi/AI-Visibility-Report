import { Metadata } from 'next';
import { BattleCard } from '@/components/battle-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI-Native SEO vs Legacy SEO | AI Search Scanner',
  description: 'Discover how AI crawlers differ from traditional search engines and why your legacy SEO strategy is failing.',
};

function ComparePageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Compare SEO Strategies</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Understanding the fundamental differences between legacy search engine optimization and
              AI-native content optimization.
            </p>
          </div>
        </div>

        {/* Battle Card */}
        <BattleCard />

        {/* CTA Section */}
        <div className="glass rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to Optimize for AI?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start by running a free scan of your website to see how visible you are to AI crawlers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-primary font-bold">
              <a href="/">Run Free Scan</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/compare">View Comparison Table</a>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-accent/10">
          <Button asChild variant="ghost">
            <a href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ComparisonChart',
    name: 'AI-Native SEO vs Legacy SEO',
    description: 'Compare AI-native SEO strategies with traditional search engine optimization',
    url: 'https://aisearchvisibility.com/compare',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ComparePageContent />
    </>
  );
}

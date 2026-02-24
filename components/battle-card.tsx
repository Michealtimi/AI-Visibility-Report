'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface BattleCardProps {
  name: string;
  isLegacy: boolean;
}

const features = [
  {
    name: 'H1 Tags Indexing',
    legacy: true,
    ai: true,
    importance: 'critical',
  },
  {
    name: 'Backlinks Matter',
    legacy: true,
    ai: false,
    importance: 'decreasing',
  },
  {
    name: 'Domain Age Ranking',
    legacy: true,
    ai: false,
    importance: 'irrelevant',
  },
  {
    name: 'JSON-LD Schema Recognition',
    legacy: false,
    ai: true,
    importance: 'critical',
  },
  {
    name: 'Semantic HTML Tags',
    legacy: false,
    ai: true,
    importance: 'important',
  },
  {
    name: 'AI-Specific Robots Rules',
    legacy: false,
    ai: true,
    importance: 'important',
  },
  {
    name: 'Open Graph Metadata',
    legacy: true,
    ai: true,
    importance: 'important',
  },
  {
    name: 'Natural Language Processing',
    legacy: false,
    ai: true,
    importance: 'critical',
  },
];

export function BattleCard() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
          Legacy SEO vs. <span className="text-accent">AI-Native Optimization</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your old SEO playbook is obsolete. AI crawlers use a completely different algorithm.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Legacy SEO Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 space-y-6 border border-destructive/10"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-destructive">Legacy SEO</h3>
            <p className="text-muted-foreground">
              Traditional search engine optimization focused on Google's algorithms (2000s-2020s)
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">How it Works:</p>
            {['Backlinks & Domain Authority', 'Keyword Density', 'Page Load Speed', 'Mobile Responsiveness'].map(
              (item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              )
            )}
          </div>

          <div className="border-t border-accent/10 pt-6 space-y-3">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Effectiveness Today:</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-destructive">↓ 60%</span>
              <span className="text-muted-foreground">For AI Crawlers</span>
            </div>
          </div>
        </motion.div>

        {/* AI-Native Optimization Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 space-y-6 border border-chart-3/20 bg-chart-3/5"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-chart-3">AI-Native Optimization</h3>
            <p className="text-muted-foreground">
              New optimization techniques designed for LLM and AI model training (2024+)
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">How it Works:</p>
            {['Structured Data (JSON-LD)', 'Semantic HTML', 'Content Clarity', 'AI Crawler Directives'].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-chart-3 shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-accent/10 pt-6 space-y-3">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Effectiveness Today:</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-chart-3">↑ 280%</span>
              <span className="text-muted-foreground">For AI Crawlers</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature Parity Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-accent/10">
                <th className="text-left px-6 py-4 font-bold text-foreground">Feature</th>
                <th className="text-center px-6 py-4 font-bold text-destructive">Legacy SEO</th>
                <th className="text-center px-6 py-4 font-bold text-chart-3">AI-Native</th>
                <th className="text-left px-6 py-4 font-bold text-accent">Importance</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <motion.tr
                  key={feature.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-accent/5 hover:bg-secondary/20 transition-colors"
                >
                  <td className="px-6 py-4 text-foreground font-medium">{feature.name}</td>
                  <td className="px-6 py-4 text-center">
                    {feature.legacy ? (
                      <Check className="w-5 h-5 text-chart-3 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {feature.ai ? (
                      <Check className="w-5 h-5 text-chart-3 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        feature.importance === 'critical'
                          ? 'bg-destructive/10 text-destructive'
                          : feature.importance === 'important'
                            ? 'bg-chart-2/10 text-chart-2'
                            : 'bg-muted/10 text-muted-foreground'
                      }`}
                    >
                      {feature.importance.charAt(0).toUpperCase() + feature.importance.slice(1)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

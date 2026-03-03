'use client';

import { ScanResult, CrawlerStatus, VisibilityScore } from '@/lib/types';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface VisibilityDashboardProps {
  result: ScanResult;
}

export function VisibilityDashboard({ result }: VisibilityDashboardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#0a66c2';
    if (score >= 60) return '#0073e6';
    return '#d32f2f';
  };
  // Helper to get status icon based on visibility and score
  const getStatusIcon = (visible: boolean, score: number) => {
    if (!visible) {
      return <XCircle className="w-6 h-6 text-destructive" />;
    }
    if (score >= 80) {
      return <CheckCircle className="w-6 h-6 text-chart-3" />;
    }
    return <AlertCircle className="w-6 h-6 text-chart-2" />;
  };

  return (
    <div className="space-y-12">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-8">Your AI Visibility Score</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Score Circle */}
          <div className="flex justify-center items-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e4e6eb"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={getScoreColor(result.score.overall)}
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - result.score.overall / 100)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - result.score.overall / 100) }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <div className="text-4xl font-bold text-foreground">{result.score.overall}</div>
                <div className="text-xs text-muted-foreground">out of 100</div>
              </div>
            </div>
          </div>
          
          {/* Score Breakdown */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Structured Data</span>
                <span className="font-semibold text-accent">{result.score.jsonLd}/100</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <motion.div
                  className="bg-chart-1 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${result.score.jsonLd}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Semantic HTML & Meta Tags</span>
                <span className="font-semibold text-accent">{result.score.semantic}/100</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <motion.div
                  className="bg-chart-2 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${result.score.semantic}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Robots Configuration</span>
                <span className="font-semibold text-accent">{result.score.robots}/100</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <motion.div
                  className="bg-chart-3 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${result.score.robots}%` }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Crawler Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-foreground mb-8">Crawler Accessibility Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {result.crawlers.map((crawler, index) => (
            <motion.div
              key={crawler.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="rounded-lg border border-accent/20 p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-foreground">{crawler.name}</h4>
                {getStatusIcon(crawler.visible, crawler.score)}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-3xl font-bold text-accent">{crawler.score}</div>
                  <p className="text-sm text-muted-foreground">Visibility Score</p>
                </div>
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                  style={{
                    background: `conic-gradient(${getScoreColor(crawler.score)} ${crawler.score * 3.6}deg, #2a3050 ${crawler.score * 3.6}deg)`,
                  }}
                >
                  {Math.round((crawler.score / 100) * 100)}%
                </div>
              </div>
              
              <div className="text-sm">
                <p className="font-semibold text-foreground mb-2">Recommendations:</p>
                <ul className="space-y-1">
                  {crawler.recommendations.slice(0, 2).map((rec, i) => (
                    <li key={i} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t border-accent/10">
                <p className="text-sm">
                  <span className="font-semibold text-foreground">Status: </span>
                  <span className={crawler.visible ? 'text-chart-3' : 'text-destructive'}>
                    {crawler.visible ? '✓ Visible' : '✗ Not Optimized'}
                  </span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass rounded-2xl p-8"
      >
        <h3 className="text-xl font-bold text-foreground mb-6">Audit Details</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">JSON-LD Structured Data</p>
            <p className="font-semibold text-accent">{result.hasJsonLd ? 'Present' : 'Missing'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Open Graph Tags</p>
            <p className="font-semibold text-accent">{result.hasOpenGraph ? 'Present' : 'Missing'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Meta Tags</p>
            <p className="font-semibold text-accent">{result.hasMetaTags ? 'Present' : 'Missing'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Scan Date</p>
            <p className="font-semibold text-accent">{new Date(result.scanDate).toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

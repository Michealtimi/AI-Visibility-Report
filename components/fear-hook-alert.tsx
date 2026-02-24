'use client';

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface FearHookAlertProps {
  company: string;
  score: number;
}

export function FearHookAlert({ company, score }: FearHookAlertProps) {
  if (score >= 75) {
    // Positive message for high scores
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-chart-3/30 bg-chart-3/5 p-6 space-y-3"
      >
        <div className="flex items-start gap-4">
          <div className="text-chart-3 mt-1">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">Excellent AI Visibility!</h3>
            <p className="text-muted-foreground">
              {company} is well-optimized for AI crawlers. Your website is discoverable by ChatGPT-5,
              Gemini, Claude, and other AI models.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (score >= 50) {
    // Warning message for medium scores
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-chart-2/30 bg-chart-2/5 p-6 space-y-3"
      >
        <div className="flex items-start gap-4">
          <div className="text-chart-2 mt-1">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">Moderate AI Visibility Issues</h3>
            <p className="text-muted-foreground">
              {company} has room for improvement. Some AI crawlers may have limited access to your
              content. Consider optimizing your structured data and metadata.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Critical alert for low scores
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pulse-glow rounded-2xl border border-destructive/30 bg-destructive/5 p-6 space-y-3"
    >
      <div className="flex items-start gap-4">
        <div className="text-destructive mt-1">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-destructive text-lg">Critical: Low AI Visibility</h3>
          <p className="text-muted-foreground">
            <strong>Your competitors are winning.</strong> AI Agents are currently prioritizing your
            competitors over {company}. Your website is not properly optimized for AI crawler access.
            This is your competitive disadvantage.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

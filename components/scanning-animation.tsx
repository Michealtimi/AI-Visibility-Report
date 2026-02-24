'use client';

import { motion } from 'framer-motion';

const scanningTexts = [
  'Analyzing JSON-LD schemas...',
  'Scanning semantic HTML tags...',
  'Checking robots.txt rules...',
  'Evaluating meta tags...',
  'Testing crawler accessibility...',
  'Computing visibility score...',
];

export function ScanningAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 px-4">
      <div className="relative w-32 h-32 mb-12">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent border-t-accent border-r-accent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Middle rotating ring (slower) */}
        <motion.div
          className="absolute inset-4 border-2 border-transparent border-b-accent/60 border-l-accent/60 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Inner rotating ring */}
        <motion.div
          className="absolute inset-8 border-2 border-transparent border-t-accent/30 border-r-accent/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Center pulse */}
        <motion.div
          className="absolute inset-12 bg-accent/20 rounded-full"
          animate={{
            boxShadow: [
              '0 0 10px rgba(0, 212, 255, 0.3)',
              '0 0 20px rgba(0, 212, 255, 0.6)',
              '0 0 10px rgba(0, 212, 255, 0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Animated text */}
      <div className="text-center space-y-6">
        <motion.h2
          className="text-3xl font-bold text-foreground"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Scanning Your Website
        </motion.h2>
        
        <div className="relative h-6 flex items-center justify-center min-w-80">
          {scanningTexts.map((text, index) => (
            <motion.p
              key={text}
              className="text-primary font-medium text-sm"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              {text}
            </motion.p>
          ))}
        </div>
        
        <p className="text-foreground/60 text-sm mt-4">
          This typically takes 5-10 seconds
        </p>
      </div>
    </div>
  );
}

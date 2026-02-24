'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScanResult } from '@/lib/types';

interface PaywallSectionProps {
	company: string;
	score: number;
	result?: ScanResult;
}

export function PaywallSection({ company, score }: PaywallSectionProps) {
	const roadmapItems = [
		'Detailed JSON-LD optimization guide',
		'Meta tag audit and fixes',
		'Robots.txt configuration',
		'Open Graph optimization',
		'AI-specific crawling rules',
		'Competitor analysis report',
		'Implementation timeline',
		'Monthly monitoring dashboard',
	];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className='space-y-8'
		>
			{/* Upgrade CTA */}
			<div className='glass rounded-2xl p-8 space-y-6'>
				<div className='text-center space-y-4'>
					<h3 className='text-3xl font-bold text-foreground'>
						Get Your Complete AI Readiness Roadmap
					</h3>
					<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
						Unlock a detailed, step-by-step plan to optimize{' '}
						{company} for AI crawlers. Get ahead of your
						competition.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{/* Blurred Roadmap Preview */}
					<div className='relative rounded-xl overflow-hidden bg-secondary/30 p-6 h-96'>
						<div className='absolute inset-0 bg-linear-to-br from-accent/5 to-background/50 backdrop-blur-lg' />

						<div className='relative z-10 space-y-3'>
							{roadmapItems.slice(0, 4).map((item, i) => (
								<div
									key={i}
									className='flex items-center gap-3 blur-sm'
								>
									<CheckCircle className='w-5 h-5 text-accent shrink-0' />
									<span className='text-foreground'>
										{item}
									</span>
								</div>
							))}

							{roadmapItems.slice(4).map((item, i) => (
								<div
									key={i + 4}
									className='flex items-center gap-3 blur-sm'
								>
									<Lock className='w-5 h-5 text-muted-foreground shrink-0' />
									<span className='text-muted-foreground'>
										{item}
									</span>
								</div>
							))}
						</div>

						{/* Blur overlay with lock icon */}
						<div className='absolute inset-0 flex items-center justify-center backdrop-blur-md'>
							<div className='text-center space-y-3'>
								<Lock className='w-12 h-12 text-accent mx-auto' />
								<p className='text-foreground font-semibold'>
									Locked Plan
								</p>
								<p className='text-sm text-muted-foreground'>
									Upgrade to unlock
								</p>
							</div>
						</div>
					</div>

					{/* Pricing Card */}
					<div className='rounded-xl border border-accent/30 bg-secondary/20 p-8 flex flex-col justify-between'>
						<div className='space-y-6'>
							<div>
								<p className='text-muted-foreground text-sm mb-2'>
									Today's Price
								</p>
								<div className='flex items-baseline gap-2'>
									<span className='text-5xl font-bold text-foreground'>
										$9
									</span>
									<span className='text-muted-foreground text-lg line-through'>
										$49
									</span>
								</div>
								<p className='text-xs text-muted-foreground mt-2'>
									One-time payment · Lifetime access
								</p>
							</div>

							<div className='space-y-3 border-t border-accent/10 pt-6'>
								<p className='font-semibold text-foreground text-sm'>
									Includes:
								</p>
								{[
									'Full AI readiness analysis',
									'Step-by-step fix guide',
									'Competitor insights',
									'PDF export of report',
								].map((feature, i) => (
									<div
										key={i}
										className='flex items-center gap-2'
									>
										<CheckCircle className='w-4 h-4 text-chart-3 shrink-0' />
										<span className='text-sm text-muted-foreground'>
											{feature}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* CTA Button */}
						<motion.div
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='mt-8'
						>
							<Button
								asChild
								size='lg'
								className='w-full bg-accent hover:bg-accent/90 text-white font-bold py-6 text-lg'
							>
								<a
									href={`https://lemonsqueezy.com/checkout?checkout[email]=&checkout[name]=${encodeURIComponent(company)}`}
									target='_blank'
									rel='noopener noreferrer'
								>
									Unlock Full Roadmap
								</a>
							</Button>
						</motion.div>

						<p className='text-xs text-muted-foreground text-center mt-4'>
							Secure payment · 30-day guarantee
						</p>
					</div>
				</div>
			</div>

			{/* Social Proof */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
				className='text-center text-sm text-muted-foreground'
			>
				<p>Trusted by 1,000+ companies. Used in 150+ countries.</p>
			</motion.div>
		</motion.div>
	);
}

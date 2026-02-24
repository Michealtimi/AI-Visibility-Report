'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight } from 'lucide-react';

export function HeroScanner() {
	const [url, setUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!url.trim()) return;

		setLoading(true);

		// Extract domain/company name from URL
		let company = url.trim();
		try {
			const urlObj = new URL(
				url.startsWith('http') ? url : `https://${url}`,
			);
			company = urlObj.hostname.replace('www.', '').split('.')[0];
		} catch {
			company = url.replace(/[^a-zA-Z0-9-]/g, '');
		}

		// Navigate to check page
		router.push(
			`/check/${encodeURIComponent(company)}?url=${encodeURIComponent(url)}`,
		);
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-secondary/20 px-4'>
			<div className='w-full max-w-2xl'>
				{/* Hero Content */}
				<div className='text-center mb-12'>
					<div className='inline-block mb-6'>
						<div className='px-4 py-2 rounded-lg border border-accent/30 bg-accent/5 backdrop-blur-sm'>
							<span className='text-sm font-semibold text-accent flex items-center gap-2'>
								<span className='h-2 w-2 bg-accent rounded-full animate-pulse'></span>
								AI Crawler Detection Now Live
							</span>
						</div>
					</div>

					<h1 className='text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance'>
						Is Your Website{' '}
						<span className='text-accent'>Visible to AI?</span>
					</h1>

					<p className='text-xl text-muted-foreground mb-8 text-balance'>
						Instantly audit your site's accessibility to ChatGPT-5,
						Gemini, and Claude. Get your AI readiness score in
						seconds.
					</p>
				</div>

				{/* Scanner Input */}
				<form
					onSubmit={handleSubmit}
					className='space-y-6 mb-12'
				>
					<div className='glass rounded-2xl p-8 space-y-4'>
						<div className='flex flex-col sm:flex-row gap-3'>
							<Input
								type='text'
								placeholder='Enter your website URL...'
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								className='flex-1 h-14 px-6 bg-background/50 border-accent/20 focus:border-accent text-foreground placeholder:text-muted-foreground'
								disabled={loading}
							/>
							<Button
								type='submit'
								disabled={loading || !url.trim()}
								size='lg'
								className='h-14 px-8 bg-white text-accent font-bold border border-accent shadow-lg hover:bg-accent hover:text-white transition-all duration-200 flex items-center gap-2'
							>
								{loading ? 'Scanning...' : 'Scan Now'}
								<ChevronRight className='w-5 h-5' />
							</Button>
						</div>

						<p className='text-sm text-muted-foreground'>
							No sign-up required. Your scan results will be
							visible immediately.
						</p>
					</div>
				</form>

				{/* Trust Signals */}
				<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
					<div className='glass rounded-lg p-6 text-center'>
						<div className='text-3xl font-bold text-accent mb-2'>
							10K+
						</div>
						<p className='text-sm text-muted-foreground'>
							Sites Scanned
						</p>
					</div>
					<div className='glass rounded-lg p-6 text-center'>
						<div className='text-3xl font-bold text-accent mb-2'>
							{'<'}1s
						</div>
						<p className='text-sm text-muted-foreground'>
							Scan Speed
						</p>
					</div>
					<div className='glass rounded-lg p-6 text-center'>
						<div className='text-3xl font-bold text-accent mb-2'>
							100%
						</div>
						<p className='text-sm text-muted-foreground'>
							Free Forever
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

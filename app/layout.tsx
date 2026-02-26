import Navbar from '@/components/navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import AdsenseSlot from '@/components/adsense-slot';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
	title: 'AI Search Visibility Scanner | Check AI Crawler Access',
	description:
		'Audit your website visibility to ChatGPT-5, Gemini, and Claude. Get an instant AI readiness score and fix your AI crawler accessibility.',
	generator: 'v0.app',
	icons: {
		icon: [
			{
				url: '/icon-light-32x32.png',
				media: '(prefers-color-scheme: light)',
			},
			{
				url: '/icon-dark-32x32.png',
				media: '(prefers-color-scheme: dark)',
			},
			{
				url: '/icon.svg',
				type: 'image/svg+xml',
			},
		],
		apple: '/apple-icon.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	// Canonical logic for SEO
	const pathname =
		typeof window !== 'undefined' ? window.location.pathname : '';
	const canonicalUrl = `https://aisearchscanner.com${pathname}`;
	return (
		<html lang='en'>
			<head>
				<link
					rel='canonical'
					href={canonicalUrl}
				/>
				{/* Google AdSense Verification Script */}
				<Script
					id='adsense-init'
					src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3191981833978007'
					crossOrigin='anonymous'
					strategy='beforeInteractive' // Force it to load immediately
				/>
			</head>
			<body
				className={`font-sans antialiased bg-background text-foreground ${inter.className}`}
			>
				<Navbar />
				<div className='flex flex-col md:flex-row md:items-start w-full max-w-screen-2xl mx-auto'>
					{/* Left AdSense slot - hidden on small screens */}
					<div className='hidden md:block md:w-1/6 lg:w-1/5 xl:w-1/6 2xl:w-1/6 px-2'>
						<AdsenseSlot />
					</div>

					{/* Main content */}
					<main className='w-full md:w-4/6 lg:w-3/5 xl:w-2/3 2xl:w-2/3 px-2 min-h-screen'>
						{children}
					</main>

					{/* Right AdSense slot - hidden on small screens */}
					<div className='hidden md:block md:w-1/6 lg:w-1/5 xl:w-1/6 2xl:w-1/6 px-2'>
						<AdsenseSlot />
					</div>

					{/* Mobile AdSense slot - visible only on small screens, stacked below content */}
					<div className='block md:hidden w-full px-2 mt-4'>
						<AdsenseSlot />
					</div>
				</div>
				<Analytics />
			</body>
		</html>
	);
}

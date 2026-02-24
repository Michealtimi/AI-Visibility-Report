import Navbar from '@/components/navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

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
			</head>
			<body
				className={`font-sans antialiased bg-background text-foreground ${inter.className}`}
			>
				<Navbar />
				{children}
				<Analytics />
			</body>
		</html>
	);
}

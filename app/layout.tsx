import Navbar from '@/components/navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import AdsenseSlot from '@/components/adsense-slot';
import Script from 'next/script'; // Use the Next.js Script component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AI Search Visibility Scanner | Logik Systems',
    description: 'Audit your website visibility to ChatGPT-5, Gemini, and Claude. Get an instant AI readiness score.',
    // Updated metadata for your new domain
    metadataBase: new URL('https://ai.logik.website'),
    icons: {
        icon: '/ai-visibility-logo.png',
        shortcut: '/ai-visibility-logo.png',
        apple: '/ai-visibility-logo.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    
    return (
        <html lang='en'>
            <head>
                {/* 1. The AdSense ID Tag - Good for verification */}
                <meta
                    name='google-adsense-account'
                    content='ca-pub-3191981833978007'
                />
                {/* 2. The Main AdSense Script using Next.js optimization */}
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3191981833978007"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
            </head>
            <body className={`font-sans antialiased bg-background text-foreground ${inter.className}`}>
                <Navbar />
                <div className='flex flex-col md:flex-row md:items-start w-full max-w-screen-2xl mx-auto'>
                    {/* Left Ad - Desktop */}
                    <div className='hidden md:block md:w-1/6 lg:w-1/5 px-2'>
                        <AdsenseSlot />
                    </div>

                    {/* Main content */}
                    <main className='w-full md:w-4/6 lg:w-3/5 px-2 min-h-screen'>
                        {children}
                    </main>

                    {/* Right Ad - Desktop */}
                    <div className='hidden md:block md:w-1/6 lg:w-1/5 px-2'>
                        <AdsenseSlot />
                    </div>

                    {/* Mobile Ad */}
                    <div className='block md:hidden w-full px-2 mt-4'>
                        <AdsenseSlot />
                    </div>
                </div>
                <Analytics />
            </body>
        </html>
    );
}
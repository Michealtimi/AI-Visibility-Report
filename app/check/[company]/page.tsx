// SEO: generateMetadata for pSEO
import { ScanningAnimation } from '@/components/scanning-animation';
import { VisibilityDashboard } from '@/components/visibility-dashboard';
import { FearHookAlert } from '@/components/fear-hook-alert';
import { PaywallSection } from '@/components/paywall-section';
import { PDFGenerator } from '@/components/pdf-generator';
import { ScanResult } from '@/lib/types';
import { scanWebsite } from '../actions';
export async function generateMetadata({
	params,
}: {
	params: Promise<{ company: string }>;
}) {
	const { company } = await params;
	return {
		title: `AI Visibility Report for ${company}`,
		description: `Complete AI search visibility audit for ${company}. Analysis of JSON-LD, structured data, and crawler accessibility.`,
	};
}

function CheckPageContent({
	company,
	result,
	error,
}: {
	company: string;
	result: ScanResult | null;
	error?: string | null;
}) {
	if (error || !result) {
		return (
			<>
				<div className='min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-secondary/20 px-4'>
					<div className='text-center max-w-md'>
						<h1 className='text-3xl font-bold text-foreground mb-4'>
							Scan Failed
						</h1>
						<p className='text-muted-foreground mb-8'>
							{error ||
								'Unable to complete the scan. Please try again.'}
						</p>
						<a
							href='/'
							className='inline-block px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors'
						>
							Try Another URL
						</a>
					</div>
				</div>
			</>
		);
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'AnalysisNewsArticle',
		headline: `AI Visibility Report for ${company}`,
		description: `Complete AI search visibility audit for ${company}. Analysis of JSON-LD, structured data, and crawler accessibility.`,
		datePublished: new Date(result.scanDate).toISOString(),
		author: {
			'@type': 'Organization',
			name: 'AI Search Visibility Scanner',
			url: 'https://aisearchvisibility.com',
		},
		publisher: {
			'@type': 'Organization',
			name: 'AI Search Visibility Scanner',
			logo: {
				'@type': 'ImageObject',
				url: '/ai-visibility-logo.png',
			},
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: result.score.overall,
			bestRating: 100,
			worstRating: 0,
			ratingCount: 1,
		},
	};

	// BreadcrumbList JSON-LD for SEO
	const breadcrumbJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://aisearchscanner.com/',
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: `Report: ${company}`,
				item: `https://aisearchscanner.com/check/${company}`,
			},
		],
	};

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbJsonLd),
				}}
			/>
			<div className='min-h-screen bg-linear-to-br from-background via-background to-secondary/20 px-4 py-12'>
				<div className='max-w-6xl mx-auto space-y-12'>
					{/* Header */}
					<div className='text-center space-y-4 mb-12'>
						<h1 className='text-4xl md:text-5xl font-bold text-foreground text-balance'>
							AI Visibility Report for{' '}
							<span className='text-accent'>{company}</span>
						</h1>
						<p className='text-lg text-muted-foreground'>
							Scanned on{' '}
							{new Date(result.scanDate).toLocaleDateString()} at{' '}
							{new Date(result.scanDate).toLocaleTimeString()}
						</p>
					</div>

					{/* Fear Hook Alert */}
					<FearHookAlert
						company={company}
						score={result.score.overall}
					/>

					{/* Dashboard */}
					<VisibilityDashboard result={result} />

					{/* PDF Export */}
					<div className='flex justify-center'>
						<PDFGenerator result={result} />
					</div>

					{/* Paywall Section */}
					<PaywallSection
						company={company}
						score={result.score.overall}
						result={result}
					/>

					{/* Footer */}
					<div className='text-center pt-8 border-t border-accent/10'>
						<a
							href='/'
							className='text-accent hover:text-accent/80 transition-colors'
						>
							← Scan Another Website
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

// Server Component: fetches data and passes to client component
export default async function CheckPage({
	params,
	searchParams,
}: {
	params: { company: string } | Promise<{ company: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	// Support both Promise and direct object for params
	let resolvedParams: { company: string };
	if (params && typeof (params as any).then === 'function') {
		resolvedParams = (await params) as { company: string };
	} else if (params && typeof params === 'object' && 'company' in params) {
		resolvedParams = params as { company: string };
	} else {
		throw new Error('Invalid params: company not found');
	}
	const resolvedSearchParams = await searchParams;
	const company = decodeURIComponent(resolvedParams.company);
	const url =
		typeof resolvedSearchParams?.url === 'string' ?
			resolvedSearchParams.url
		:	'';

	if (!url) {
		return (
			<>
				<div className='min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-background via-background to-secondary/20 px-4'>
					<a
						href='/'
						className='mb-8 mt-8 inline-block px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors'
					>
						Scan Another Website
					</a>
					<div className='text-center max-w-md'>
						<h1 className='text-3xl font-bold text-foreground mb-4'>
							No URL Provided
						</h1>
						<p className='text-muted-foreground mb-8'>
							Please provide a URL to scan.
						</p>
					</div>
				</div>
			</>
		);
	}

	console.log('Scanning company:', company, 'URL:', url);
	let result: ScanResult | null = null;
	let error: string | null = null;
	try {
		result = await scanWebsite(url, company);
	} catch (err: any) {
		error = err instanceof Error ? err.message : String(err);
	}

	// Show animation while loading, then show result
	if (!result && !error) {
		return <ScanningAnimation />;
	}

	return (
		<>
			<a
				href='/'
				className='mb-8 mt-8 inline-block px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors'
			>
				Scan Another Website
			</a>
			<CheckPageContent
				company={company}
				result={result}
				error={error}
			/>
		</>
	);
}

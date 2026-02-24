export default function AboutPage() {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 px-4 py-12'>
			<div className='max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center'>
				<img
					src='/ai-visibility-logo.png'
					alt='AI Visibility Report Logo'
					className='mx-auto mb-6 h-20 w-auto'
				/>
				<h1 className='text-4xl font-bold mb-4 text-accent'>
					About AI Visibility Report
				</h1>
				<p className='text-lg text-muted-foreground mb-6'>
					<strong>AI Visibility Report</strong> is your instant audit
					tool for assessing how visible your website is to AI search
					engines like ChatGPT, Gemini, and Claude. We analyze your
					site’s structured data, JSON-LD, and crawler accessibility
					to help you optimize for the next generation of search.
				</p>
				<ul className='text-left text-base mb-6 list-disc list-inside'>
					<li>Comprehensive AI readiness scoring</li>
					<li>Structured data and JSON-LD detection</li>
					<li>Actionable recommendations for improvement</li>
					<li>PDF export and shareable reports</li>
				</ul>
				<p className='text-base text-muted-foreground'>
					Built with Next.js, React, and the latest AI web
					technologies. <br />
					&copy; {new Date().getFullYear()} AI Visibility Report. All
					rights reserved.
				</p>
			</div>
		</div>
	);
}

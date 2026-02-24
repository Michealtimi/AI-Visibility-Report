// Global error boundary for production SEO and user experience
'use client';

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-900 p-8'>
			<h1 className='text-3xl font-bold mb-4'>Something went wrong</h1>
			<p className='mb-6'>
				{error.message || 'An unexpected error occurred.'}
			</p>
			<button
				onClick={() => reset()}
				className='px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
			>
				Try Again
			</button>
		</div>
	);
}

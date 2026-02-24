// Global 404 page for SEO and user experience
export default function NotFound() {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-8'>
			<h1 className='text-4xl font-bold mb-4'>404 - Page Not Found</h1>
			<p className='mb-6'>
				Sorry, the page you are looking for does not exist.
			</p>
			<a
				href='/'
				className='px-6 py-2 bg-accent text-white rounded hover:bg-accent/90 transition-colors'
			>
				Go Home
			</a>
		</div>
	);
}

import Link from 'next/link';

export default function Navbar() {
	return (
		<nav className='w-full flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50'>
			<div className='flex items-center gap-2'>
				<Link href='/'>
					<img
						src='/ai-visibility-logo.png'
						alt='AI Visibility Report Logo'
						className='h-20 w-auto'
					/>
				</Link>
			</div>
			<div className='flex gap-6'>
				<Link
					href='/'
					className='text-black font-medium hover:underline'
				>
					Home
				</Link>
				<Link
					href='/about'
					className='text-black font-medium hover:underline'
				>
					About
				</Link>
			</div>
		</nav>
	);
}

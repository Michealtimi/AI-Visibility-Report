'use client';
// Simple AdSense slot component
// Replace the ins data-ad-slot with your actual AdSense slot ID
import { useEffect, useRef, useState } from 'react';

export default function AdsenseSlot({
	className = '',
}: {
	className?: string;
}) {
	const [adLoaded, setAdLoaded] = useState(false);
	const insRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function tryPushAd() {
			if (!insRef.current) return;
			const width = insRef.current.offsetWidth;
			if (width && width > 0) {
				try {
					// @ts-ignore
					(window.adsbygoogle = window.adsbygoogle || []).push({});
					setAdLoaded(true);
				} catch (e) {
					setAdLoaded(false);
				}
			}
		}

		// Try immediately, then on resize (in case slot is hidden at first)
		tryPushAd();
		window.addEventListener('resize', tryPushAd);
		return () => {
			window.removeEventListener('resize', tryPushAd);
		};
	}, []);

	return (
		<div
			className={className}
			style={{
				minHeight: 120,
				width: '100%',
				position: 'relative',
				background: '#f8f9fa',
				border: '1px dashed #e0e0e0',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
			ref={insRef}
		>
			<ins
				className='adsbygoogle'
				style={{ display: 'block', width: '100%', height: 120 }}
				data-ad-client='ca-pub-3191981833978007'
				data-ad-slot='1234567890' // TODO: Replace with your AdSense slot ID
				data-ad-format='auto'
				data-full-width-responsive='true'
			></ins>
			{/* Fallback placeholder if ad not loaded */}
			{!adLoaded && (
				<span
					style={{
						position: 'absolute',
						color: '#bbb',
						fontSize: 14,
					}}
				>
					Ad space (pending approval)
				</span>
			)}
		</div>
	);
}

// Simple AdSense slot component
// Replace the ins data-ad-slot with your actual AdSense slot ID
export default function AdsenseSlot({
	className = '',
}: {
	className?: string;
}) {
	return (
		<div
			className={className}
			style={{ minHeight: 90 }}
		>
			<ins
				className='adsbygoogle'
				style={{ display: 'block', width: '100%', height: 90 }}
				data-ad-client='ca-pub-xxxxxxxxxxxxxxxx' // TODO: Replace with your AdSense client ID
				data-ad-slot='1234567890' // TODO: Replace with your AdSense slot ID
				data-ad-format='auto'
				data-full-width-responsive='true'
			></ins>
		</div>
	);
}

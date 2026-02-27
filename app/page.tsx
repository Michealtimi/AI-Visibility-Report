import { HeroScanner } from '@/components/hero-scanner';
import { OrganizationSchema, ProductSchema } from '@/components/json-ld';
import AboutAIVisibility from '../components/AboutAIVisibility';

export default function Home() {
	return (
		<>
			<OrganizationSchema />
			<ProductSchema />
			<HeroScanner />
			<AboutAIVisibility />
		</>
	);
}

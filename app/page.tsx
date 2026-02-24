import { HeroScanner } from '@/components/hero-scanner';
import { OrganizationSchema, ProductSchema } from '@/components/json-ld';

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <ProductSchema />
      <HeroScanner />
    </>
  );
}

import { createFileRoute } from '@tanstack/react-router'
import HeroSection from '#/components/hero/HeroSection'
import TrustBar from '#/components/sections/TrustBar'
import ShopByCategory from '#/components/sections/ShopByCategory'
import FeaturedProducts from '#/components/sections/FeaturedProducts'
import OfferBanner from '#/components/sections/OfferBanner'
import BestSellers from '#/components/sections/BestSellers'
import WhyArdorBiomed from '#/components/sections/WhyArdorBiomed'
import Testimonials from '#/components/sections/Testimonials'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <ShopByCategory />
      <FeaturedProducts />
      <OfferBanner />
      <BestSellers />
      <WhyArdorBiomed />
      <Testimonials />
    </main>
  )
}

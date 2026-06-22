import HeroSection from '../../components/HeroSection/HeroSection'
import BenefitsSection from '../../components/BenefitsSection/BenefitsSection'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import NBAZone from '../../components/NBAZone/NBAZone'
import AboutSection from '../../components/AboutSection/AboutSection'
import ReviewsSection from '../../components/ReviewsSection/ReviewsSection'
import CTASection from '../../components/CTASection/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <FeaturedProducts />
      <NBAZone />
      <AboutSection />
      <ReviewsSection />
      <CTASection />
    </>
  )
}

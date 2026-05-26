import Navbar from '@/components/sections/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import InventoryStrip from '@/components/sections/InventoryStrip'
import SpecsBar from '@/components/sections/SpecsBar'
import FeaturedSpotlight from '@/components/sections/FeaturedSpotlight'
import CategoryGrid from '@/components/sections/CategoryGrid'
import Testimonials from '@/components/sections/Testimonials'
import Footer from '@/components/sections/Footer'

/* Section IDs here let the Navbar, Hero CTA, and any anchor link target
   specific sections via smooth scroll (scroll-behavior: smooth in globals.css). */
export default function Page() {
  return (
    <main style={{ background: 'var(--color-bg-primary)', maxWidth: '1440px', margin: '0 auto' }}>
      <Navbar />

      <div id="hero">
        <HeroSection />
      </div>

      <div id="inventory">
        <InventoryStrip />
      </div>

      <div id="specs">
        <SpecsBar />
      </div>

      <div id="spotlight">
        <FeaturedSpotlight />
      </div>

      <div id="categories">
        <CategoryGrid />
      </div>

      <div id="testimonials">
        <Testimonials />
      </div>

      <div id="footer">
        <Footer />
      </div>
    </main>
  )
}

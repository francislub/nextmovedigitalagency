import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ServicesGrid } from '@/components/ServicesGrid'
import { PortfolioSection } from '@/components/PortfolioSection'
import { StatsSection } from '@/components/StatsSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden font-mono">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <ServicesGrid />

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Stats Section */}
      <StatsSection />

       {/* Footer */}
      <Footer />

    </main>
  )
}

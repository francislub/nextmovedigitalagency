import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ServicesGrid } from '@/components/ServicesGrid'
import { PortfolioSection } from '@/components/PortfolioSection'
import { StatsSection } from '@/components/StatsSection'
import { TeamSection } from '@/components/TeamSection'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
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

      {/* Team Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <TestimonialCarousel />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Footer */}
      <Footer />
    </main>
  )
}

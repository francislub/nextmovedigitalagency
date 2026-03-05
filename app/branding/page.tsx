'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Award, PenTool, Layers } from 'lucide-react'
import { useState } from 'react'

export default function BrandingPage() {
  const services = [
    'Logo design',
    'Brand identity packages',
    'Business profiles',
    'Marketing materials',
    'Social media graphics',
  ]

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', contactForm)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background text-foreground font-mono">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 uppercase tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Branding & Graphic Design
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed mb-8">
            Helping your business stand out with memorable, professional branding and visual identity.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Branding Services
            </h2>
            <p className="text-lg text-foreground/60">
              We create cohesive brand visuals that resonate with your audience across all channels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-xl font-bold mb-2 text-primary">{service}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {`Creative service for ${service.toLowerCase()} to strengthen your brand identity.`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Branding Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Why Invest in Branding
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <PenTool size={24} className="text-primary mb-2" />
              <h3 className="text-xl font-bold mb-2 text-primary">Memorable Identity</h3>
              <p className="text-foreground/70 text-sm">
                Unique logos and designs help your business stick in the minds of customers.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <Layers size={24} className="text-primary mb-2" />
              <h3 className="text-xl font-bold mb-2 text-primary">Consistency Across Channels</h3>
              <p className="text-foreground/70 text-sm">
                Cohesive branding ensures your visuals are professional across websites, social media, and print.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <Award size={24} className="text-primary mb-2" />
              <h3 className="text-xl font-bold mb-2 text-primary">Build Trust</h3>
              <p className="text-foreground/70 text-sm">
                A strong visual identity increases credibility and strengthens your audience’s trust.
              </p>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </main>
  )
}
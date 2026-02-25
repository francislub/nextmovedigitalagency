'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Camera, Video, Mic, TrendingUp, Target, Mail } from 'lucide-react'
import { useState } from 'react'

export default function GrowthPage() {
  const contentServices = [
    { title: 'Photography', icon: Camera },
    { title: 'Videography', icon: Video },
    { title: 'Product Shoots', icon: Camera },
    { title: 'Promotional Videos', icon: Video },
    { title: 'Short-form Content', icon: Video },
    { title: 'Voice-over Production', icon: Mic },
  ]

  const growthServices = [
    { title: 'Digital Campaign Setup', icon: Target },
    { title: 'Paid Ads Management', icon: TrendingUp },
    { title: 'Funnel Setup', icon: Target },
    { title: 'Newsletter / Email Marketing', icon: Mail },
    { title: 'Conversion Optimization', icon: TrendingUp },
    { title: 'Monthly Growth Reporting', icon: TrendingUp },
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
    <main className="min-h-screen bg-background text-foreground font-mono">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 uppercase tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Content & Growth Services
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed mb-8">
            From captivating content creation to strategic growth planning, we provide the tools and expertise to scale your business.
          </p>
        </div>
      </section>

      {/* Content Production Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Content Production
          </h2>
          <p className="text-lg text-foreground/70">
            Professional content that engages your audience and tells your brand story.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {contentServices.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={i}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-primary to-secondary rounded-lg">
                  <Icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">{service.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  High-quality {service.title.toLowerCase()} to showcase your brand professionally.
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Lead Generation & Growth Strategy Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Lead Generation & Growth Strategy
          </h2>
          <p className="text-lg text-foreground/70">
            Data-driven strategies designed to acquire leads, optimize conversions, and scale your business growth.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {growthServices.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={i}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-primary to-secondary rounded-lg">
                  <Icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">{service.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Expertly executed {service.title.toLowerCase()} to maximize your marketing ROI.
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <Footer />
    </main>
  )
}
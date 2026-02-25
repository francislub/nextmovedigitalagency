'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Instagram, Facebook, Linkedin, Youtube, TikTok, Calendar, MessageSquare } from 'lucide-react'
import { useState } from 'react'

export default function SocialMediaPage() {
  const services = [
    'Account setup & optimization',
    'Content strategy',
    'Monthly content planning',
    'Post creation & scheduling',
    'Community management',
    'Performance analytics reporting',
  ]

  const platforms = ['TikTok', 'Instagram', 'LinkedIn', 'Facebook', 'YouTube']

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', contactForm)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary/5 to-background text-foreground font-mono">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-secondary/5 to-primary/5">
        <div className="max-w-4xl mx-auto animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 uppercase tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Social Media Management
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed mb-8">
            Grow your online presence, engage your audience, and drive measurable results across multiple platforms.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Social Media Services
            </h2>
            <p className="text-lg text-foreground/60">
              Full-service social media management to keep your brand active and engaging across all major platforms.
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
                  {`Professional ${service.toLowerCase()} to increase your social media performance.`}
                </p>
              </div>
            ))}
          </div>

          {/* Platforms Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6 tracking-wide text-primary">Platforms We Manage</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <Instagram size={32} className="text-pink-500" />
              <Facebook size={32} className="text-blue-600" />
              <Linkedin size={32} className="text-blue-500" />
              <Youtube size={32} className="text-red-600" />
              <TikTok size={32} className="text-black" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
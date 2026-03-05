'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'
import { useState } from 'react'

export default function WebPage() {
  const services = [
    'Business websites (5–10 pages)',
    'Landing pages',
    'E-commerce development',
    'Website optimization',
    'Website maintenance & support',
    'Hosting & domain guidance',
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
            Web Design & Development
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed mb-8">
            Creating visually stunning, highly functional, and conversion-focused websites for businesses of all sizes.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Web Design Services
            </h2>
            <p className="text-lg text-foreground/60">
              We craft websites that not only look amazing but also perform seamlessly across all devices.
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
                  {`Professional service to handle ${service.toLowerCase()} efficiently and reliably.`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Website Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Why Choose Our Web Design
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-2 text-primary">Responsive Design</h3>
              <p className="text-foreground/70 text-sm">
                Your website will look perfect on desktop, tablet, and mobile devices.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-2 text-primary">Optimized Performance</h3>
              <p className="text-foreground/70 text-sm">
                Fast-loading websites that improve user experience and SEO rankings.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-2 text-primary">Scalable Solutions</h3>
              <p className="text-foreground/70 text-sm">
                Websites designed to grow with your business, from landing pages to e-commerce platforms.
              </p>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </main>
  )
}
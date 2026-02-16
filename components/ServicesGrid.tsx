'use client'

import { useState, useEffect, useRef } from 'react'
import { Palette, Globe, FileText, Share2, TrendingUp, Users } from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'Web Design',
    description: 'Beautiful, responsive websites that convert visitors into customers.',
    icon: Globe,
    gradient: 'from-primary to-purple-600',
    features: ['Responsive Design', 'Modern UI/UX', 'Fast Loading'],
  },
  {
    id: 2,
    title: 'Brand Building',
    description: 'Create a strong brand identity that resonates with your audience.',
    icon: Palette,
    gradient: 'from-secondary to-cyan-600',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity'],
  },
  {
    id: 3,
    title: 'Content Creation',
    description: 'Engaging content that tells your story and drives engagement.',
    icon: FileText,
    gradient: 'from-accent to-yellow-600',
    features: ['Copywriting', 'Video Content', 'Blog Posts'],
  },
  {
    id: 4,
    title: 'Social Media Management',
    description: 'Strategic social media presence that builds community and drives growth.',
    icon: Share2,
    gradient: 'from-primary via-secondary to-accent',
    features: ['Content Strategy', 'Community Management', 'Analytics'],
  },
  {
    id: 5,
    title: 'SEO Optimization',
    description: 'Get found by your customers with our proven SEO strategies.',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-primary',
    features: ['Keyword Research', 'On-page SEO', 'Link Building'],
  },
  {
    id: 6,
    title: 'Consultation',
    description: 'Expert guidance to accelerate your digital transformation journey.',
    icon: Users,
    gradient: 'from-cyan-500 to-secondary',
    features: ['Strategy Session', 'Market Analysis', 'Roadmap Planning'],
  },
]

export function ServicesGrid() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(
              entry.target.getAttribute('data-index') || '0'
            )
            setVisibleCards((prev) => [...prev, cardIndex])
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = ref.current?.querySelectorAll('[data-index]')
    cards?.forEach((card) => observer.observe(card))

    return () => cards?.forEach((card) => observer.unobserve(card))
  }, [])

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-secondary/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Comprehensive digital solutions designed to help your business grow
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={service.id}
                data-index={index}
                className={`group relative h-full transition-all duration-500 transform ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                {/* Card Background Gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to bottom right, var(--primary), var(--secondary))`
                  }}
                />

                {/* Card Border Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

                {/* Card Content */}
                <div className="relative h-full p-8 rounded-2xl border border-border/50 group-hover:border-primary/30 bg-card/50 backdrop-blur-sm transition-all duration-300">
                  {/* Icon */}
                  <div 
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br p-3 mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--secondary)))`
                    }}
                  >
                    <Icon size={28} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/60 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-foreground/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300">
                    Learn More
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

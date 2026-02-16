'use client'

import { useState, useEffect, useRef } from 'react'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

const portfolioItems = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Design',
    description: 'Complete brand redesign with 300% increase in online sales',
    metrics: '↑ 300% Sales Growth',
    gradient: 'from-blue-600 to-purple-600',
  },
  {
    id: 2,
    title: 'Local Restaurant Brand',
    category: 'Branding',
    description: 'Full brand identity and social media strategy',
    metrics: '↑ 250% Engagement',
    gradient: 'from-orange-600 to-red-600',
  },
  {
    id: 3,
    title: 'SaaS Product Launch',
    category: 'Web Design',
    description: 'Marketing website that converted 45% of visitors',
    metrics: '45% Conversion Rate',
    gradient: 'from-green-600 to-emerald-600',
  },
  {
    id: 4,
    title: 'Healthcare Clinic',
    category: 'Content & SEO',
    description: 'Organic traffic increased by 500% in 6 months',
    metrics: '↑ 500% Organic Traffic',
    gradient: 'from-pink-600 to-rose-600',
  },
  {
    id: 5,
    title: 'Fitness Center Social Media',
    category: 'Social Media',
    description: 'Built engaged community of 50K followers',
    metrics: '50K Followers',
    gradient: 'from-indigo-600 to-blue-600',
  },
  {
    id: 6,
    title: 'B2B Software Company',
    category: 'Branding',
    description: 'Rebranding that repositioned them as industry leader',
    metrics: '↑ 180% Lead Growth',
    gradient: 'from-cyan-600 to-teal-600',
  },
]

export function PortfolioSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
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
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 via-background to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Success Stories</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Real results from real clients. See how we've transformed businesses
          </p>
        </div>

        {/* Portfolio Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioItems.map((item, index) => {
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={item.id}
                data-index={index}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 transform ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-300 ${
                    hoveredId === item.id ? 'scale-110' : 'scale-100'
                  }`}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                {/* Content */}
                <div className="relative h-80 p-8 flex flex-col justify-between">
                  {/* Category Badge */}
                  <div className="flex justify-between items-start">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                      {item.category}
                    </span>
                    <ExternalLink
                      size={20}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110"
                    />
                  </div>

                  {/* Bottom Content */}
                  <div>
                    {/* Metrics */}
                    <div className="mb-4 h-8 overflow-hidden">
                      <div
                        className={`text-white text-sm font-bold transition-transform duration-300 ${
                          hoveredId === item.id ? 'translate-y-0' : 'translate-y-full'
                        }`}
                      >
                        {item.metrics}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2">
                      {item.description}
                    </p>

                    {/* CTA Arrow */}
                    <div
                      className={`mt-4 inline-block p-2 rounded-full bg-white/20 transition-all duration-300 transform ${
                        hoveredId === item.id
                          ? 'scale-110 bg-white/40'
                          : 'scale-100'
                      }`}
                    >
                      <ArrowUpRight size={18} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 group">
            View All Projects
            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

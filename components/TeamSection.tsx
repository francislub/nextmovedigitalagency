'use client'

import { useState, useEffect, useRef } from 'react'
import { Linkedin, Twitter, Mail } from 'lucide-react'

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Creative Director',
    bio: 'Design visionary with 10+ years of experience',
    gradient: 'from-blue-500 to-purple-500',
    initials: 'SJ',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Lead Developer',
    bio: 'Full-stack expert building scalable solutions',
    gradient: 'from-green-500 to-teal-500',
    initials: 'MC',
  },
  {
    id: 3,
    name: 'Emma Davis',
    role: 'Growth Strategist',
    bio: 'Data-driven marketer scaling businesses',
    gradient: 'from-pink-500 to-orange-500',
    initials: 'ED',
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Content Lead',
    bio: 'Storyteller turning insights into action',
    gradient: 'from-indigo-500 to-blue-500',
    initials: 'JW',
  },
]

export function TeamSection() {
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
            setVisibleCards((prev) => [...new Set([...prev, cardIndex])])
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
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Talented professionals dedicated to your success
          </p>
        </div>

        {/* Team Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {teamMembers.map((member, index) => {
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={member.id}
                data-index={index}
                className={`group relative transition-all duration-500 transform ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Card Container */}
                <div className="relative h-full rounded-2xl border border-border/50 group-hover:border-primary/30 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 overflow-hidden">
                  {/* Background Gradient */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"
                    style={{
                      background: `linear-gradient(to bottom right, hsl(var(--primary) / 0.5), hsl(var(--secondary) / 0.5))`
                    }}
                  />

                  {/* Content */}
                  <div className="relative">
                    {/* Avatar */}
                    <div 
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white text-2xl font-bold mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--secondary)))`
                      }}
                    >
                      {member.initials}
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>

                    {/* Role */}
                    <p className="text-sm font-semibold text-primary mb-2">
                      {member.role}
                    </p>

                    {/* Bio */}
                    <p className="text-sm text-foreground/60 mb-6 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-3">
                      <button
                        className="p-2 rounded-lg bg-border/50 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                        title="LinkedIn"
                      >
                        <Linkedin size={18} />
                      </button>
                      <button
                        className="p-2 rounded-lg bg-border/50 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                        title="Twitter"
                      >
                        <Twitter size={18} />
                      </button>
                      <button
                        className="p-2 rounded-lg bg-border/50 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                        title="Email"
                      >
                        <Mail size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

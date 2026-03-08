'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Linkedin, Twitter, Mail, Github, Instagram, Globe } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  image?: string
  description?: string
  activeEmail?: string
  activePhone?: string
  mainRole: string
  active: boolean
  githubLink?: string
  twitterLink?: string
  linkedinLink?: string
  instagramLink?: string
  websiteLink?: string
  roles?: { name: string; description?: string }[]
}

export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  // Fetch data from API
  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch('/api/team')
        const data = await res.json()
        setTeamMembers(data)
      } catch (err) {
        console.error('Failed to fetch team members', err)
      }
    }
    fetchTeam()
  }, [])

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCards((prev) => [...new Set([...prev, cardIndex])])
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = ref.current?.querySelectorAll('[data-index]')
    cards?.forEach((card) => observer.observe(card))
    return () => cards?.forEach((card) => observer.unobserve(card))
  }, [teamMembers])

  return (
    <section
      id="team"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-primary/5 font-mono tracking-wider"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase">
            Meet Our{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto tracking-wide">
            Talented professionals dedicated to your success
          </p>
        </div>

        {/* Team Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => {
            const isVisible = visibleCards.includes(index)
            return (
              <div
                key={member.id}
                data-index={index}
                className={`group relative cursor-pointer transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative h-full rounded-2xl border border-border/50 group-hover:border-primary/30 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 overflow-hidden">
                  {/* Avatar */}
                  {member.image ? (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4">
                      <Image src={member.image} alt={member.name} width={80} height={80} className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-extrabold mb-4">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}

                  {/* Name */}
                  <h3 className="text-xl font-bold mb-1 uppercase group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="text-sm font-semibold text-primary mb-2 tracking-wide">{member.mainRole}</p>

                  {/* Short Bio */}
                  <p className="text-sm text-foreground/60 mb-6 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    {member.linkedinLink && (
                      <a href={member.linkedinLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-border/50 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 transform hover:scale-110">
                        <Linkedin size={18} />
                      </a>
                    )}
                    {member.twitterLink && (
                      <a href={member.twitterLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-border/50 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 transform hover:scale-110">
                        <Twitter size={18} />
                      </a>
                    )}
                    {member.githubLink && (
                      <a href={member.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-border/50 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 transform hover:scale-110">
                        <Github size={18} />
                      </a>
                    )}
                    {member.instagramLink && (
                      <a href={member.instagramLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-border/50 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 transform hover:scale-110">
                        <Instagram size={18} />
                      </a>
                    )}
                    {member.websiteLink && (
                      <a href={member.websiteLink} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-border/50 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 transform hover:scale-110">
                        <Globe size={18} />
                      </a>
                    )}
                    {member.activeEmail && (
                      <a href={`mailto:${member.activeEmail}`} className="p-2 rounded-lg bg-border/50 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 transform hover:scale-110">
                        <Mail size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-card rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-foreground hover:text-destructive"
              onClick={() => setSelectedMember(null)}
            >
              X
            </button>
            <div className="text-center">
              {selectedMember.image ? (
                <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto mb-4">
                  <Image src={selectedMember.image} alt={selectedMember.name} width={128} height={128} className="object-cover" />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-5xl font-extrabold mb-4">
                  {selectedMember.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2">{selectedMember.name}</h2>
              <p className="text-lg font-semibold text-primary mb-4">{selectedMember.mainRole}</p>
              <p className="text-sm text-foreground/70 mb-4">{selectedMember.description}</p>
              <div className="space-y-2 text-left">
                {selectedMember.activeEmail && <p>Email: {selectedMember.activeEmail}</p>}
                {selectedMember.activePhone && <p>Phone: {selectedMember.activePhone}</p>}
                {selectedMember.roles && <p>Roles: {selectedMember.roles.map(r => r.name).join(', ')}</p>}
              </div>
              <div className="flex justify-center gap-3 mt-6">
                {selectedMember.linkedinLink && <a href={selectedMember.linkedinLink} target="_blank" rel="noopener noreferrer"><Linkedin size={22} /></a>}
                {selectedMember.twitterLink && <a href={selectedMember.twitterLink} target="_blank" rel="noopener noreferrer"><Twitter size={22} /></a>}
                {selectedMember.githubLink && <a href={selectedMember.githubLink} target="_blank" rel="noopener noreferrer"><Github size={22} /></a>}
                {selectedMember.instagramLink && <a href={selectedMember.instagramLink} target="_blank" rel="noopener noreferrer"><Instagram size={22} /></a>}
                {selectedMember.websiteLink && <a href={selectedMember.websiteLink} target="_blank" rel="noopener noreferrer"><Globe size={22} /></a>}
                {selectedMember.activeEmail && <a href={`mailto:${selectedMember.activeEmail}`}><Mail size={22} /></a>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
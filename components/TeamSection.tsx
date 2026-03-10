'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Linkedin, Twitter, Mail, Github, Instagram, Globe, Eye } from 'lucide-react'

interface Role {
  name: string
  description?: string
}

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
  roles?: Role[]
}

export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  // Fetch team
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

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCards((prev) => [...new Set([...prev, index])])
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

        {/* Header */}
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

        {/* Team grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {teamMembers.map((member, index) => {
            const isVisible = visibleCards.includes(index)

            const roleDisplay =
              member.roles && member.roles.length > 0
                ? member.roles.map((r) => r.name).join(', ')
                : 'Team Member'

            return (
              <div
                key={member.id}
                data-index={index}
                className={`transition-all duration-500 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >

                <div className="relative h-full rounded-2xl border border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm p-6 transition-all duration-300">

                  {/* Avatar */}
                  {member.image ? (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-extrabold mb-4 mx-auto">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  )}

                  {/* Name */}
                  <h3 className="text-xl font-bold text-center mb-1 uppercase">
                    {member.name}
                  </h3>

                  {/* Roles instead of mainRole */}
                  <p className="text-sm font-semibold text-primary text-center mb-2">
                    {roleDisplay}
                  </p>

                  {/* Description (2 lines only) */}
                  <p className="text-sm text-foreground/60 mb-3 leading-relaxed line-clamp-2">
                    {member.description}
                  </p>

                  {/* View Button */}
                  <div className="flex justify-center mb-4">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="flex items-center gap-2 text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </div>

                  {/* Socials */}
                  <div className="flex justify-center gap-3">
                    {member.linkedinLink && (
                      <a href={member.linkedinLink} target="_blank">
                        <Linkedin size={18} />
                      </a>
                    )}

                    {member.twitterLink && (
                      <a href={member.twitterLink} target="_blank">
                        <Twitter size={18} />
                      </a>
                    )}

                    {member.githubLink && (
                      <a href={member.githubLink} target="_blank">
                        <Github size={18} />
                      </a>
                    )}

                    {member.instagramLink && (
                      <a href={member.instagramLink} target="_blank">
                        <Instagram size={18} />
                      </a>
                    )}

                    {member.websiteLink && (
                      <a href={member.websiteLink} target="_blank">
                        <Globe size={18} />
                      </a>
                    )}

                    {member.activeEmail && (
                      <a href={`mailto:${member.activeEmail}`}>
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

            {/* Close */}
            <button
              className="absolute top-4 right-4 text-xl"
              onClick={() => setSelectedMember(null)}
            >
              ✕
            </button>

            {/* Avatar */}
            {selectedMember.image ? (
              <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto mb-4">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-5xl font-extrabold mb-4 mx-auto">
                {selectedMember.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            )}

            <h2 className="text-2xl font-bold text-center mb-2">
              {selectedMember.name}
            </h2>

            {/* Roles */}
            {selectedMember.roles && (
              <p className="text-lg text-primary text-center mb-4">
                {selectedMember.roles.map((r) => r.name).join(', ')}
              </p>
            )}

            {/* FULL DESCRIPTION */}
            <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
              {selectedMember.description}
            </p>

            <div className="space-y-2 text-sm">
              {selectedMember.activeEmail && (
                <p><strong>Email:</strong> {selectedMember.activeEmail}</p>
              )}

              {selectedMember.activePhone && (
                <p><strong>Phone:</strong> {selectedMember.activePhone}</p>
              )}

              {selectedMember.roles && (
                <p>
                  <strong>Roles:</strong>{" "}
                  {selectedMember.roles.map((r) => r.name).join(", ")}
                </p>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  )
}
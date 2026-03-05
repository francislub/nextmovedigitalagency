'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Search, Target, Zap, TrendingUp, Users } from 'lucide-react'

export default function ProcessPage() {
  const processSteps = [
    { step: 'Discovery', description: 'We understand the business, goals, and challenges.', icon: Search },
    { step: 'Strategy', description: 'We define the right digital next move.', icon: Target },
    { step: 'Execution', description: 'We build, design, produce, and deploy.', icon: Zap },
    { step: 'Optimization', description: 'We monitor, refine, and improve performance.', icon: TrendingUp },
    { step: 'Growth Partnership', description: 'We continue working together to scale results.', icon: Users },
  ]

  const reasons = [
    'Multi-skilled in-house team',
    'Local market understanding',
    'Strategy-driven execution',
    'Measurable performance tracking',
    'Long-term growth mindset',
    'Collaborative partnership approach',
  ]

  const businessModels = [
    'Project-based services (e.g., website builds)',
    'Monthly retainers (social media & growth management)',
    'Performance-based partnerships (where applicable)',
  ]

  const brandPersonality = [
    'God fearing',
    'Professional',
    'Reliable',
    'Growth-oriented',
    'Practical',
    'Clear in communication',
    'Focused on results',
  ]

  return (
    <main className="min-h-screen bg-background text-foreground font-mono">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 uppercase tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Process & Approach
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed mb-8">
            A step-by-step guide to how NextMove Digital Agency delivers measurable results for local businesses.
          </p>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Process
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Clear steps that transform your business digitally and sustainably.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-primary to-secondary rounded-lg">
                    <Icon size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary">{step.step}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose NextMove */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Why Choose NextMove Digital Agency?
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-3xl mx-auto">
            We don’t just offer services; we build integrated growth systems that deliver real results.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {reasons.map((reason, i) => (
              <div key={i} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <p className="text-lg font-semibold text-primary">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Business Model
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-3xl mx-auto">
            Flexible engagement models to suit your growth needs.
          </p>

          <ul className="space-y-4 max-w-xl mx-auto text-left">
            {businessModels.map((model, i) => (
              <li key={i} className="flex items-start gap-3">
                <TrendingUp size={20} className="text-primary mt-1" />
                <span className="text-foreground/70">{model}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Brand Personality */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Brand Personality
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-3xl mx-auto">
            NextMove Digital Agency is professional, reliable, and growth-oriented with a clear focus on results.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {brandPersonality.map((trait, i) => (
              <div key={i} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <p className="text-lg font-semibold text-primary">{trait}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
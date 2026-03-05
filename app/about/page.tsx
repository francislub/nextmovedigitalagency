'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CheckCircle2, Award, Zap, Target } from 'lucide-react'
import { TeamSection } from '@/components/TeamSection'

export default function AboutPage() {
  const coreValues = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We stay ahead of digital trends to keep your business competitive.',
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Every strategy is focused on measurable business growth.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We deliver high-quality work on every project, without compromise.',
    },
    {
      icon: CheckCircle2,
      title: 'Transparency',
      description: 'Clear communication and honest reporting every step of the way.',
    },
  ]

  const services = [
    'Web development',
    'Graphic design',
    'Content creation',
    'Social media strategy',
    'Photography & videography',
    'Voice-over & digital storytelling',
    'Lead generation & brand positioning',
    'Google business profiling',
  ]

  const targetClients = [
    'Local small and medium-sized enterprises (SMEs)',
    'Service-based businesses',
    'Retail brands',
    'Professional services (clinics, schools, consultants, etc.)',
    'Growing start-ups seeking digital structure',
  ]

  const philosophyPoints = [
    'Visibility without strategy is noise.',
    'Branding without systems is decoration.',
    'Social media without conversion is vanity.',
    'Growth must be measurable.',
  ]

  return (
    <main className="min-h-screen bg-background text-foreground font-mono tracking-wide">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-5xl mx-auto text-center animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 uppercase tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About <span className="bg-clip-text text-transparent">NextMove Digital Agency (NMD)</span>
          </h1>
          <p className="text-xl text-foreground/70 mb-6 leading-relaxed">
            “Move Forward, Grow Faster.” – Our slogan captures our mission to empower businesses with measurable digital growth.
          </p>
          <p className="text-lg text-foreground/60 leading-relaxed tracking-wide">
            We are a results-focused digital growth agency dedicated to helping local and emerging businesses make the right next move online. We don’t just design or market; we partner with you to create connected digital systems that attract, engage, and convert customers.
          </p>
        </div>
      </section>

      {/* Company Overview & Who We Are */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="animate-slideInLeft">
            <h2 className="text-4xl font-extrabold mb-6 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Company Overview
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-4">
              Company Name: <strong>NextMove Digital Agency (NMD)</strong>
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed mb-4">
              Slogan: <em>“Move Forward, Grow Faster.”</em>
            </p>
            <h3 className="text-2xl font-bold mb-3 tracking-wide uppercase text-primary">Who We Are</h3>
            <p className="text-foreground/70 leading-relaxed mb-4">
              NextMove Digital Agency is a results-focused digital growth agency dedicated to helping local and emerging businesses make the right next move online. We work with SMEs lacking a strong digital presence and help them transform their brand visibility into measurable growth.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Our team combines expertise in:
            </p>
            <ul className="list-disc list-inside text-foreground/60 mb-4">
              {services.map((service, i) => (
                <li key={i}>{service}</li>
              ))}
            </ul>
            <p className="text-foreground/70 leading-relaxed">
              Together, we create connected digital systems that help businesses attract, engage, and convert customers.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6 animate-slideInRight">
            {[
              { value: '150+', label: 'Projects Completed', color: 'text-primary' },
              { value: '98%', label: 'Client Satisfaction', color: 'text-secondary' },
              { value: '8+', label: 'Years Experience', color: 'text-primary' },
              { value: '40+', label: 'Team Members', color: 'text-secondary' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center hover:scale-105 transition-transform"
              >
                <p className={`text-4xl font-extrabold mb-2 ${item.color}`}>
                  {item.value}
                </p>
                <p className="text-foreground/70 tracking-wide">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="animate-slideInLeft">
            <h2 className="text-4xl font-extrabold mb-6 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-6">
              To empower local businesses with the digital tools, systems, and strategies they need to grow sustainably in the modern economy.
            </p>

            <h2 className="text-4xl font-extrabold mb-6 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Vision
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-6">
              To become a leading digital growth partner for businesses across Uganda, East Africa, and Africa, known for clarity, execution, and measurable impact.
            </p>
          </div>

          {/* Philosophy & Core Values */}
          <div className="animate-slideInRight space-y-6">
            <h2 className="text-4xl font-extrabold mb-4 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Core Philosophy
            </h2>
            <ul className="list-disc list-inside text-foreground/60 leading-relaxed space-y-2">
              {philosophyPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            <h2 className="text-4xl font-extrabold mt-8 mb-4 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Target Clients
            </h2>
            <ul className="list-disc list-inside text-foreground/60 leading-relaxed space-y-2">
              {targetClients.map((client, i) => (
                <li key={i}>{client}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-primary/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wider uppercase bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <p className="text-lg text-foreground/60 mb-12 tracking-wide">
            The principles that guide everything we do
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                    <Icon size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-wide group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      <Footer />
    </main>
  )
}
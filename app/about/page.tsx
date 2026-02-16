import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CheckCircle2, Award, Zap, Target } from 'lucide-react'
import { TeamSection } from '@/components/TeamSection'

export default function AboutPage() {
  const values = [
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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">NextMove</span>
          </h1>
          <p className="text-xl text-foreground/70 mb-8">
            We're a digital agency passionate about helping local businesses transform their online presence into real revenue.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slideInLeft">
            <h2 className="text-4xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Mission</span>
            </h2>
            <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
              At NextMove, we believe every local business deserves a strong digital presence. We're here to make that happen through practical, result-focused strategies that turn online visibility into real customers and revenue.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              We don't believe in hype or unrealistic promises. We focus on sustainable growth, transparent communication, and delivering measurable results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 animate-slideInRight">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-2">150+</p>
              <p className="text-foreground/70">Projects Completed</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-secondary mb-2">98%</p>
              <p className="text-foreground/70">Client Satisfaction</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-2">8+</p>
              <p className="text-foreground/70">Years Experience</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-secondary mb-2">40+</p>
              <p className="text-foreground/70">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Core Values</span>
            </h2>
            <p className="text-lg text-foreground/60">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-foreground/60">{value.description}</p>
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

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ExternalLink, TrendingUp } from 'lucide-react'

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Store Redesign',
      category: 'Web Design',
      description: 'Complete redesign and development of online store',
      image: '/projects/ecommerce.jpg',
      results: {
        increase: '145%',
        metric: 'Sales Increase',
      },
      tags: ['Web Design', 'Development', 'E-Commerce'],
    },
    {
      id: 2,
      title: 'Local Restaurant Branding',
      category: 'Brand Building',
      description: 'Full brand identity and digital presence',
      image: '/projects/restaurant.jpg',
      results: {
        increase: '200%',
        metric: 'Customer Engagement',
      },
      tags: ['Branding', 'Logo Design', 'Marketing'],
    },
    {
      id: 3,
      title: 'Tech Startup Marketing',
      category: 'Content & Marketing',
      description: 'Content strategy and social media growth',
      image: '/projects/startup.jpg',
      results: {
        increase: '320%',
        metric: 'Social Following',
      },
      tags: ['Content', 'Social Media', 'Strategy'],
    },
    {
      id: 4,
      title: 'Real Estate Agency Website',
      category: 'Web Development',
      description: 'Custom website with property listings',
      image: '/projects/realestate.jpg',
      results: {
        increase: '85%',
        metric: 'Lead Generation',
      },
      tags: ['Development', 'Web Design', 'CMS'],
    },
    {
      id: 5,
      title: 'Fashion Brand Social Strategy',
      category: 'Social Media',
      description: 'Comprehensive social media management',
      image: '/projects/fashion.jpg',
      results: {
        increase: '250%',
        metric: 'Engagement Rate',
      },
      tags: ['Social Media', 'Content', 'Strategy'],
    },
    {
      id: 6,
      title: 'Service Business SEO Campaign',
      category: 'SEO',
      description: 'Local SEO optimization and growth',
      image: '/projects/seo.jpg',
      results: {
        increase: '175%',
        metric: 'Organic Traffic',
      },
      tags: ['SEO', 'Local Marketing', 'Analytics'],
    },
  ]

  const categories = ['All', 'Web Design', 'Development', 'Branding', 'Content', 'Social Media', 'SEO']

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Portfolio</span>
          </h1>
          <p className="text-xl text-foreground/70">
            Proven results across diverse industries and businesses
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                  category === 'All'
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                    : 'bg-card/50 border border-border/50 text-foreground hover:border-primary/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Placeholder */}
                <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <p className="text-foreground/50">{project.category}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Results */}
                  <div className="bg-primary/10 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={16} className="text-primary" />
                      <p className="text-sm font-semibold text-primary">{project.results.increase}</p>
                    </div>
                    <p className="text-sm text-foreground/70">{project.results.metric}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-border/50 text-foreground/70 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group/btn">
                    View Case Study
                    <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Palette, Globe, FileText, Share2, TrendingUp, Users, ArrowRight } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: 'Web Design & Development',
      icon: Globe,
      description: 'Beautiful, responsive websites that convert visitors into customers.',
      longDescription: 'We create stunning websites that are not only visually appealing but also optimized for conversions. From concept to deployment, we handle every aspect of web design and development.',
      features: [
        'Responsive Design',
        'Fast Loading Times',
        'SEO Optimized',
        'Mobile First Approach',
        'Modern UI/UX',
        'Performance Optimized',
      ],
      color: 'from-blue-500 to-purple-500',
    },
    {
      id: 2,
      title: 'Brand Building',
      icon: Palette,
      description: 'Create a strong brand identity that resonates with your audience.',
      longDescription: 'Your brand is your business identity. We help you create a cohesive, memorable brand that stands out in the market and connects with your target audience.',
      features: [
        'Logo Design',
        'Brand Guidelines',
        'Visual Identity',
        'Color Palette',
        'Typography System',
        'Brand Strategy',
      ],
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 3,
      title: 'Content Creation',
      icon: FileText,
      description: 'Engaging content that tells your story and drives engagement.',
      longDescription: 'Content is king. We create compelling, engaging content across all formats that resonates with your audience and drives meaningful engagement.',
      features: [
        'Copywriting',
        'Blog Posts',
        'Video Content',
        'Social Media Content',
        'Email Marketing',
        'Content Strategy',
      ],
      color: 'from-pink-500 to-orange-500',
    },
    {
      id: 4,
      title: 'Social Media Management',
      icon: Share2,
      description: 'Strategic social media presence that builds community and drives growth.',
      longDescription: 'We manage your social media presence to build community, increase engagement, and drive business growth through strategic content and community management.',
      features: [
        'Content Strategy',
        'Community Management',
        'Analytics & Reporting',
        'Social Ads',
        'Influencer Partnerships',
        'Crisis Management',
      ],
      color: 'from-indigo-500 to-blue-500',
    },
    {
      id: 5,
      title: 'SEO Optimization',
      icon: TrendingUp,
      description: 'Get found by your customers with our proven SEO strategies.',
      longDescription: 'Increase your online visibility with our comprehensive SEO strategies. We help your business rank higher in search results and attract more qualified traffic.',
      features: [
        'Keyword Research',
        'On-page SEO',
        'Technical SEO',
        'Link Building',
        'SEO Audits',
        'Analytics Tracking',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 6,
      title: 'Digital Consultation',
      icon: Users,
      description: 'Expert guidance to accelerate your digital transformation journey.',
      longDescription: 'Get expert advice on your digital strategy. We analyze your current situation and create a roadmap for success.',
      features: [
        'Strategy Sessions',
        'Market Analysis',
        'Competitor Analysis',
        'Roadmap Planning',
        'Performance Audits',
        'Implementation Support',
      ],
      color: 'from-cyan-500 to-teal-500',
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/5" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-float" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-lg text-foreground/70">
              Comprehensive digital solutions tailored to help your business grow. From web design to content creation, we've got everything you need.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--secondary)))`
                    }}
                  >
                    <Icon size={28} className="text-primary-foreground" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    {service.longDescription}
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-primary mb-3">Key Features:</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-foreground/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group/btn">
                    Learn More
                    <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Calendar, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Web Design Trends in 2026',
      excerpt: 'Discover the latest web design trends that are shaping the digital landscape in 2026.',
      author: 'Sarah Johnson',
      date: 'Feb 16, 2026',
      category: 'Design',
      image: '🎨',
    },
    {
      id: 2,
      title: 'How to Build a Strong Brand Identity',
      excerpt: 'A comprehensive guide to creating a brand that resonates with your target audience.',
      author: 'Mike Chen',
      date: 'Feb 14, 2026',
      category: 'Branding',
      image: '🏢',
    },
    {
      id: 3,
      title: 'Content Marketing: The Ultimate Strategy Guide',
      excerpt: 'Learn proven strategies to create content that drives engagement and conversions.',
      author: 'Emma Davis',
      date: 'Feb 12, 2026',
      category: 'Marketing',
      image: '📝',
    },
    {
      id: 4,
      title: 'Social Media Growth in 2026: What Works Now',
      excerpt: 'Explore the most effective social media strategies for business growth this year.',
      author: 'James Wilson',
      date: 'Feb 10, 2026',
      category: 'Social Media',
      image: '📱',
    },
    {
      id: 5,
      title: 'SEO Best Practices for Local Businesses',
      excerpt: 'Dominate local search results and attract more customers in your area.',
      author: 'Lisa Anderson',
      date: 'Feb 8, 2026',
      category: 'SEO',
      image: '🔍',
    },
    {
      id: 6,
      title: 'The Future of Digital Marketing',
      excerpt: 'What lies ahead for digital marketers and how to stay ahead of the curve.',
      author: 'David Brown',
      date: 'Feb 6, 2026',
      category: 'Marketing',
      image: '🚀',
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Blog
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Insights, tips, and strategies to help your business grow in the digital world.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-6xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  {post.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
                    {post.category}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-foreground/50 mb-4 pb-4 border-b border-border/50">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <button className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300">
                    Read More
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-foreground/70 mb-8">
            Get the latest insights delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}

'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Animation */}
        <div className="mb-8 animate-fadeInDown">
          <div className="text-9xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </div>
        </div>

        {/* Message */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
          <p className="text-lg text-foreground/70 mb-8">
            Oops! The page you're looking for doesn't exist. Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Home size={20} />
              Back to Home
            </Link>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-16 pt-8 border-t border-border animate-slideInUp" style={{ animationDelay: '0.4s' }}>
          <p className="text-foreground/60 mb-6">Or explore these pages:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/#contact' },
              { label: 'Blog', href: '#' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg bg-card/50 border border-border/50 text-foreground hover:border-primary/30 hover:text-primary transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

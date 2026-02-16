'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Send } from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 2000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-background via-primary/5 to-primary/10 border-t border-border/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity mb-4 flex-shrink-0"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light%20logo.PNG-L4l5jPjuxEh0ftGgNvXNyRYaJtQiWi.png"
                alt="NextMove Digital Agency"
                className="hidden dark:hidden h-14 w-auto"
              />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dark%20logo.PNG-vRmoIBwttWTPF9VFfDkLauaHxbeqeZ.png"
                alt="NextMove Digital Agency"
                className="hidden dark:block h-14 w-auto"
              />
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed mb-6">
              Helping local businesses turn online visibility into real customers and revenue.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 rounded-lg bg-border/30 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                  title={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                { label: 'Web Design', href: '/services' },
                { label: 'Brand Building', href: '/services' },
                { label: 'Content Creation', href: '/services' },
                { label: 'Social Media', href: '/services' },
                { label: 'SEO Optimization', href: '/services' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Team', href: '#team' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Blog', href: '#' },
                { label: 'Careers', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={16} className="text-primary flex-shrink-0" />
                  <span className="text-foreground/80 font-medium text-sm">Location</span>
                </div>
                <p className="text-foreground/60 text-sm ml-6">
                  123 Digital Street, Tech City, TC 12345
                </p>
              </li>
              <li>
                <div className="flex items-center gap-2 mb-1">
                  <Phone size={16} className="text-primary flex-shrink-0" />
                  <a href="tel:+14436204620" className="text-primary hover:text-secondary transition-colors font-medium text-sm">
                    +1 (443) 620-4620
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 mb-1">
                  <Mail size={16} className="text-primary flex-shrink-0" />
                  <a href="mailto:hello@nextmove.digital" className="text-primary hover:text-secondary transition-colors text-sm">
                    hello@nextmove.digital
                  </a>
                </div>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium text-sm group"
                >
                  Contact Us
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Newsletter</h3>
            <p className="text-foreground/60 text-sm mb-4">
              Get exclusive insights and tips delivered to your inbox
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-background/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg hover:shadow-lg transition-all font-medium text-sm flex items-center justify-center gap-2"
              >
                Subscribe
                <Send size={16} />
              </button>
            </form>
            {isSubscribed && (
              <p className="text-xs text-primary mt-2">Thanks for subscribing!</p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-foreground/60 text-sm">
              © {currentYear} NextMove Digital Agency. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { label: 'Privacy Policy', href: '#' },
              { label: 'Terms of Service', href: '#' },
              { label: 'Cookie Policy', href: '#' },
              { label: 'Sitemap', href: '#' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-foreground/60 hover:text-primary transition-colors text-xs md:text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Tagline */}
          <div className="text-center md:text-right">
            <p className="text-foreground/70 text-sm font-medium">
              Your Next Move Into Digital 💲
            </p>
          </div>
        </div>
      </div>

      {/* Gradient Bottom */}
      <div className="h-px bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50" />
    </footer>
  )
}

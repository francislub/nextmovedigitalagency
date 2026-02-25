"use client"

import Link from "next/link"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Send,
} from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 2000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-background via-primary/5 to-primary/10 border-t border-border/50 font-mono">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand Column */}
          <div>
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity mb-4"
            >
              {/* LIGHT THEME LOGO */}
              <img
                src="https://n1wg6ajce9.ufs.sh/f/1ViPlEv28IBa8XMiDFNTdk2N39jnyHRpPov4guOVBFQEIelU"
                alt="NextMove Digital Agency"
                className="block dark:hidden h-14 w-auto"
              />

              {/* DARK THEME LOGO */}
              <img
                src="https://n1wg6ajce9.ufs.sh/f/1ViPlEv28IBaxvw8yhnzBis7fnDZjOIew9Qq02t4cPYyUJHT"
                alt="NextMove Digital Agency"
                className="hidden dark:block h-14 w-auto"
              />
            </Link>

            <p className="text-foreground/60 text-sm leading-relaxed mb-6 tracking-wide">
              Helping local businesses turn online visibility into real customers
              and revenue.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  className="p-2 rounded-lg bg-border/30 hover:bg-primary text-foreground hover:text-primary-foreground transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-primary/40"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-extrabold text-foreground mb-4 tracking-widest uppercase">
              Services
            </h3>
            <ul className="space-y-2">
              {[
                "Web Design",
                "Brand Building",
                "Content Creation",
                "Social Media",
                "SEO Optimization",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-foreground/60 hover:text-primary transition-colors text-sm tracking-wide"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-extrabold text-foreground mb-4 tracking-widest uppercase">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Team", href: "/team" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Blog", href: "/blog" },
                { label: "Careers", href: "/careers" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-foreground/60 hover:text-primary transition-colors text-sm tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-extrabold text-foreground mb-4 tracking-widest uppercase">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm tracking-wide">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5" />
                <span className="text-foreground/60">
                  Bugema University, Luweero
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <a
                  href="tel:+14436204620"
                  className="text-primary hover:text-secondary transition-colors"
                >
                  +256 743774266
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <a
                  href="mailto:hello@nextmove.digital"
                  className="text-primary hover:text-secondary transition-colors"
                >
                  info@nextmovedigitalagency.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-extrabold text-foreground mb-4 tracking-widest uppercase">
              Newsletter
            </h3>
            <p className="text-foreground/60 text-sm mb-4 tracking-wide">
              Get exclusive insights and tips delivered to your inbox
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="px-4 py-2 rounded-lg bg-background/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary tracking-wide"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-2 tracking-wide hover:shadow-lg hover:shadow-primary/40 transition-all"
              >
                Subscribe <Send size={16} />
              </button>
            </form>
            {isSubscribed && (
              <p className="text-xs text-primary mt-2 tracking-wide">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/40 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/60 text-sm tracking-wide">
            © {currentYear} NextMove Digital Agency. All rights reserved.
          </p>

          <p className="text-foreground/70 text-sm font-semibold tracking-widest uppercase">
            Your Next Move Into Digital 💲
          </p>
        </div>
      </div>
    </footer>
  )
}
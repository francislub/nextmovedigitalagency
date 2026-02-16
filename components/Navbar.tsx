'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    {
      label: 'Services',
      href: '/services',
      submenu: [
        { label: 'Web Design', href: '/services#web-design' },
        { label: 'Brand Building', href: '/services#branding' },
        { label: 'Content Creation', href: '/services#content' },
        { label: 'Social Media', href: '/services#social' },
      ],
    },
    {
      label: 'Portfolio',
      href: '/portfolio',
      submenu: [
        { label: 'Case Studies', href: '/portfolio#cases' },
        { label: 'All Projects', href: '/portfolio#all' },
      ],
    },
    {
      label: 'Resources',
      href: '#',
      submenu: [
        { label: 'Blog', href: '/blog' },
        { label: 'Free Consultation', href: '#contact' },
        { label: 'Website Audit', href: '#' },
      ],
    },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            <span className="text-3xl">💲</span>
            <span>NextMove</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200 relative group px-4 py-2 flex items-center gap-1"
                >
                  {link.label}
                  {(link as any).submenu && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        openDropdown === link.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                </Link>

                {/* Dropdown Menu */}
                {(link as any).submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2">
                    {(link as any).submenu.map(
                      (item: any) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-foreground/80 hover:text-primary hover:bg-secondary/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="#contact"
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-secondary/10 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-slideInDown">
            <div className="flex flex-col gap-0 pt-4">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <button
                    onClick={() => {
                      if ((link as any).submenu) {
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label
                        )
                      } else {
                        setIsOpen(false)
                      }
                    }}
                    className="w-full text-left text-foreground/80 hover:text-primary font-medium transition-colors duration-200 py-2 px-4 hover:bg-secondary/10 flex items-center justify-between"
                  >
                    {link.label}
                    {(link as any).submenu && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          openDropdown === link.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Mobile Dropdown */}
                  {(link as any).submenu && openDropdown === link.label && (
                    <div className="bg-card/50">
                      {(link as any).submenu.map((item: any) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-6 py-2 text-foreground/70 hover:text-primary hover:bg-secondary/10 transition-colors duration-200 text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="#contact"
                className="px-4 py-2.5 mx-4 mt-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg text-center hover:shadow-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

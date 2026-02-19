"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    {
      label: "Services",
      href: "/services",
      submenu: [
        { label: "Web Design", href: "/web-design" },
        { label: "Brand Building", href: "/branding" },
        { label: "Content Creation", href: "/content" },
        { label: "Social Media", href: "/social" },
      ],
    },
    {
      label: "Portfolio",
      href: "/portfolio",
      submenu: [
        { label: "Case Studies", href: "/cases" },
        { label: "All Projects", href: "/all" },
      ],
    },
    {
      label: "Resources",
      href: "#",
      submenu: [
        { label: "Blog", href: "/blog" },
        { label: "Free Consultation", href: "/contact" },
        { label: "Website Audit", href: "/audit" },
      ],
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20light.PNG-fBveX1QZtkKBhmWFI1waYPY98DXVoz.png"
              alt="NextMove Digital"
              className="block dark:hidden h-12 w-auto"
            />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20dark.PNG-rrKJPZEYoUNF8KtUZEGTzZSk6DbjCj.png"
              alt="NextMove Digital"
              className="hidden dark:block h-12 w-auto"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="px-4 py-2 flex items-center gap-1 font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                  {link.submenu && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {link.submenu && (
                  <div className="absolute left-0 mt-1 w-52 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {link.submenu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm hover:text-primary hover:bg-secondary/10 transition"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition"
            >
               Get Started
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-lg hover:bg-secondary/10"
            >
              <Menu />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR (LEFT) */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-72 bg-background border-r border-border z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">⚡ Tech Menu</span>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>

            <div className="space-y-2">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <button
                    onClick={() =>
                      link.submenu
                        ? setOpenDropdown(
                            openDropdown === link.label ? null : link.label
                          )
                        : setIsOpen(false)
                    }
                    className="w-full flex justify-between items-center px-4 py-3 font-semibold hover:bg-secondary/10 rounded-lg"
                  >
                    {link.label}
                    {link.submenu && (
                      <ChevronDown
                        className={`transition-transform ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {link.submenu && openDropdown === link.label && (
                    <div className="ml-4 border-l border-primary/30 pl-2">
                      {link.submenu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 text-sm hover:text-primary"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block mt-4 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-center rounded-lg"
              >
                 Get Started 🚀
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
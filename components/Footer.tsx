"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Send, X } from "lucide-react"
import { useState } from "react"

export function Footer() {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage("Please enter your email")
      return
    }

    try {
      setLoading(true)
      setMessage(null)

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (data.success) {
        setEmail("")
        setShowModal(true)
      } else {
        setMessage(data.message || "Subscription failed")
      }

    } catch (error) {
      console.error("Subscribe error:", error)
      setMessage("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const year = new Date().getFullYear()

  return (
    <>
      <footer className="bg-gradient-to-b from-background via-primary/5 to-primary/10 border-t border-border/50 font-mono">

        <div className="max-w-7xl mx-auto px-4 py-16">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

            {/* BRAND */}
            <div>

              <Link href="/" className="flex items-center mb-3">

                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-iXsseJTvyXimXjpRcnVLUKTT4S6pv2.png"
                  alt="NextMove"
                  className="block dark:hidden max-w-[80px] sm:max-w-[100px] md:max-w-[150px] lg:max-w-[200px] h-auto object-contain"
                />

                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-iXsseJTvyXimXjpRcnVLUKTT4S6pv2.png"
                  alt="NextMove"
                  className="hidden dark:block max-w-[80px] sm:max-w-[100px] md:max-w-[150px] lg:max-w-[200px] h-auto object-contain"
                />

              </Link>

              <p className="text-foreground/60 text-sm mb-6">
                Helping businesses turn online visibility into real customers.
              </p>

              <div className="flex gap-3">

                {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (

                  <a
                    key={i}
                    href="#"
                    className="p-2 rounded-lg bg-border/30 hover:bg-primary hover:text-white transition"
                  >
                    <Icon size={18} />
                  </a>

                ))}

              </div>

            </div>

            {/* SERVICES */}
            <div>
              <h3 className="font-bold mb-4 uppercase">Services</h3>

              <ul className="space-y-2 text-sm">

                {[
                  "Web Design",
                  "Brand Building",
                  "Content Creation",
                  "Social Media",
                  "SEO Optimization",
                ].map((item) => (

                  <li key={item}>
                    <Link href="/services" className="text-foreground/60 hover:text-primary">
                      {item}
                    </Link>
                  </li>

                ))}

              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="font-bold mb-4 uppercase">Company</h3>

              <ul className="space-y-2 text-sm">

                {[
                  { label: "About", href: "/about" },
                  { label: "Team", href: "/team" },
                  { label: "Portfolio", href: "/portfolio" },
                  { label: "Blog", href: "/blog" },
                ].map((item) => (

                  <li key={item.label}>
                    <Link href={item.href} className="text-foreground/60 hover:text-primary">
                      {item.label}
                    </Link>
                  </li>

                ))}

              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="font-bold mb-4 uppercase">Contact</h3>

              <ul className="space-y-3 text-sm">

                <li className="flex gap-2">
                  <MapPin size={16} className="text-primary" />
                  Bugema University, Luweero
                </li>

                <li className="flex gap-2">
                  <Phone size={16} className="text-primary" />
                  +256 743774266
                </li>

                <li className="flex gap-2">
                  <Mail size={16} className="text-primary" />
                  info@nextmovedigitalagency.com
                </li>

              </ul>
            </div>

            {/* NEWSLETTER */}
            <div>

              <h3 className="font-bold mb-4 uppercase">Newsletter</h3>

              <p className="text-sm text-foreground/60 mb-4">
                Subscribe to receive updates and marketing insights.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="info@nextmovedigitalagency.com"
                  className="px-4 py-2 rounded-lg border border-border bg-background"
                />

                <button
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded-lg flex items-center justify-center gap-2"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                  <Send size={16} />
                </button>

              </form>

              {message && (
                <p className="text-sm text-red-500 mt-2">{message}</p>
              )}

            </div>

          </div>

          <div className="border-t border-border pt-6 text-center text-sm text-foreground/60">
            © {year} NextMove Digital Agency. All rights reserved.
          </div>

        </div>

      </footer>

      {/* SUCCESS MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-card p-8 rounded-2xl max-w-md text-center relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4"
            >
              <X size={18} />
            </button>

            <h2 className="text-2xl font-bold mb-3 text-primary">
              🎉 Subscription Successful!
            </h2>

            <p className="text-foreground/70">
              Thank you for subscribing to our newsletter.
              You will now receive marketing tips and business insights.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-lg"
            >
              Close
            </button>

          </div>

        </div>

      )}
    </>
  )
}
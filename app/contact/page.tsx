'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      })
      setSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (443) 620-4620',
      href: 'tel:+14436204620',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@nextmove.digital',
      href: 'mailto:hello@nextmove.digital',
    },
    // {
    //   icon: MapPin,
    //   label: 'Location',
    //   value: '123 Digital Street, Tech City, TC 12345',
    //   href: '#',
    // },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon - Fri: 9:00 AM - 6:00 PM EST',
      href: '#',
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/5" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto animate-fadeInUp">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Let's Work Together
            </h1>
            <p className="text-lg text-foreground/70">
              Ready to transform your business into a digital success story? Get in touch with our team and let's discuss your project.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div
                  key={info.label}
                  className="group bg-card/50 border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                  style={{ animation: `slideUp 0.6s ease-out forwards`, animationDelay: `${index * 100}ms` }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--secondary)))`
                    }}
                  >
                    <Icon size={24} className="text-primary-foreground" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {info.label}
                  </h3>

                  <a
                    href={info.href}
                    className="text-foreground/70 hover:text-primary transition-colors font-medium"
                  >
                    {info.value}
                  </a>
                </div>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="animate-slideInLeft">
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

              {submitted ? (
                <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 text-center animate-fadeInUp">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-primary-foreground" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-foreground/70">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-card/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-card/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="Your Company"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="web-design">Web Design</option>
                      <option value="branding">Branding</option>
                      <option value="content">Content Creation</option>
                      <option value="social">Social Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-card/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* FAQ / Why Contact Us */}
            <div className="animate-slideInRight">
              <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>

              <div className="space-y-6">
                {[
                  {
                    title: 'Expert Team',
                    description: 'Our team of specialists brings years of experience in digital transformation.',
                  },
                  {
                    title: 'Fast Response',
                    description: 'We typically respond to inquiries within 24 hours to keep your project moving.',
                  },
                  {
                    title: 'Custom Solutions',
                    description: 'Every business is unique. We tailor our services to your specific needs and goals.',
                  },
                  {
                    title: 'Proven Results',
                    description: 'Our clients see an average of 3x growth in online engagement within 6 months.',
                  },
                  {
                    title: 'Transparent Communication',
                    description: 'You\'ll always know what\'s happening with detailed progress reports and updates.',
                  },
                  {
                    title: 'Ongoing Support',
                    description: 'Your success doesn\'t end at launch. We provide continuous optimization and support.',
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="group bg-card/50 border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                    style={{ animation: `slideUp 0.6s ease-out forwards`, animationDelay: `${(index + 4) * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <MessageSquare size={16} />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-foreground/60 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10" />
        
        <div className="max-w-4xl mx-auto text-center animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not sure where to start?
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Schedule a free consultation with our team to discuss your business goals and how we can help.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
            Schedule Free Consultation
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

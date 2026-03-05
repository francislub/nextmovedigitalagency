'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Calendar, Clock, User, Mail, Phone, CheckCircle, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ConsultationPage() {
  const [step, setStep] = useState<'details' | 'datetime' | 'confirm' | 'success'>('details')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    budget: '',
    services: [] as string[],
    description: '',
    preferredDate: '',
    preferredTime: '',
  })

  const services = [
    'Web Design',
    'Brand Building',
    'Content Creation',
    'Social Media Marketing',
    'SEO Optimization',
    'E-commerce Development',
    'Mobile App Development',
    'Digital Strategy',
  ]

  const budgets = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    'Over $50,000',
  ]

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'E-commerce',
    'Real Estate',
    'Education',
    'Hospitality',
    'Other',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 'details') {
      if (!formData.fullName || !formData.email || !formData.phone || formData.services.length === 0) {
        toast.error('Please fill in all required fields')
        return
      }
      setStep('datetime')
      return
    }

    if (step === 'datetime') {
      if (!formData.preferredDate || !formData.preferredTime) {
        toast.error('Please select date and time')
        return
      }
      setStep('confirm')
      return
    }

    if (step === 'confirm') {
      setLoading(true)
      try {
        const response = await fetch('/api/consultation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        const data = await response.json()

        if (!response.ok) {
          toast.error(data.error || 'Failed to schedule consultation')
          setLoading(false)
          return
        }

        toast.success('Consultation scheduled successfully! Check your email for confirmation.')
        setStep('success')
      } catch (error) {
        console.error('[v0] Consultation error:', error)
        toast.error('An error occurred')
        setLoading(false)
      }
    }
  }

  const handleBack = () => {
    if (step === 'datetime') setStep('details')
    if (step === 'confirm') setStep('datetime')
  }

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
              Schedule Your Free Consultation
            </h1>
            <p className="text-lg text-foreground/70">
              Get 30 minutes with our digital strategy experts. We'll discuss your business goals, current challenges, and create a custom plan to help you succeed online.
            </p>
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {['Details', 'Schedule', 'Confirm', 'Success'].map((label, index) => (
                <div key={label} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step === ['details', 'datetime', 'confirm', 'success'][index]
                        ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground scale-110'
                        : ['details', 'datetime', 'confirm', 'success'].indexOf(step) > index
                        ? 'bg-primary/30 text-foreground'
                        : 'bg-border text-foreground/50'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        ['details', 'datetime', 'confirm', 'success'].indexOf(step) > index
                          ? 'bg-primary/30'
                          : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-lg">
            {step === 'success' ? (
              <div className="text-center space-y-6 py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="text-primary-foreground" size={48} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Consultation Scheduled!</h2>
                  <p className="text-foreground/70 mb-4">
                    Thank you for booking your consultation. We've sent a confirmation email to <strong>{formData.email}</strong> with all the details.
                  </p>
                  <p className="text-foreground/60 text-sm mb-8">
                    Our team will reach out shortly to confirm the appointment time.
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Back to Home
                  <ArrowRight size={20} />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Details */}
                {step === 'details' && (
                  <div className="space-y-6 animate-fadeInUp">
                    <h2 className="text-2xl font-bold mb-8">Let's Get to Know You</h2>

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                        required
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
                        placeholder="Your Company"
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Industry */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Industry
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                      >
                        <option value="">Select an industry</option>
                        {industries.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Services Needed */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-4">
                        Services of Interest *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {services.map((service) => (
                          <label key={service} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-all">
                            <input
                              type="checkbox"
                              checked={formData.services.includes(service)}
                              onChange={() => handleServiceToggle(service)}
                              className="w-4 h-4 rounded border-border"
                            />
                            <span className="text-sm">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                      >
                        <option value="">Select a budget range</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Tell us about your project
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="What are your main goals and challenges?"
                        rows={4}
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Next Button */}
                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      Next: Schedule
                      <ArrowRight size={20} />
                    </button>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 'datetime' && (
                  <div className="space-y-6 animate-fadeInUp">
                    <h2 className="text-2xl font-bold mb-8">Choose Your Time</h2>

                    {/* Preferred Date */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Calendar size={18} />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Preferred Time */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Clock size={18} />
                        Preferred Time *
                      </label>
                      <input
                        type="time"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 px-8 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        Review
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirm */}
                {step === 'confirm' && (
                  <div className="space-y-6 animate-fadeInUp">
                    <h2 className="text-2xl font-bold mb-8">Confirm Your Consultation</h2>

                    {/* Summary Card */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-foreground/60 text-sm">Name</p>
                          <p className="font-semibold">{formData.fullName}</p>
                        </div>
                        <div>
                          <p className="text-foreground/60 text-sm">Email</p>
                          <p className="font-semibold">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-foreground/60 text-sm">Phone</p>
                          <p className="font-semibold">{formData.phone}</p>
                        </div>
                        <div>
                          <p className="text-foreground/60 text-sm">Company</p>
                          <p className="font-semibold">{formData.company || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-primary/20">
                        <p className="text-foreground/60 text-sm mb-1">Services</p>
                        <p className="font-semibold">{formData.services.join(', ')}</p>
                      </div>

                      <div className="pt-4 border-t border-primary/20">
                        <p className="text-foreground/60 text-sm mb-1">Consultation Time</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(formData.preferredDate).toLocaleDateString()} at {formData.preferredTime}
                        </p>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 px-8 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin">⏳</div>
                            Scheduling...
                          </>
                        ) : (
                          <>
                            <CheckCircle size={20} />
                            Schedule Consultation
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: 'How long is the consultation?',
                  a: 'Our free consultation is 30 minutes. This gives us time to understand your business and provide initial recommendations.',
                },
                {
                  q: 'What should I prepare?',
                  a: 'Have your business goals, current challenges, and budget range in mind. We\'ll discuss the rest together.',
                },
                {
                  q: 'Is this really free?',
                  a: 'Yes! Our free consultation is completely free. No credit card required, no hidden fees.',
                },
                {
                  q: 'When can we schedule?',
                  a: 'We\'re available Monday through Friday, 9 AM to 6 PM EST. Choose any available time that works for you.',
                },
              ].map((item, index) => (
                <div key={index} className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all">
                  <h3 className="font-bold mb-2 text-primary">{item.q}</h3>
                  <p className="text-foreground/70 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

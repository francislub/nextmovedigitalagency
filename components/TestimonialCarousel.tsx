'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Lisa Martinez',
    role: 'Owner, Artisan Bakery',
    content: 'NextMove completely transformed our online presence. We went from zero online orders to 40% of our revenue coming from the website. Incredible ROI!',
    rating: 5,
    gradient: 'from-pink-500 to-rose-500',
    initials: 'LM',
  },
  {
    id: 2,
    name: 'David Thompson',
    role: 'CEO, Tech Startup',
    content: 'The team understood our vision and executed flawlessly. Our conversion rate jumped 3x in the first quarter. Highly recommend!',
    rating: 5,
    gradient: 'from-blue-500 to-cyan-500',
    initials: 'DT',
  },
  {
    id: 3,
    name: 'Amanda Wilson',
    role: 'Marketing Director, Healthcare Clinic',
    content: 'Professional, responsive, and results-driven. They delivered on time and beyond expectations. Our patient inquiries increased 250%.',
    rating: 5,
    gradient: 'from-green-500 to-emerald-500',
    initials: 'AW',
  },
  {
    id: 4,
    name: 'Robert Chen',
    role: 'Founder, E-commerce Brand',
    content: 'The best investment we made for our business. NextMove took our site from clunky to conversion machine. Outstanding work!',
    rating: 5,
    gradient: 'from-purple-500 to-indigo-500',
    initials: 'RC',
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const next = () => {
    setDirection('right')
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection('left')
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? testimonials.length - 1 : prev - 1
    )
  }

  useEffect(() => {
    const timer = setInterval(next, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accent/5 via-background to-background">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-lg text-foreground/60">
            Real feedback from real businesses we've helped transform
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Testimonial Cards */}
          <div className="overflow-hidden rounded-3xl">
            {testimonials.map((testimonial, index) => {
              const isVisible = index === currentIndex
              const animateClass = isVisible
                ? direction === 'right'
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-0 opacity-100'
                : direction === 'right'
                  ? 'translate-x-full opacity-0'
                  : '-translate-x-full opacity-0'

              return (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${animateClass}`}
                  style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
                >
                  {/* Card Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-5 rounded-3xl`}
                  />

                  {/* Card Content */}
                  <div className="relative p-8 md:p-12 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
                    <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                      {/* Avatar */}
                      <div className="flex justify-center md:justify-start">
                        <div
                          className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-3xl font-bold flex-shrink-0`}
                        >
                          {testimonial.initials}
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        {/* Quote */}
                        <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed mb-6 italic">
                          "{testimonial.content}"
                        </p>

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {Array(testimonial.rating)
                            .fill(null)
                            .map((_, i) => (
                              <Star
                                key={i}
                                size={20}
                                className="fill-accent text-accent"
                              />
                            ))}
                        </div>

                        {/* Author Info */}
                        <div>
                          <p className="font-bold text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-foreground/60 text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="p-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 'right' : 'left')
                    setCurrentIndex(index)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-primary to-secondary w-8'
                      : 'bg-border w-2 hover:bg-foreground/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

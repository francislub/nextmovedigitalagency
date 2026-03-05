'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { number: 500, label: 'Happy Clients', symbol: '+' },
  { number: 1000, label: 'Projects Delivered', symbol: '+' },
  { number: 98, label: 'Customer Satisfaction', symbol: '%' },
  { number: 15, label: 'Years of Excellence', symbol: '+' },
]

function Counter({ target, symbol }: { target: number; symbol: string }) {
  const [count, setCount] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && count === 0) {
          const increment = Math.ceil(target / 50)
          const interval = setInterval(() => {
            setCount((prev) => {
              if (prev + increment >= target) {
                clearInterval(interval)
                return target
              }
              return prev + increment
            })
          }, 30)

          return () => clearInterval(interval)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [target, count])

  return (
    <div
      ref={elementRef}
      className="text-5xl md:text-6xl font-black tracking-widest bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-mono"
    >
      {count}
      <span className="text-4xl md:text-5xl">{symbol}</span>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
            By The{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto tracking-wide">
            Our impact speaks for itself
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group text-center p-8 rounded-2xl border border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon Circle */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl text-white font-bold">📈</span>
              </div>

              {/* Counter */}
              <Counter target={stat.number} symbol={stat.symbol} />

              {/* Label */}
              <p className="text-foreground/70 font-semibold uppercase tracking-wider mt-4 group-hover:text-primary transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
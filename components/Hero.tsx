"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-accent/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <Sparkles size={16} className="text-primary" />
              <span className="text-xs md:text-sm font-semibold text-primary">
                Delivering Excellence in Digital
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 transition-all duration-900 delay-100 leading-tight text-balance ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-text">
                Transform Your Business Vision
              </span>
            </h1>

            {/* Subheading */}
            <p
              className={`text-base md:text-lg text-foreground/70 mb-8 leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Innovative, secure and reliable digital solutions that power
              organizations through leading-edge technology and exceptional
              service. We help local businesses turn online visibility into real
              customers and revenue.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 group w-full sm:w-auto"
              >
                Get Started
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto">
                View Our Work
              </button>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-4 mt-12 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {[
                { number: "50+", label: "Projects Delivered" },
                { number: "15+", label: "Years Experience" },
                { number: "99%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-lg bg-card/50 border border-border/30 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    animationName: isVisible ? "slideUp" : "none",
                    animationDuration: "0.6s",
                    animationTimingFunction: "ease-out",
                    animationFillMode: "forwards",
                    animationDelay: `${400 + index * 100}ms`,
                  }}
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <p className="text-xs md:text-sm text-foreground/60 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image/Visual */}
          <div
            className={`order-1 lg:order-2 relative h-96 md:h-[500px] rounded-2xl overflow-hidden group transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-background rounded-2xl" />

            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl opacity-20 animate-float -translate-x-1/2 -translate-y-1/2" />
            <div
              className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-secondary to-accent rounded-full blur-3xl opacity-15 animate-float"
              style={{ animationDelay: "1s" }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-xl opacity-40 animate-pulse"
                    style={{ animationDuration: "3s" }}
                  />
                  <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-full backdrop-blur-sm border border-primary/20">
                    <Sparkles size={80} className="text-primary animate-float" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    Digital Excellence
                  </h3>
                  <p className="text-foreground/60 text-sm max-w-xs">
                    Innovative solutions built for your success
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 border border-primary/10 rounded-2xl group-hover:border-primary/30 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl transform skew-x-12" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <span className="w-1 h-2 bg-foreground/30 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

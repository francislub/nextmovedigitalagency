'use client'

import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const preferred =
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = stored || preferred
    setTheme(initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    const html = document.documentElement
    if (newTheme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    localStorage.setItem('theme', newTheme)
  }

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-foreground transition-all duration-300 transform hover:scale-110"
        aria-label="Toggle theme"
        disabled
      >
        <Moon size={20} />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-foreground transition-all duration-300 transform hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Mail,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  User,
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Mail, label: 'Contact Forms', href: '/admin/contacts' },
  { icon: Calendar, label: 'Consultations', href: '/admin/consultations' },
  { icon: Users, label: 'Team Members', href: '/admin/team' },
  { icon: MessageSquare, label: 'Subscribers', href: '/admin/subscribers' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('[v0] Failed to parse user data:', error)
      }
    }
  }, [])

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-primary text-primary-foreground"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-30 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon%20dark.PNG-m0iFa9Ke0sPMElzlQotyqv2zROP425.png"
              alt="NextMove"
              className="h-8 w-auto"
            />
            <span className="font-bold text-lg hidden sm:inline">NextMove</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                    : 'text-foreground/70 hover:bg-secondary/10 hover:text-foreground'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        {user && (
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/5">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <User size={18} className="text-primary-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.name || 'User'}</p>
                <p className="text-xs text-foreground/60 truncate">{user.activeEmail || user.email}</p>
              </div>
            </div>
            <Link
              href="/admin/profile"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-foreground/70 hover:bg-secondary/10 hover:text-foreground transition-all text-sm font-medium"
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
          </div>
        )}

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={() => {
              localStorage.removeItem('auth-token')
              localStorage.removeItem('user')
              window.location.href = '/login'
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-200 font-medium text-sm"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

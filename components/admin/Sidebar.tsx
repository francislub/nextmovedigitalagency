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
  LogIn,
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
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Failed to parse user:', error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-primary text-primary-foreground"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop */}
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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-iXsseJTvyXimXjpRcnVLUKTT4S6pv2.png"
              alt="NextMove"
              className="max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[250px] h-auto object-contain "
            />
            
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
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

        {/* User Section */}
        <div className="p-4 border-t border-border">
          {!user ? (
            <Link
              href="/login"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary/10 transition-all font-medium"
            >
              <LogIn size={20} />
              <span>Login</span>
            </Link>
          ) : (
            <div className="relative">
              {/* User Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary/10 transition-all"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                )}

                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs text-foreground/60 truncate">
                    {user.activeEmail || user.email}
                  </p>
                </div>

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute bottom-14 left-0 w-full bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                  <Link
                    href="/admin/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/10 text-sm"
                  >
                    <User size={18} />
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-destructive/10 text-destructive text-sm"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
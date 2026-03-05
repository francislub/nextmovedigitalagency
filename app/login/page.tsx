'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Phone, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email')
  const [value, setValue] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [loginType]: value,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Login failed')
        return
      }

      toast.success('Login successful!')
      localStorage.setItem('auth-token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      router.push('/admin/dashboard')
    } catch (error) {
      console.error('[v0] Login error:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20light.PNG-fBveX1QZtkKBhmWFI1waYPY98DXVoz.png"
              alt="NextMove"
              className="h-12 w-auto dark:hidden"
            />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20dark.PNG-rrKJPZEYoUNF8KtUZEGTzZSk6DbjCj.png"
              alt="NextMove"
              className="h-12 w-auto hidden dark:block"
            />
          </Link>
          <h1 className="text-3xl font-bold mb-2">Team Portal</h1>
          <p className="text-foreground/60">Login to access your dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-lg">
          {/* Login Type Selector */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => {
                setLoginType('email')
                setValue('')
              }}
              className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                loginType === 'email'
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                  : 'bg-secondary/10 text-foreground/70 hover:bg-secondary/20'
              }`}
            >
              <Mail size={18} className="inline mr-2" />
              Email
            </button>
            <button
              onClick={() => {
                setLoginType('phone')
                setValue('')
              }}
              className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                loginType === 'phone'
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                  : 'bg-secondary/10 text-foreground/70 hover:bg-secondary/20'
              }`}
            >
              <Phone size={18} className="inline mr-2" />
              Phone
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                {loginType === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <input
                type={loginType === 'email' ? 'email' : 'tel'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={
                  loginType === 'email'
                    ? 'you@example.com'
                    : '+1 (555) 000-0000'
                }
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !value}
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader size={18} className="animate-spin" />}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* No Password Notice */}
          <p className="text-center text-sm text-foreground/60 mt-6">
            No password required - we'll send you a magic link
          </p>
        </div>

        {/* Register Link */}
        <p className="text-center mt-8 text-foreground/60">
          Don't have an account?{' '}
          <Link href="/register-invite" className="text-primary hover:text-secondary font-semibold">
            Request an invite
          </Link>
        </p>
      </div>
    </main>
  )
}

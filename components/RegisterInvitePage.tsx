'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Loader, AlertCircle, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { ImageUpload } from './ImageUpload'

interface RegistrationData {
  name: string
  image: string | null
  description: string
  activeEmail: string
  activePhone: string
  mainRole: string
  githubLink: string
  twitterLink: string
  linkedinLink: string
  instagramLink: string
  websiteLink: string
  roleIds: string[]
}

export default function RegisterInvitePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [step, setStep] = useState<'request' | 'register'>('request')
  const [loading, setLoading] = useState(false)
  const [inviteLoading, setInviteLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [roles, setRoles] = useState<Array<{ id: string; name: string }>>([])
  const [inviteEmail, setInviteEmail] = useState<string>('')
  const [tokenError, setTokenError] = useState<string>('')
  const [registerData, setRegisterData] = useState<RegistrationData>({
    name: '',
    image: null,
    description: '',
    activeEmail: '',
    activePhone: '',
    mainRole: 'admin',
    githubLink: '',
    twitterLink: '',
    linkedinLink: '',
    instagramLink: '',
    websiteLink: '',
    roleIds: [],
  })

  useEffect(() => {
    if (token) {
      setStep('register')
      loadRoles()
      loadInviteEmail()
    }
  }, [token])

  const loadInviteEmail = async () => {
    if (!token) return
    
    setInviteLoading(true)
    try {
      const response = await fetch(`/api/auth/verify-invite?token=${token}`)
      const data = await response.json()

      if (!response.ok) {
        setTokenError(data.error || 'Invalid invitation link')
        setInviteLoading(false)
        return
      }

      setInviteEmail(data.email)
      setRegisterData((prev) => ({
        ...prev,
        activeEmail: data.email,
      }))
      setInviteLoading(false)
    } catch (error) {
      console.error('[v0] Load invite error:', error)
      setTokenError('Failed to load invitation details')
      setInviteLoading(false)
    }
  }

  const loadRoles = async () => {
    try {
      const response = await fetch('/api/roles')
      const data = await response.json()
      if (response.ok) {
        setRoles(data.roles)
      }
    } catch (error) {
      console.error('[v0] Failed to load roles:', error)
    }
  }

  const handleRequestInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/send-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Failed to send invite')
        setLoading(false)
        return
      }

      toast.success('Invitation sent! Check your email.')
      setEmail('')
    } catch (error) {
      console.error('[v0] Request invite error:', error)
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!registerData.name || !registerData.activeEmail || !registerData.activePhone) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...registerData,
          token,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Registration failed')
        setLoading(false)
        return
      }

      // Store user data
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('auth-token', data.token)

      // Show success dialog
      setShowSuccessDialog(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (error) {
      console.error('[v0] Register error:', error)
      toast.error('An error occurred')
      setLoading(false)
    }
  }

  // Request Invite Step
  if (!token && step === 'request') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-iXsseJTvyXimXjpRcnVLUKTT4S6pv2.png"
                alt="NextMove"
                className="sm:max-w-[150px] md:max-w-[200px] lg:max-w-[200px] h-auto object-contain dark:hidden"
              />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/black-iXsseJTvyXimXjpRcnVLUKTT4S6pv2.png"
                alt="NextMove"
                className="hidden dark:block sm:max-w-[150px] md:max-w-[200px] lg:max-w-[200px] h-auto object-contain"
              />
            </Link>

            <h1 className="text-3xl font-bold mb-2">Join Our Team</h1>
            <p className="text-foreground/60">Request an invitation to join NextMove</p>
          </div>

          <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-lg">
            <form onSubmit={handleRequestInvite} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <p className="text-sm text-foreground/60">We'll send you an invitation link via email.</p>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader size={18} className="animate-spin" />}
                {loading ? 'Sending...' : 'Send Invitation'}
              </button>
            </form>
          </div>
        </div>
      </main>
    )
  }

  // Invalid token or token error
  if (!token || tokenError) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background to-secondary/10">
        <div className="text-center max-w-md">
          <div className="bg-card rounded-2xl border border-destructive/30 p-8 shadow-lg">
            <AlertCircle size={48} className="mx-auto mb-4 text-destructive" />
            <h1 className="text-2xl font-bold mb-2">Invalid Invitation</h1>
            <p className="text-foreground/60 mb-2">{tokenError || 'The invitation link is invalid or expired.'}</p>
            <p className="text-sm text-foreground/50 mb-6">You can request a new invitation below:</p>
            
            <div className="bg-secondary/5 border border-border/20 rounded-lg p-4 mb-6">
              <form onSubmit={handleRequestInvite} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                >
                  {loading && <Loader size={16} className="animate-spin" />}
                  {loading ? 'Sending...' : 'Request Invitation'}
                </button>
              </form>
            </div>

            <Link href="/register-invite" className="text-primary hover:text-secondary font-medium text-sm">
              Back to invitation request
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // Success Dialog
  if (showSuccessDialog) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background to-secondary/10">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-primary-foreground" />
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Registration Successful!</h1>
            <p className="text-foreground/60 mb-4">Your account has been created successfully.</p>
            
            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium mb-2">Welcome to NextMove Digital Agency</p>
              <p className="text-xs text-foreground/60">You'll be redirected to the login page shortly...</p>
            </div>

            <div className="flex items-center justify-center gap-2">
              <Loader size={18} className="animate-spin text-primary" />
              <span className="text-sm font-medium">Redirecting in 3 seconds...</span>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Loading invite verification
  if (inviteLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Loading Your Invitation</h1>
            <p className="text-foreground/60">Please wait while we verify your invitation...</p>
          </div>

          <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-lg">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-background/50 rounded w-24 animate-pulse" />
                  <div className="h-10 bg-background/50 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Registration Form
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-foreground/60">Create your team member profile to get started</p>
        </div>

        <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-lg max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                type="text"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                placeholder="John Doe"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors text-sm"
              />
            </div>

            {/* Active Email - Read Only from Invite */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Registered Email *
                <span className="text-xs font-normal text-foreground/60 ml-2">(from invitation)</span>
              </label>
              <input
                type="email"
                value={registerData.activeEmail}
                readOnly
                disabled
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background/20 focus:border-primary focus:outline-none transition-colors text-sm opacity-75 cursor-not-allowed"
              />
              <p className="text-xs text-foreground/60 mt-1">This email is set from your invitation and cannot be changed</p>
            </div>

            {/* Active Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">Active Phone *</label>
              <input
                type="tel"
                value={registerData.activePhone}
                onChange={(e) => setRegisterData({ ...registerData, activePhone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors text-sm"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium mb-2">Profile Image</label>
              <ImageUpload 
                value={registerData.image}
                onChange={(url) => setRegisterData({ ...registerData, image: url })}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Bio / Description</label>
              <textarea
                value={registerData.description}
                onChange={(e) => setRegisterData({ ...registerData, description: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={2}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors text-sm resize-none"
              />
            </div>

            {/* Roles */}
            <div>
              <label className="block text-sm font-medium mb-2">Roles</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <label key={role.id} className="flex items-center gap-2 cursor-pointer hover:bg-secondary/5 p-2 rounded transition-colors">
                      <input
                        type="checkbox"
                        checked={registerData.roleIds.includes(role.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRegisterData({
                              ...registerData,
                              roleIds: [...registerData.roleIds, role.id],
                            })
                          } else {
                            setRegisterData({
                              ...registerData,
                              roleIds: registerData.roleIds.filter((id) => id !== role.id),
                            })
                          }
                        }}
                        className="rounded border-border"
                      />
                      <span className="text-sm">{role.name}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-foreground/60">No roles available</p>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-secondary/5 p-4 rounded-lg space-y-3 border border-border/20">
              <p className="text-xs font-semibold text-foreground/70">Social Links (Optional)</p>
              
              <input
                type="url"
                value={registerData.githubLink}
                onChange={(e) => setRegisterData({ ...registerData, githubLink: e.target.value })}
                placeholder="GitHub URL"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none text-sm"
              />
              
              <input
                type="url"
                value={registerData.twitterLink}
                onChange={(e) => setRegisterData({ ...registerData, twitterLink: e.target.value })}
                placeholder="Twitter URL"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none text-sm"
              />
              
              <input
                type="url"
                value={registerData.linkedinLink}
                onChange={(e) => setRegisterData({ ...registerData, linkedinLink: e.target.value })}
                placeholder="LinkedIn URL"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none text-sm"
              />
              
              <input
                type="url"
                value={registerData.instagramLink}
                onChange={(e) => setRegisterData({ ...registerData, instagramLink: e.target.value })}
                placeholder="Instagram URL"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none text-sm"
              />
              
              <input
                type="url"
                value={registerData.websiteLink}
                onChange={(e) => setRegisterData({ ...registerData, websiteLink: e.target.value })}
                placeholder="Website URL"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !registerData.name || !registerData.activeEmail || !registerData.activePhone}
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
            >
              {loading && <Loader size={18} className="animate-spin" />}
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-xs text-foreground/60 text-center">
              By registering, you agree to our terms and conditions
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}

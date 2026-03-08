'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Loader, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function RegisterInvitePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [step, setStep] = useState<'request' | 'register'>('request')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [registerData, setRegisterData] = useState({
    name: '',
    image: '',
    description: '',
    activeEmail: '',
    activePhone: '',
    mainRole: 'admin',
    githubLink: '',
    twitterLink: '',
    linkedinLink: '',
    instagramLink: '',
    websiteLink: '',
    roleIds: [] as string[],
  })
  const [roles, setRoles] = useState<Array<{ id: string; name: string }>>([])
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    if (token) {
      setStep('register')
      loadRoles()
    }
  }, [token])

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setRegisterData({ ...registerData, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = registerData.image

      // Upload image to uploadthing if exists
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          imageUrl = uploadData.url
        }
      }

      const response = await fetch('/api/auth/register-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...registerData,
          image: imageUrl,
          token,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Registration failed')
        return
      }

      toast.success('Account created successfully! Please login.')
      setTimeout(() => router.push('/login'), 1500)
    } catch (error) {
      console.error('[v0] Register error:', error)
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!token && step === 'request') {
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
            <h1 className="text-3xl font-bold mb-2">Join Our Team</h1>
            <p className="text-foreground/60">Request an invitation to join NextMove</p>
          </div>

          {/* Request Card */}
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

              <p className="text-sm text-foreground/60">
                We'll send you an invitation link via email. Click it to complete your registration.
              </p>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader size={18} className="animate-spin" />}
                {loading ? 'Sending...' : 'Send Invitation'}
              </button>
            </form>

            <p className="text-center mt-6">
              Already have an invite?{' '}
              <Link href="/login" className="text-primary hover:text-secondary font-semibold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-destructive" />
          <h1 className="text-2xl font-bold mb-2">Invalid Link</h1>
          <p className="text-foreground/60 mb-6">
            The invitation link is invalid or expired.
          </p>
          <Link
            href="/register-invite"
            className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Request New Invite
          </Link>
        </div>
      </main>
    )
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
          <h1 className="text-3xl font-bold mb-2">Complete Registration</h1>
          <p className="text-foreground/60">Create your team member profile</p>
        </div>

        {/* Register Card */}
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Active Email *</label>
              <input
                type="email"
                value={registerData.activeEmail}
                onChange={(e) => setRegisterData({ ...registerData, activeEmail: e.target.value })}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">Active Phone</label>
              <input
                type="tel"
                value={registerData.activePhone}
                onChange={(e) => setRegisterData({ ...registerData, activePhone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors text-sm"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium mb-2">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors text-sm"
              />
              {registerData.image && (
                <img src={registerData.image} alt="Preview" className="mt-2 w-20 h-20 rounded-lg object-cover" />
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
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
              <div className="space-y-2">
                {roles.map((role) => (
                  <label key={role.id} className="flex items-center gap-2 cursor-pointer">
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
                ))}
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

            <button
              type="submit"
              disabled={loading || !registerData.name || !registerData.activeEmail}
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
            >
              {loading && <Loader size={18} className="animate-spin" />}
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

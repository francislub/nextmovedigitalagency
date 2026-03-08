'use client'

export const dynamic = "force-dynamic"

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
            <p className="text-foreground/60">
              Request an invitation to join NextMove
            </p>

          </div>

          <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-lg">

            <form onSubmit={handleRequestInvite} className="space-y-6">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>

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
                We'll send you an invitation link via email.
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

          </div>
        </div>
      </main>
    )
  }

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center">

        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-destructive" />

          <h1 className="text-2xl font-bold mb-2">Invalid Link</h1>

          <p className="text-foreground/60 mb-6">
            The invitation link is invalid or expired.
          </p>

          <Link
            href="/register-invite"
            className="px-6 py-3 bg-primary text-white rounded-lg"
          >
            Request New Invite
          </Link>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Complete Registration
          </h1>

          <p className="text-foreground/60">
            Create your team member profile
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">

          <form onSubmit={handleRegister} className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="email"
              placeholder="Active Email"
              value={registerData.activeEmail}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  activeEmail: e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {registerData.image && (
              <img
                src={registerData.image}
                className="w-20 h-20 rounded-lg object-cover"
                alt="Preview"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

          </form>

        </div>

      </div>

    </main>
  )
}
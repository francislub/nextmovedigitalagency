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
      console.error('Failed to load roles:', error)
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
    } catch {
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
        setRegisterData({
          ...registerData,
          image: reader.result as string,
        })
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
    } catch {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!token && step === 'request') {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleRequestInvite} className="space-y-4 w-96">

          <h1 className="text-2xl font-bold">Request Invitation</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full p-3 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded"
          >
            {loading ? 'Sending...' : 'Send Invite'}
          </button>

        </form>
      </main>
    )
  }

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <AlertCircle size={40} className="mx-auto mb-4 text-red-500"/>

          <h1 className="text-xl font-bold">Invalid Link</h1>

          <Link href="/register-invite">
            Request New Invite
          </Link>

        </div>

      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center">

      <form onSubmit={handleRegister} className="space-y-4 w-96">

        <h1 className="text-2xl font-bold">Complete Registration</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={registerData.name}
          onChange={(e) =>
            setRegisterData({ ...registerData, name: e.target.value })
          }
          className="border w-full p-3 rounded"
          required
        />

        <input
          type="email"
          placeholder="Active Email"
          value={registerData.activeEmail}
          onChange={(e) =>
            setRegisterData({ ...registerData, activeEmail: e.target.value })
          }
          className="border w-full p-3 rounded"
          required
        />

        <input
          type="file"
          onChange={handleImageChange}
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>

      </form>

    </main>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Loader, Upload, User } from 'lucide-react'

interface TeamMemberProfile {
  id: string
  name: string
  image?: string
  description?: string
  activeEmail?: string
  activePhone?: string
  mainRole: string
  githubLink?: string
  twitterLink?: string
  linkedinLink?: string
  instagramLink?: string
  websiteLink?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<TeamMemberProfile | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = () => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const user = JSON.parse(userData)
        setProfile(user)
        if (user.image) {
          setImagePreview(user.image)
        }
        setLoading(false)
      } catch (error) {
        console.error('[v0] Failed to load profile:', error)
        toast.error('Failed to load profile')
        setLoading(false)
      }
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setSaving(true)
    try {
      let imageUrl = profile.image

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

      const response = await fetch('/api/team/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profile,
          image: imageUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Failed to update profile')
        return
      }

      const updatedProfile = { ...profile, image: imageUrl }
      setProfile(updatedProfile)
      localStorage.setItem('user', JSON.stringify(updatedProfile))
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('[v0] Error saving profile:', error)
      toast.error('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" size={40} />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/60">Profile not found</p>
      </div>
    )
  }

  return (
    <main className="p-6 md:p-8">
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-foreground/60">Update your team member information</p>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Profile Image */}
          <div className="bg-card rounded-2xl border border-border/50 p-8">
            <h2 className="text-xl font-semibold mb-6">Profile Picture</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-32 h-32 rounded-xl object-cover border-2 border-primary"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-2 border-primary/30">
                    <User size={48} className="text-primary-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label className="flex items-center gap-2 px-4 py-3 bg-secondary/10 border border-border rounded-lg cursor-pointer hover:bg-secondary/20 transition-colors">
                  <Upload size={20} />
                  <span className="font-medium">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-foreground/60 mt-2">
                  JPG, PNG or GIF (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-card rounded-2xl border border-border/50 p-8">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Active Email</label>
                <input
                  type="email"
                  value={profile.activeEmail || ''}
                  onChange={(e) =>
                    setProfile({ ...profile, activeEmail: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Active Phone</label>
                <input
                  type="tel"
                  value={profile.activePhone || ''}
                  onChange={(e) =>
                    setProfile({ ...profile, activePhone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={profile.description || ''}
                  onChange={(e) =>
                    setProfile({ ...profile, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Main Role</label>
                <input
                  type="text"
                  value={profile.mainRole}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 opacity-60 cursor-not-allowed"
                />
                <p className="text-xs text-foreground/60 mt-1">
                  Main role cannot be changed
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card rounded-2xl border border-border/50 p-8">
            <h2 className="text-xl font-semibold mb-6">Social Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">GitHub</label>
                <input
                  type="url"
                  value={profile.githubLink || ''}
                  onChange={(e) =>
                    setProfile({ ...profile, githubLink: e.target.value })
                  }
                  placeholder="https://github.com/username"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Twitter</label>
                <input
                  type="url"
                  value={profile.twitterLink || ''}
                  onChange={(e) =>
                    setProfile({ ...profile, twitterLink: e.target.value })
                  }
                  placeholder="https://twitter.com/username"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={profile.linkedinLink || ''}
                  onChange={(e) =>
                    setProfile({ ...profile, linkedinLink: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Instagram</label>
                <input
                  type="url"
                  value={profile.instagramLink || ''}
                  onChange={(e) =>
                    setProfile({ ...profile, instagramLink: e.target.value })
                  }
                  placeholder="https://instagram.com/username"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <input
                  type="url"
                  value={profile.websiteLink || ''}
                  onChange={(e) =>
                    setProfile({ ...profile, websiteLink: e.target.value })
                  }
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving && <Loader size={20} className="animate-spin" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </main>
  )
}

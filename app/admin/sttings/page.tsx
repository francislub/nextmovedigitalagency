'use client'

import { useState } from 'react'
import { Save, Mail, Phone, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    businessName: 'NextMove Digital Agency',
    email: 'hello@nextmove.digital',
    phone: '+1 (443) 620-4620',
    address: '123 Digital Street, Tech City, TC 12345',
    timezone: 'America/New_York',
    notificationsEmail: true,
    notificationsSMS: false,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Settings saved successfully!')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-foreground/60 mt-2">Manage your business information and preferences</p>
      </div>

      <div className="bg-card rounded-xl border border-border/50 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="America/New_York">America/New_York</option>
                  <option value="America/Chicago">America/Chicago</option>
                  <option value="America/Denver">America/Denver</option>
                  <option value="America/Los_Angeles">America/Los_Angeles</option>
                  <option value="Europe/London">Europe/London</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail size={18} />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Phone size={18} />
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin size={18} />
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-6">Notifications</h2>
            <div className="space-y-4">
              <label className="flex items-center p-4 bg-secondary/5 rounded-lg cursor-pointer hover:bg-secondary/10 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.notificationsEmail}
                  onChange={(e) => setFormData({ ...formData, notificationsEmail: e.target.checked })}
                  className="w-5 h-5 rounded border-border cursor-pointer"
                />
                <div className="ml-4">
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-foreground/60">Receive email alerts for new submissions</p>
                </div>
              </label>

              <label className="flex items-center p-4 bg-secondary/5 rounded-lg cursor-pointer hover:bg-secondary/10 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.notificationsSMS}
                  onChange={(e) => setFormData({ ...formData, notificationsSMS: e.target.checked })}
                  className="w-5 h-5 rounded border-border cursor-pointer"
                />
                <div className="ml-4">
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-foreground/60">Receive SMS alerts for urgent matters</p>
                </div>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4 border-t border-border pt-8">
            <button
              type="reset"
              className="px-6 py-3 bg-secondary/20 hover:bg-secondary/30 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Save size={20} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

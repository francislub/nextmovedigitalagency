'use client'

import { useEffect, useState } from 'react'
import { Calendar, Trash2, Eye, Search } from 'lucide-react'
import toast from 'react-hot-toast'

interface Consultation {
  id: string
  fullName: string
  email: string
  phone: string
  company?: string
  serviceType: string
  preferredDate?: string
  preferredTime?: string
  message?: string
  createdAt: string
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedConsult, setSelectedConsult] = useState<Consultation | null>(null)

  // Fetch consultations
  useEffect(() => {
    async function fetchConsultations() {
      try {
        const res = await fetch('/api/consultation')
        const data = await res.json()
        setConsultations(data || [])
      } finally {
        setLoading(false)
      }
    }
    fetchConsultations()
  }, [])

  const filteredConsultations = consultations.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.serviceType.toLowerCase().includes(search.toLowerCase())
  )

  // Delete consultation
  const deleteConsultation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this consultation?')) return

    try {
      const res = await fetch(`/api/consultation/${id}`, { method: 'DELETE' })
      const data = await res.json()

      if (data.success) {
        setConsultations((prev) => prev.filter((c) => c.id !== id))
        toast.success('Consultation deleted')
      } else {
        toast.error('Failed to delete consultation')
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('An error occurred')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading consultations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Scheduled Consultations</h1>
        <p className="text-foreground/60 mt-2">Manage all consultation requests</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-foreground/40" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      {filteredConsultations.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border border-border/50">
          <Calendar size={48} className="mx-auto mb-4 text-foreground/40" />
          <p className="text-foreground/60">No consultations found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsultations.map((consult) => (
            <div
              key={consult.id}
              className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{consult.fullName}</h3>
                  <p className="text-sm text-foreground/60">{consult.serviceType}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-600">
                  {new Date(consult.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <p className="text-foreground/70">{consult.email}</p>
                <p className="text-foreground/70">{consult.phone}</p>
                {consult.company && <p className="text-foreground/70">{consult.company}</p>}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedConsult(consult)}
                  className="flex-1 py-2 px-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Eye size={16} /> View
                </button>

                <button
                  onClick={() => deleteConsultation(consult.id)}
                  className="flex-1 py-2 px-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedConsult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedConsult.fullName}</h2>
            <div className="space-y-4">
              <p><strong>Email:</strong> {selectedConsult.email}</p>
              <p><strong>Phone:</strong> {selectedConsult.phone}</p>
              <p><strong>Service Type:</strong> {selectedConsult.serviceType}</p>
              {selectedConsult.company && <p><strong>Company:</strong> {selectedConsult.company}</p>}
              {selectedConsult.preferredDate && (
                <p>
                  <strong>Preferred Date & Time:</strong> {new Date(selectedConsult.preferredDate).toLocaleDateString()} {selectedConsult.preferredTime}
                </p>
              )}
              {selectedConsult.message && (
                <p className="mt-2 bg-secondary/10 p-4 rounded-lg">{selectedConsult.message}</p>
              )}
            </div>
            <button
              onClick={() => setSelectedConsult(null)}
              className="mt-6 w-full py-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
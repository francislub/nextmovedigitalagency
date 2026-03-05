'use client'

import { useEffect, useState } from 'react'
import { Calendar, Trash2, Check, X, Search } from 'lucide-react'

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
  status: string
  createdAt: string
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedConsult, setSelectedConsult] = useState<Consultation | null>(null)

  useEffect(() => {
    async function fetchConsultations() {
      try {
        const response = await fetch('/api/consultation')
        const data = await response.json()
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

  const updateStatus = async (id: string, newStatus: string) => {
    // Mock update - implement with real API
    setConsultations(consultations.map(c => c.id === id ? { ...c, status: newStatus } : c))
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
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Scheduled Consultations</h1>
        <p className="text-foreground/60 mt-2">Manage all consultation requests</p>
      </div>

      {/* Search */}
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

      {/* Consultations Grid */}
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
              className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => setSelectedConsult(consult)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{consult.fullName}</h3>
                  <p className="text-sm text-foreground/60">{consult.serviceType}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  consult.status === 'pending' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
                  consult.status === 'confirmed' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                  'bg-gray-500/20 text-gray-600 dark:text-gray-400'
                }`}>
                  {consult.status.charAt(0).toUpperCase() + consult.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <p className="text-foreground/70">{consult.email}</p>
                <p className="text-foreground/70">{consult.phone}</p>
                {consult.company && <p className="text-foreground/70">{consult.company}</p>}
                {consult.preferredDate && (
                  <p className="text-foreground/70 flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(consult.preferredDate).toLocaleDateString()} {consult.preferredTime}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    updateStatus(consult.id, 'confirmed')
                  }}
                  className="flex-1 py-2 px-3 bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-500/30 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Check size={16} />
                  Confirm
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    updateStatus(consult.id, 'cancelled')
                  }}
                  className="flex-1 py-2 px-3 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/30 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                >
                  <X size={16} />
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedConsult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedConsult.fullName}</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-foreground/60">Email</p>
                <p className="font-medium">{selectedConsult.email}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Phone</p>
                <p className="font-medium">{selectedConsult.phone}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Service Type</p>
                <p className="font-medium">{selectedConsult.serviceType}</p>
              </div>
              {selectedConsult.company && (
                <div>
                  <p className="text-sm text-foreground/60">Company</p>
                  <p className="font-medium">{selectedConsult.company}</p>
                </div>
              )}
              {selectedConsult.preferredDate && (
                <div>
                  <p className="text-sm text-foreground/60">Preferred Date & Time</p>
                  <p className="font-medium">
                    {new Date(selectedConsult.preferredDate).toLocaleDateString()} {selectedConsult.preferredTime}
                  </p>
                </div>
              )}
              {selectedConsult.message && (
                <div>
                  <p className="text-sm text-foreground/60">Message</p>
                  <p className="mt-2 text-foreground/80 bg-secondary/10 p-4 rounded-lg">{selectedConsult.message}</p>
                </div>
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

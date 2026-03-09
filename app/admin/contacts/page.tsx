'use client'

import { useEffect, useState } from 'react'
import { Mail, Trash2, Search, Eye } from 'lucide-react'

interface Contact {
  id: string
  fullName: string
  email: string
  phone?: string
  subject: string
  message: string
  status: string
  createdAt: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  async function fetchContacts() {
    try {
      const res = await fetch('/api/admin/contacts')
      const data = await res.json()

      console.log("Fetched contacts:", data)

      setContacts(data.contacts || [])
    } catch (err) {
      console.error('Failed to fetch contacts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  async function deleteContact(id: string) {
    if (!confirm("Are you sure you want to delete this contact?")) return

    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      const data = await res.json()

      if (data.success) {
        setContacts((prev) => prev.filter((c) => c.id !== id))
      } else {
        alert("Failed to delete contact")
      }
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  const filteredContacts = contacts.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-foreground/70">Loading contacts...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Contact Forms</h1>
        <p className="text-foreground/60 mt-2">
          Manage all contact form submissions
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-foreground/40" size={20} />
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">

        {filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <Mail size={48} className="mx-auto mb-4 text-foreground/40" />
            <p className="text-foreground/60">No contacts found</p>
          </div>
        ) : (

          <table className="w-full">

            <thead className="border-b border-border bg-secondary/20">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">

              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-secondary/20 transition-colors"
                >

                  <td className="px-6 py-4 font-medium text-foreground">
                    {contact.fullName}
                  </td>

                  <td className="px-6 py-4 text-sm text-foreground/70">
                    {contact.email}
                  </td>

                  <td className="px-6 py-4 text-foreground">
                    {contact.subject}
                  </td>

                  <td className="px-6 py-4 text-sm text-foreground/70">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">

                    {/* VIEW */}
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition"
                    >
                      <Eye size={18} className="text-blue-500" />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

          <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl w-full">

            <h2 className="text-2xl font-bold text-foreground mb-6">
              Contact Details
            </h2>

            <div className="space-y-4 text-foreground">

              <div>
                <p className="text-sm text-foreground/60">Full Name</p>
                <p className="font-medium">{selectedContact.fullName}</p>
              </div>

              <div>
                <p className="text-sm text-foreground/60">Email</p>
                <p className="font-medium">{selectedContact.email}</p>
              </div>

              {selectedContact.phone && (
                <div>
                  <p className="text-sm text-foreground/60">Phone</p>
                  <p className="font-medium">{selectedContact.phone}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-foreground/60">Subject</p>
                <p className="font-medium">{selectedContact.subject}</p>
              </div>

              <div>
                <p className="text-sm text-foreground/60">Message</p>
                <div className="bg-secondary/20 p-4 rounded-lg mt-1">
                  {selectedContact.message}
                </div>
              </div>

              <div>
                <p className="text-sm text-foreground/60">Status</p>
                <p>{selectedContact.status}</p>
              </div>

              <div>
                <p className="text-sm text-foreground/60">Date</p>
                <p>{new Date(selectedContact.createdAt).toLocaleString()}</p>
              </div>

            </div>

            <button
              onClick={() => setSelectedContact(null)}
              className="mt-6 w-full py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition font-semibold"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  )
}
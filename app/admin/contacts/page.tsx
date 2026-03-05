'use client'

import { useEffect, useState } from 'react'
import { Mail, Trash2, Archive, Search } from 'lucide-react'

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

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch('/api/admin/contacts')
        const data = await res.json()
        setContacts(data.contacts || [])
      } catch (err) {
        console.error('Failed to fetch contacts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  const filteredContacts = contacts.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading contacts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Contact Forms</h1>
        <p className="text-foreground/60 mt-2">Manage all contact form submissions</p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-foreground/40" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <Mail size={48} className="mx-auto mb-4 text-foreground/40" />
            <p className="text-foreground/60">No contacts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/10 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Subject</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-secondary/5 transition-colors cursor-pointer"
                    onClick={() => setSelectedContact(contact)}
                  >
                    <td className="px-6 py-4 font-medium">{contact.fullName}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{contact.email}</td>
                    <td className="px-6 py-4 text-sm">{contact.subject}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          contact.status === 'new'
                            ? 'bg-primary/20 text-primary'
                            : contact.status === 'read'
                            ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                            : 'bg-green-500/20 text-green-600 dark:text-green-400'
                        }`}
                      >
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/70">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-secondary/20 rounded-lg transition-colors" title="Archive">
                          <Archive size={18} className="text-foreground/60" />
                        </button>
                        <button className="p-2 hover:bg-destructive/20 rounded-lg transition-colors" title="Delete">
                          <Trash2 size={18} className="text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedContact.fullName}</h2>
            <div className="space-y-4">
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
                <p className="mt-2 text-foreground/80 bg-secondary/10 p-4 rounded-lg">{selectedContact.message}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedContact(null)}
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
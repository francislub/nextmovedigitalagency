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

  // DELETE CONTACT
  async function deleteContact(id: string) {
    if (!confirm("Are you sure you want to delete this contact?")) return

    try {
      console.log("Deleting contact:", id)

      const res = await fetch('/api/admin/contacts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      const data = await res.json()

      if (data.success) {
        console.log("Deleted successfully")

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
        <p>Loading contacts...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-bold">Contact Forms</h1>
        <p className="text-foreground/60 mt-2">
          Manage all contact form submissions
        </p>
      </div>

      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-3 text-foreground/40" size={20} />
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border"
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <Mail size={48} className="mx-auto mb-4 text-foreground/40" />
            <p>No contacts found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Subject</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="border-b hover:bg-gray-50">

                  <td className="px-6 py-4">{contact.fullName}</td>
                  <td className="px-6 py-4">{contact.email}</td>
                  <td className="px-6 py-4">{contact.subject}</td>

                  <td className="px-6 py-4">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteContact(contact.id)
                      }}
                      className="p-2 hover:bg-red-100 rounded-lg"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-xl w-full">
            <h2 className="text-xl font-bold">{selectedContact.fullName}</h2>

            <p className="mt-2">{selectedContact.email}</p>

            <p className="mt-4">{selectedContact.message}</p>

            <button
              onClick={() => setSelectedContact(null)}
              className="mt-6 px-4 py-2 bg-gray-200 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
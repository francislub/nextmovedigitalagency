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

  // DELETE CONTACT
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
        <p>Loading contacts...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Contact Forms</h1>
        <p className="text-foreground/60 mt-2">
          Manage all contact form submissions
        </p>
      </div>

      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border"
        />
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl border overflow-hidden">

        {filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <Mail size={48} className="mx-auto mb-4 text-gray-400" />
            <p>No contacts found</p>
          </div>
        ) : (

          <table className="w-full">

            <thead className="border-b bg-gray-50">
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

                  <td className="px-6 py-4 font-medium">
                    {contact.fullName}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {contact.email}
                  </td>

                  <td className="px-6 py-4">
                    {contact.subject}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right space-x-2">

                    {/* VIEW BUTTON */}
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg"
                    >
                      <Eye size={18} className="text-blue-600" />
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => deleteContact(contact.id)}
                      className="p-2 bg-red-100 hover:bg-red-200 rounded-lg"
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

      {/* VIEW MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">

            <h2 className="text-2xl font-bold mb-6">
              Contact Details
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-gray-500 text-sm">Full Name</p>
                <p className="font-medium">{selectedContact.fullName}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-medium">{selectedContact.email}</p>
              </div>

              {selectedContact.phone && (
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p className="font-medium">{selectedContact.phone}</p>
                </div>
              )}

              <div>
                <p className="text-gray-500 text-sm">Subject</p>
                <p className="font-medium">{selectedContact.subject}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Message</p>
                <div className="bg-gray-100 p-4 rounded-lg mt-1">
                  {selectedContact.message}
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <p>{selectedContact.status}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Date</p>
                <p>{new Date(selectedContact.createdAt).toLocaleString()}</p>
              </div>

            </div>

            <button
              onClick={() => setSelectedContact(null)}
              className="mt-6 w-full py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  )
}
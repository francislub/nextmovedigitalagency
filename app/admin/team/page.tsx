'use client'

import { useState } from 'react'
import { Plus, Mail, Phone, Edit, Trash2, Github, Linkedin, Twitter } from 'lucide-react'
import toast from 'react-hot-toast'

interface TeamMember {
  id: string
  name: string
  image?: string
  description?: string
  activeEmail?: string
  activePhone?: string
  mainRole: string
  active: boolean
  githubLink?: string
  twitterLink?: string
  linkedinLink?: string
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    description: 'CEO & Founder',
    activeEmail: 'john@nextmove.digital',
    activePhone: '+1234567890',
    mainRole: 'admin',
    active: true,
    githubLink: 'https://github.com',
    linkedinLink: 'https://linkedin.com',
  },
  {
    id: '2',
    name: 'Jane Smith',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    description: 'Design Lead',
    activeEmail: 'jane@nextmove.digital',
    activePhone: '+1234567891',
    mainRole: 'designer',
    active: true,
    linkedinLink: 'https://linkedin.com',
  },
]

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(mockTeamMembers)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    activeEmail: '',
    activePhone: '',
    mainRole: 'member',
    image: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      setTeam(team.map(m => m.id === editingId ? { ...m, ...formData } : m))
      toast.success('Team member updated!')
    } else {
      setTeam([...team, { ...formData, id: Date.now().toString(), active: true }])
      toast.success('Team member added!')
    }

    setFormData({ name: '', description: '', activeEmail: '', activePhone: '', mainRole: 'member', image: '' })
    setEditingId(null)
    setIsOpen(false)
  }

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      description: member.description || '',
      activeEmail: member.activeEmail || '',
      activePhone: member.activePhone || '',
      mainRole: member.mainRole,
      image: member.image || '',
    })
    setEditingId(member.id)
    setIsOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">Team Members</h1>
          <p className="text-foreground/60 mt-2">Manage your team and permissions</p>
        </div>
        <button
          onClick={() => {
            setFormData({ name: '', description: '', activeEmail: '', activePhone: '', mainRole: 'member', image: '' })
            setEditingId(null)
            setIsOpen(true)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Add Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-all">
            {/* Avatar */}
            {member.image && (
              <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full mb-4" />
            )}

            {/* Name and Role */}
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-sm text-foreground/60 mb-4">{member.description}</p>

            {/* Contact Info */}
            <div className="space-y-2 mb-4 text-sm">
              {member.activeEmail && (
                <div className="flex items-center gap-2 text-foreground/70">
                  <Mail size={16} />
                  <a href={`mailto:${member.activeEmail}`} className="hover:text-primary transition-colors">
                    {member.activeEmail}
                  </a>
                </div>
              )}
              {member.activePhone && (
                <div className="flex items-center gap-2 text-foreground/70">
                  <Phone size={16} />
                  <a href={`tel:${member.activePhone}`} className="hover:text-primary transition-colors">
                    {member.activePhone}
                  </a>
                </div>
              )}
            </div>

            {/* Social Links */}
            {(member.githubLink || member.twitterLink || member.linkedinLink) && (
              <div className="flex gap-2 mb-4">
                {member.githubLink && (
                  <a href={member.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary/20 rounded-lg transition-colors">
                    <Github size={18} />
                  </a>
                )}
                {member.twitterLink && (
                  <a href={member.twitterLink} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary/20 rounded-lg transition-colors">
                    <Twitter size={18} />
                  </a>
                )}
                {member.linkedinLink && (
                  <a href={member.linkedinLink} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary/20 rounded-lg transition-colors">
                    <Linkedin size={18} />
                  </a>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(member)}
                className="flex-1 py-2 px-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => {
                  setTeam(team.filter(m => m.id !== member.id))
                  toast.success('Team member removed!')
                }}
                className="flex-1 py-2 px-3 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/30 transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit Team Member' : 'Add Team Member'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="CEO & Founder"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.activeEmail}
                    onChange={(e) => setFormData({ ...formData, activeEmail: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.activePhone}
                    onChange={(e) => setFormData({ ...formData, activePhone: e.target.value })}
                    placeholder="+1234567890"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  value={formData.mainRole}
                  onChange={(e) => setFormData({ ...formData, mainRole: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 focus:border-primary focus:outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="designer">Designer</option>
                  <option value="developer">Developer</option>
                  <option value="manager">Manager</option>
                  <option value="member">Member</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    setEditingId(null)
                  }}
                  className="px-6 py-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  {editingId ? 'Update' : 'Add'} Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

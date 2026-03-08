'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Plus, Mail, Phone, Edit, Trash2, Github, Linkedin, Twitter, Instagram, Globe } from 'lucide-react'
import { UploadButton } from '@uploadthing/react'

interface Role {
  id: string
  name: string
}

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
  instagramLink?: string
  websiteLink?: string
  roleIds?: string[]
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    description: '',
    activeEmail: '',
    activePhone: '',
    mainRole: 'admin',
    image: '',
    githubLink: '',
    twitterLink: '',
    linkedinLink: '',
    instagramLink: '',
    websiteLink: '',
    roleIds: [],
    active: true,
  })

  useEffect(() => {
    fetchTeam()
    fetchRoles()
  }, [])

  async function fetchTeam() {
    try {
      const res = await fetch('/api/admin/team')
      const data = await res.json()
      setTeam(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchRoles() {
    try {
      const res = await fetch('/api/roles') // make an API to fetch roles
      const data = await res.json()
      setRoles(data)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingId) {
        const res = await fetch('/api/dmin/team', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingId }),
        })
        const updated = await res.json()
        setTeam(team.map(t => t.id === editingId ? updated : t))
        toast.success('Team member updated!')
      } else {
        const res = await fetch('/api/admin/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        const newMember = await res.json()
        setTeam([newMember, ...team])
        toast.success('Team member added!')
      }
      setFormData({
        name: '', description: '', activeEmail: '', activePhone: '', mainRole: 'admin',
        image: '', githubLink:'', twitterLink:'', linkedinLink:'', instagramLink:'', websiteLink:'', roleIds: [], active: true
      })
      setEditingId(null)
      setIsOpen(false)
    } catch (error) {
      console.error(error)
      toast.error('Failed to save team member')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this team member?')) return
    try {
      const res = await fetch('/api/admin/team', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (res.ok) setTeam(prev => prev.filter(t => t.id !== id))
      toast.success('Team member removed!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete team member')
    }
  }

  const handleEdit = (member: TeamMember) => {
    setFormData({ ...member })
    setEditingId(member.id)
    setIsOpen(true)
  }

  if (loading) return <p className="text-center py-12">Loading team members...</p>

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">Team Members</h1>
          <p className="text-foreground/60 mt-2">Manage your team and permissions</p>
        </div>
        <button
          onClick={() => { setFormData({ name:'', description:'', activeEmail:'', activePhone:'', mainRole:'member', image:'', githubLink:'', twitterLink:'', linkedinLink:'', instagramLink:'', websiteLink:'', roleIds:[], active:true }); setEditingId(null); setIsOpen(true) }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={20}/> Add Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => (
          <div key={member.id} className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-all">
            {member.image && <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full mb-4"/>}
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-sm text-foreground/60 mb-4">{member.description}</p>

            <div className="space-y-2 mb-4 text-sm">
              {member.activeEmail && <div className="flex items-center gap-2 text-foreground/70"><Mail size={16}/> <a href={`mailto:${member.activeEmail}`} className="hover:text-primary">{member.activeEmail}</a></div>}
              {member.activePhone && <div className="flex items-center gap-2 text-foreground/70"><Phone size={16}/> <a href={`tel:${member.activePhone}`} className="hover:text-primary">{member.activePhone}</a></div>}
            </div>

            <div className="flex gap-2 mb-4">
              {member.githubLink && <a href={member.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary/20 rounded-lg"><Github size={18}/></a>}
              {member.twitterLink && <a href={member.twitterLink} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary/20 rounded-lg"><Twitter size={18}/></a>}
              {member.linkedinLink && <a href={member.linkedinLink} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary/20 rounded-lg"><Linkedin size={18}/></a>}
              {member.instagramLink && <a href={member.instagramLink} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary/20 rounded-lg"><Instagram size={18}/></a>}
              {member.websiteLink && <a href={member.websiteLink} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-secondary/20 rounded-lg"><Globe size={18}/></a>}
            </div>

            <div className="flex gap-2">
              <button onClick={()=>handleEdit(member)} className="flex-1 py-2 px-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-medium text-sm flex items-center justify-center gap-2">
                <Edit size={16}/> Edit
              </button>
              <button onClick={()=>handleDelete(member.id)} className="flex-1 py-2 px-3 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/30 transition-colors font-medium text-sm flex items-center justify-center gap-2">
                <Trash2 size={16}/> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Team Member':'Add Team Member'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name & Description */}
              <input placeholder="Full Name" value={formData.name||''} onChange={e=>setFormData({...formData,name:e.target.value})} required className="w-full px-4 py-2 rounded-lg border border-border"/>
              <input placeholder="Description" value={formData.description||''} onChange={e=>setFormData({...formData,description:e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border"/>

              {/* Email & Phone */}
              <input placeholder="Email" type="email" value={formData.activeEmail||''} onChange={e=>setFormData({...formData,activeEmail:e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border"/>
              <input placeholder="Phone" type="tel" value={formData.activePhone||''} onChange={e=>setFormData({...formData,activePhone:e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border"/>

              {/* Main Role */}
              <select value={formData.mainRole||'member'} onChange={e=>setFormData({...formData,mainRole:e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border">
                <option value="admin">Admin</option>
                <option value="designer">Designer</option>
                <option value="developer">Developer</option>
                <option value="manager">Manager</option>
                <option value="member">Member</option>
              </select>

              {/* Active Checkbox */}
              <label className="flex items-center gap-2"><input type="checkbox" checked={formData.active} onChange={e=>setFormData({...formData,active:e.target.checked})}/> Active</label>

              {/* Social Links */}
              <input placeholder="GitHub URL" value={formData.githubLink||''} onChange={e=>setFormData({...formData,githubLink:e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border"/>
              <input placeholder="Twitter URL" value={formData.twitterLink||''} onChange={e=>setFormData({...formData,twitterLink:e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border"/>
              <input placeholder="LinkedIn URL" value={formData.linkedinLink||''} onChange={e=>setFormData({...formData,linkedinLink:e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border"/>
              <input placeholder="Instagram URL" value={formData.instagramLink||''} onChange={e=>setFormData({...formData,instagramLink:e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border"/>
              <input placeholder="Website URL" value={formData.websiteLink||''} onChange={e=>setFormData({...formData,websiteLink:e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border"/>

              {/* Roles Multi-Select */}
              <select multiple value={formData.roleIds||[]} onChange={e=>setFormData({...formData,roleIds:Array.from(e.target.selectedOptions,d=>d.value)})} className="w-full px-4 py-2 rounded-lg border border-border">
                {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
              </select>

              {/* Upload Image */}
              <UploadButton endpoint="imageUploader" onClientUploadComplete={res=>setFormData({...formData,image:res[0].fileUrl})}>
                {({ isUploading }) => <button type="button" disabled={isUploading} className="px-4 py-2 bg-secondary/20 rounded-lg">{isUploading ? 'Uploading...' : formData.image ? 'Change Image' : 'Upload Image'}</button>}
              </UploadButton>

              <div className="flex gap-2 justify-end mt-6">
                <button type="button" onClick={()=>{setIsOpen(false); setEditingId(null)}} className="px-6 py-2 bg-secondary/20 rounded-lg">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg">{editingId?'Update':'Add'} Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
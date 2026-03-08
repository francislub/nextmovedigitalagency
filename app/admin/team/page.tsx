'use client'

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { Plus, Edit, Trash2, Mail, Phone, Github, Linkedin, Twitter, X } from "lucide-react"
import { ImageUpload } from "@/components/ui/image-upload" // your custom upload component
import { TeamMember as TeamMemberType } from "@prisma/client" // for types

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMemberType[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    activeEmail: '',
    activePhone: '',
    mainRole: 'member',
    image: '',
    githubLink: '',
    twitterLink: '',
    linkedinLink: '',
    instagramLink: '',
    websiteLink: '',
    roleIds: [] as string[]
  })

  // Fetch team members
  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("/api/admin/team")
        const data = await res.json()
        setTeam(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeam()
  }, [])

  // Submit form (Add / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/admin/team?id=${editingId}` : "/api/admin/team"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      const data = await res.json()

      if (res.ok) {
        if (editingId) {
          setTeam(team.map(m => m.id === editingId ? data : m))
          toast.success("Team member updated!")
        } else {
          setTeam([data, ...team])
          toast.success("Team member added!")
        }
        setIsOpen(false)
        setEditingId(null)
        setFormData({
          name: '',
          description: '',
          activeEmail: '',
          activePhone: '',
          mainRole: 'member',
          image: '',
          githubLink: '',
          twitterLink: '',
          linkedinLink: '',
          instagramLink: '',
          websiteLink: '',
          roleIds: []
        })
      } else {
        toast.error(data.message || "Failed to save")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  const handleEdit = (member: TeamMemberType) => {
    setFormData({
      name: member.name,
      description: member.description || '',
      activeEmail: member.activeEmail || '',
      activePhone: member.activePhone || '',
      mainRole: member.mainRole,
      image: member.image || '',
      githubLink: member.githubLink || '',
      twitterLink: member.twitterLink || '',
      linkedinLink: member.linkedinLink || '',
      instagramLink: member.instagramLink || '',
      websiteLink: member.websiteLink || '',
      roleIds: member.roleIds || []
    })
    setEditingId(member.id)
    setIsOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return
    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        setTeam(team.filter(m => m.id !== id))
        toast.success("Team member removed!")
      } else {
        toast.error("Failed to delete")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">Team Members</h1>
          <p className="text-foreground/60 mt-2">Manage your team and permissions</p>
        </div>
        <button
          onClick={() => { setIsOpen(true); setEditingId(null); setFormData({
            name: '',
            description: '',
            activeEmail: '',
            activePhone: '',
            mainRole: 'member',
            image: '',
            githubLink: '',
            twitterLink: '',
            linkedinLink: '',
            instagramLink: '',
            websiteLink: '',
            roleIds: []
          }) }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          <Plus size={20}/> Add Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map(member => (
          <div key={member.id} className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-all">
            {member.image && (
              <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full mb-4 object-cover" />
            )}
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-sm text-foreground/60 mb-4">{member.description}</p>

            <div className="space-y-2 mb-4 text-sm">
              {member.activeEmail && <div className="flex items-center gap-2"><Mail size={16} /> {member.activeEmail}</div>}
              {member.activePhone && <div className="flex items-center gap-2"><Phone size={16} /> {member.activePhone}</div>}
            </div>

            <div className="flex gap-2 mb-4">
              {member.githubLink && <a href={member.githubLink} target="_blank" className="p-2 hover:bg-secondary/20 rounded-lg"><Github size={18}/></a>}
              {member.twitterLink && <a href={member.twitterLink} target="_blank" className="p-2 hover:bg-secondary/20 rounded-lg"><Twitter size={18}/></a>}
              {member.linkedinLink && <a href={member.linkedinLink} target="_blank" className="p-2 hover:bg-secondary/20 rounded-lg"><Linkedin size={18}/></a>}
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleEdit(member)} className="flex-1 py-2 px-3 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors font-medium text-sm flex items-center justify-center gap-2"><Edit size={16}/> Edit</button>
              <button onClick={() => handleDelete(member.id)} className="flex-1 py-2 px-3 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/30 transition-colors font-medium text-sm flex items-center justify-center gap-2"><Trash2 size={16}/> Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{editingId ? "Edit Team Member" : "Add Team Member"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input type="text" required className="w-full px-4 py-2 rounded-lg border" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border" value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 rounded-lg border" value={formData.activeEmail} onChange={(e)=>setFormData({...formData,activeEmail:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input type="tel" className="w-full px-4 py-2 rounded-lg border" value={formData.activePhone} onChange={(e)=>setFormData({...formData,activePhone:e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select className="w-full px-4 py-2 rounded-lg border" value={formData.mainRole} onChange={(e)=>setFormData({...formData,mainRole:e.target.value})}>
                  <option value="admin">Admin</option>
                  <option value="designer">Designer</option>
                  <option value="developer">Developer</option>
                  <option value="manager">Manager</option>
                  <option value="member">Member</option>
                </select>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-4">
                <input type="url" placeholder="GitHub Link" className="w-full px-4 py-2 rounded-lg border" value={formData.githubLink} onChange={e=>setFormData({...formData,githubLink:e.target.value})} />
                <input type="url" placeholder="Twitter Link" className="w-full px-4 py-2 rounded-lg border" value={formData.twitterLink} onChange={e=>setFormData({...formData,twitterLink:e.target.value})} />
                <input type="url" placeholder="LinkedIn Link" className="w-full px-4 py-2 rounded-lg border" value={formData.linkedinLink} onChange={e=>setFormData({...formData,linkedinLink:e.target.value})} />
                <input type="url" placeholder="Instagram Link" className="w-full px-4 py-2 rounded-lg border" value={formData.instagramLink} onChange={e=>setFormData({...formData,instagramLink:e.target.value})} />
                <input type="url" placeholder="Website Link" className="w-full px-4 py-2 rounded-lg border" value={formData.websiteLink} onChange={e=>setFormData({...formData,websiteLink:e.target.value})} />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Profile Image</label>
                <ImageUpload value={formData.image || null} onChange={url=>setFormData({...formData,image:url || ''})} />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button type="button" className="px-6 py-2 bg-secondary/20 rounded-lg" onClick={()=>{setIsOpen(false); setEditingId(null)}}>Cancel</button>
                <button type="submit" className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg">{editingId ? "Update" : "Add"} Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
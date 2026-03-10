'use client'

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { Plus, Edit, Trash2, Eye, Mail, Phone, Github, Linkedin, Twitter, X } from "lucide-react"
import { ImageUpload } from "@/components/ui/image-upload"
import { TeamMember as TeamMemberType } from "@prisma/client"

interface Role {
  id: string
  name: string
}

export default function TeamPage() {

  const [team, setTeam] = useState<TeamMemberType[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)

  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | null>(null)

  const [formData, setFormData] = useState({
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
    roleIds: [] as string[]
  })

  // Fetch team + roles
  useEffect(() => {

    async function fetchData() {
      try {

        const [teamRes, rolesRes] = await Promise.all([
          fetch("/api/admin/team"),
          fetch("/api/admin/roles")
        ])

        const teamData = await teamRes.json()
        const roleData = await rolesRes.json()

        setTeam(teamData)
        setRoles(roleData)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

  }, [])

  // Toggle role selection
  const toggleRole = (id: string) => {

    const exists = formData.roleIds.includes(id)

    if (exists) {
      setFormData({
        ...formData,
        roleIds: formData.roleIds.filter(r => r !== id)
      })
    } else {
      setFormData({
        ...formData,
        roleIds: [...formData.roleIds, id]
      })
    }
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    try {

      const method = editingId ? "PUT" : "POST"

      const res = await fetch("/api/admin/team", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId ? { ...formData, id: editingId } : formData
        ),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Failed")
        return
      }

      if (editingId) {

        setTeam(team.map(m => m.id === editingId ? data : m))
        toast.success("Member updated")

      } else {

        setTeam([data, ...team])
        toast.success("Member added")

      }

      setIsOpen(false)
      setEditingId(null)

      setFormData({
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
        roleIds: []
      })

    } catch (error) {

      console.error(error)
      toast.error("Something went wrong")

    }
  }

  // Edit
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

  // Delete
  const handleDelete = async (id: string) => {

    if (!confirm("Delete this member?")) return

    try {

      const res = await fetch("/api/admin/team/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      const data = await res.json()

      if (data.success) {
        setTeam(team.filter(m => m.id !== id))
        toast.success("Deleted")
      }

    } catch {
      toast.error("Delete failed")
    }
  }

  if (loading) return <p>Loading...</p>

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">Team Members</h1>
          <p className="text-foreground/60 mt-2">Manage your team</p>
        </div>

        <button
          onClick={() => {
            setIsOpen(true)
            setEditingId(null)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg"
        >
          <Plus size={18}/> Add Member
        </button>

      </div>

      {/* Team grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {team.map(member => (

          <div
            key={member.id}
            className="bg-card border rounded-xl p-6 space-y-3"
          >

            {member.image && (
              <img
                src={member.image}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}

            <h3 className="text-xl font-bold">{member.name}</h3>

            {/* 2 line description */}

            <p className="text-sm text-muted-foreground line-clamp-2">
              {member.description}
            </p>

            <div className="text-sm space-y-1">

              {member.activeEmail && (
                <div className="flex gap-2 items-center">
                  <Mail size={14}/> {member.activeEmail}
                </div>
              )}

              {member.activePhone && (
                <div className="flex gap-2 items-center">
                  <Phone size={14}/> {member.activePhone}
                </div>
              )}

            </div>

            <div className="flex gap-2">

              <button
                onClick={()=>handleEdit(member)}
                className="flex-1 bg-primary/20 text-primary py-2 rounded"
              >
                <Edit size={16}/>
              </button>

              <button
                onClick={()=>handleDelete(member.id)}
                className="flex-1 bg-destructive/20 text-destructive py-2 rounded"
              >
                <Trash2 size={16}/>
              </button>

              <button
                onClick={()=>setSelectedMember(member)}
                className="flex-1 bg-blue-100 text-blue-600 py-2 rounded"
              >
                <Eye size={16}/>
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* VIEW DIALOG */}

      {selectedMember && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-card p-8 rounded-xl max-w-xl w-full space-y-4">

            <h2 className="text-2xl font-bold">
              {selectedMember.name}
            </h2>

            {selectedMember.image && (
              <img
                src={selectedMember.image}
                className="w-32 h-32 rounded-full object-cover"
              />
            )}

            {/* FULL DESCRIPTION */}

            <p>{selectedMember.description}</p>

            <p><b>Email:</b> {selectedMember.activeEmail}</p>
            <p><b>Phone:</b> {selectedMember.activePhone}</p>
            <p><b>Main Role:</b> {selectedMember.mainRole}</p>

            <button
              onClick={()=>setSelectedMember(null)}
              className="w-full py-2 bg-secondary rounded"
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* ADD / EDIT DIALOG */}

      {isOpen && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-card p-8 rounded-xl max-w-2xl w-full overflow-y-auto max-h-[90vh]">

            <h2 className="text-2xl font-bold mb-6">
              {editingId ? "Edit Member" : "Add Member"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                required
                placeholder="Full name"
                className="w-full border p-2 rounded"
                value={formData.name}
                onChange={(e)=>setFormData({...formData,name:e.target.value})}
              />

              <textarea
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={formData.description}
                onChange={(e)=>setFormData({...formData,description:e.target.value})}
              />

              <div className="grid grid-cols-2 gap-4">

                <input
                  placeholder="Email"
                  className="border p-2 rounded"
                  value={formData.activeEmail}
                  onChange={(e)=>setFormData({...formData,activeEmail:e.target.value})}
                />

                <input
                  placeholder="Phone"
                  className="border p-2 rounded"
                  value={formData.activePhone}
                  onChange={(e)=>setFormData({...formData,activePhone:e.target.value})}
                />

              </div>

              {/* MAIN ROLE */}

              <select
                className="border p-2 rounded w-full"
                value={formData.mainRole}
                onChange={(e)=>setFormData({...formData,mainRole:e.target.value})}
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>

              {/* MULTI ROLE SELECT */}

              <div>

                <p className="font-medium mb-2">Roles</p>

                <div className="flex flex-wrap gap-2">

                  {roles.map(role => (

                    <button
                      type="button"
                      key={role.id}
                      onClick={()=>toggleRole(role.id)}
                      className={`px-3 py-1 rounded border
                        ${formData.roleIds.includes(role.id)
                        ? "bg-primary text-white"
                        : "bg-muted"}
                      `}
                    >
                      {role.name}
                    </button>

                  ))}

                </div>

              </div>

              <ImageUpload
                value={formData.image || null}
                onChange={(url)=>setFormData({...formData,image:url || ''})}
              />

              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={()=>setIsOpen(false)}
                  className="px-5 py-2 bg-muted rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white rounded"
                >
                  {editingId ? "Update" : "Add"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}
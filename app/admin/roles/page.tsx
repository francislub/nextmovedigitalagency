'use client'

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Plus, Trash2, Edit } from "lucide-react"

interface Role {
  id: string
  name: string
  description?: string
  createdAt: string
}

export default function RolesPage() {

  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  async function fetchRoles() {
    try {
      const res = await fetch("/api/admin/roles")
      const data = await res.json()
      setRoles(data)
    } catch {
      toast.error("Failed to fetch roles")
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  async function handleSubmit() {

    if (!name) {
      toast.error("Role name required")
      return
    }

    setLoading(true)

    try {

      if (editingId) {

        await fetch(`/api/admin/roles/${editingId}`, {
          method: "PUT",
          body: JSON.stringify({ name, description }),
        })

        toast.success("Role updated")

      } else {

        await fetch("/api/admin/roles", {
          method: "POST",
          body: JSON.stringify({ name, description }),
        })

        toast.success("Role created")
      }

      setName("")
      setDescription("")
      setEditingId(null)

      fetchRoles()

    } catch {
      toast.error("Error saving role")
    }

    setLoading(false)
  }

  async function deleteRole(id: string) {

    if (!confirm("Delete this role?")) return

    try {

      await fetch(`/api/admin/roles/${id}`, {
        method: "DELETE",
      })

      toast.success("Role deleted")

      fetchRoles()

    } catch {
      toast.error("Delete failed")
    }
  }

  function editRole(role: Role) {
    setEditingId(role.id)
    setName(role.name)
    setDescription(role.description || "")
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Manage Roles
      </h1>

      {/* Form */}

      <div className="bg-white p-6 rounded-xl shadow mb-8 space-y-4">

        <input
          placeholder="Role name"
          className="w-full border p-3 rounded"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <textarea
          placeholder="Role description"
          className="w-full border p-3 rounded"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          <Plus size={16} />
          {editingId ? "Update Role" : "Add Role"}
        </button>

      </div>

      {/* Roles Table */}

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="border-b">
            <tr className="text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {roles.map((role)=>(
              <tr key={role.id} className="border-b">

                <td className="p-4 font-medium">
                  {role.name}
                </td>

                <td className="p-4 text-gray-600">
                  {role.description}
                </td>

                <td className="p-4 flex gap-3">

                  <button
                    onClick={()=>editRole(role)}
                    className="text-blue-600"
                  >
                    <Edit size={18}/>
                  </button>

                  <button
                    onClick={()=>deleteRole(role.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={18}/>
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}
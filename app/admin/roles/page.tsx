'use client'

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Plus, Trash2, Edit } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Role {
  id: string
  name: string
  description?: string
}

export default function RolesPage() {

  const [roles, setRoles] = useState<Role[]>([])

  const [loading, setLoading] = useState(false)

  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

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

  async function createRole() {

    if (!name) {
      toast.error("Role name required")
      return
    }

    setLoading(true)

    try {

      await fetch("/api/admin/roles", {
        method: "POST",
        body: JSON.stringify({ name, description }),
      })

      toast.success("Role created")

      setOpenCreate(false)

      setName("")
      setDescription("")

      fetchRoles()

    } catch {
      toast.error("Failed to create role")
    }

    setLoading(false)
  }

  async function updateRole() {

    if (!selectedRole) return

    setLoading(true)

    try {

      await fetch(`/api/admin/roles/${selectedRole.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, description }),
      })

      toast.success("Role updated")

      setOpenEdit(false)

      setSelectedRole(null)

      fetchRoles()

    } catch {
      toast.error("Update failed")
    }

    setLoading(false)
  }

  async function deleteRole() {

    if (!selectedRole) return

    try {

      await fetch(`/api/admin/roles/${selectedRole.id}`, {
        method: "DELETE",
      })

      toast.success("Role deleted")

      setOpenDelete(false)

      fetchRoles()

    } catch {
      toast.error("Delete failed")
    }
  }

  function openEditDialog(role: Role) {
    setSelectedRole(role)
    setName(role.name)
    setDescription(role.description || "")
    setOpenEdit(true)
  }

  function openDeleteDialog(role: Role) {
    setSelectedRole(role)
    setOpenDelete(true)
  }

  return (
    <div className="p-8 space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Manage Roles
        </h1>

        <Button
          onClick={() => setOpenCreate(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Role
        </Button>

      </div>

      {/* Roles Table */}

      <div className="rounded-xl border bg-card shadow-sm">

        <table className="w-full">

          <thead className="border-b bg-muted/40">
            <tr className="text-left">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Description</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>

            {roles.map((role) => (

              <tr key={role.id} className="border-b hover:bg-muted/30">

                <td className="p-4 font-medium">
                  {role.name}
                </td>

                <td className="p-4 text-muted-foreground">
                  {role.description}
                </td>

                <td className="p-4 flex gap-3">

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEditDialog(role)}
                  >
                    <Edit size={16} />
                  </Button>

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => openDeleteDialog(role)}
                  >
                    <Trash2 size={16} />
                  </Button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* CREATE ROLE DIALOG */}

      <Dialog open={openCreate} onOpenChange={setOpenCreate}>

        <DialogContent>

          <DialogHeader>
            <DialogTitle>Create Role</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">

            <Input
              placeholder="Role name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <Textarea
              placeholder="Role description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

          </div>

          <DialogFooter>

            <Button
              variant="secondary"
              onClick={()=>setOpenCreate(false)}
            >
              Cancel
            </Button>

            <Button onClick={createRole} disabled={loading}>
              Create
            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>

      {/* EDIT ROLE DIALOG */}

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>

        <DialogContent>

          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">

            <Input
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <Textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

          </div>

          <DialogFooter>

            <Button
              variant="secondary"
              onClick={()=>setOpenEdit(false)}
            >
              Cancel
            </Button>

            <Button onClick={updateRole} disabled={loading}>
              Update
            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>

      {/* DELETE CONFIRM DIALOG */}

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>

        <DialogContent>

          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground">
            Are you sure you want to delete this role?
          </p>

          <DialogFooter>

            <Button
              variant="secondary"
              onClick={()=>setOpenDelete(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={deleteRole}
            >
              Delete
            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>

    </div>
  )
}
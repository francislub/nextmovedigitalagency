import { AdminSidebar } from '@/components/admin/Sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}

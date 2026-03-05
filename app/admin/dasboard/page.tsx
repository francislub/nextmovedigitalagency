'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Mail, Calendar, Users, MessageSquare, TrendingUp } from 'lucide-react'

const StatCard = ({ icon: Icon, label, value, trend }: any) => (
  <div className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-all duration-300">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-foreground/60 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        {trend && (
          <div className="flex items-center gap-1 mt-2 text-green-500 text-sm">
            <TrendingUp size={16} />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
        <Icon size={24} className="text-primary" />
      </div>
    </div>
  </div>
)

export default function DashboardPage() {
  const [stats, setStats] = useState({
    contacts: 0,
    consultations: 0,
    team: 0,
    subscribers: 0,
  })
  const [chartData, setChartData] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [contacts, consultations] = await Promise.all([
          fetch('/api/contact').then((r) => r.json()),
          fetch('/api/consultation').then((r) => r.json()),
        ])

        setStats({
          contacts: contacts?.length || 0,
          consultations: consultations?.length || 0,
          team: 5, // Mock data
          subscribers: 120, // Mock data
        })

        // Mock chart data
        setChartData([
          { name: 'Jan', contacts: 12, consultations: 8, revenue: 2400 },
          { name: 'Feb', contacts: 15, consultations: 12, revenue: 2210 },
          { name: 'Mar', contacts: 20, consultations: 15, revenue: 2290 },
          { name: 'Apr', contacts: 18, consultations: 18, revenue: 2000 },
          { name: 'May', contacts: 25, consultations: 20, revenue: 2181 },
          { name: 'Jun', contacts: 28, consultations: 24, revenue: 2500 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-foreground/60 mt-2">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Mail} label="Contact Forms" value={stats.contacts} trend="+12% this month" />
        <StatCard icon={Calendar} label="Consultations" value={stats.consultations} trend="+8% this month" />
        <StatCard icon={Users} label="Team Members" value={stats.team} trend="Active" />
        <StatCard icon={MessageSquare} label="Subscribers" value={stats.subscribers} trend="+24 new" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border/50 p-6">
          <h2 className="text-xl font-bold mb-6">Activity Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--foreground-60)" />
              <YAxis stroke="var(--foreground-60)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
              <Legend />
              <Line type="monotone" dataKey="contacts" stroke="var(--primary)" strokeWidth={2} />
              <Line type="monotone" dataKey="consultations" stroke="var(--secondary)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-card rounded-xl border border-border/50 p-6">
          <h2 className="text-xl font-bold mb-6">Service Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Web Design', value: 35 },
                  { name: 'Branding', value: 25 },
                  { name: 'SEO', value: 20 },
                  { name: 'Social Media', value: 20 },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="var(--primary)" />
                <Cell fill="var(--secondary)" />
                <Cell fill="var(--accent)" />
                <Cell fill="var(--muted)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl border border-border/50 p-6">
        <h2 className="text-xl font-bold mb-6">Recent Submissions</h2>
        <div className="space-y-4">
          {[
            { type: 'Contact', author: 'John Doe', time: '2 hours ago', status: 'new' },
            { type: 'Consultation', author: 'Jane Smith', time: '4 hours ago', status: 'pending' },
            { type: 'Subscription', author: 'Mike Johnson', time: '1 day ago', status: 'confirmed' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg hover:bg-secondary/10 transition-colors">
              <div>
                <p className="font-semibold">{item.type}</p>
                <p className="text-sm text-foreground/60">{item.author}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/60">{item.time}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'new' ? 'bg-primary/20 text-primary' :
                  item.status === 'pending' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
                  'bg-green-500/20 text-green-600 dark:text-green-400'
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

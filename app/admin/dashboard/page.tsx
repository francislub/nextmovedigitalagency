'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import {
  Mail,
  Calendar,
  Users,
  MessageSquare,
  TrendingUp
} from 'lucide-react'

const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-card rounded-xl border border-border/50 p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-foreground/60 text-sm">{label}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>

      <div className="p-3 bg-primary/10 rounded-lg">
        <Icon size={24} className="text-primary" />
      </div>
    </div>
  </div>
)

export default function DashboardPage() {

  const [stats,setStats] = useState({
    contacts:0,
    consultations:0,
    team:0,
    subscribers:0
  })

  const [recentActivity,setRecentActivity] = useState<any[]>([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    async function loadDashboard(){

      try{

        const res = await fetch("/api/admin/dashboard")
        const data = await res.json()

        setStats(data.stats)
        setRecentActivity(data.recentActivity)

      }catch(err){
        console.error("Dashboard error:",err)
      }finally{
        setLoading(false)
      }

    }

    loadDashboard()

  },[])

  if(loading){
    return(
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"/>
      </div>
    )
  }

  const chartData = [
    { name:"Contacts", value:stats.contacts },
    { name:"Consultations", value:stats.consultations },
    { name:"Team", value:stats.team },
    { name:"Subscribers", value:stats.subscribers }
  ]

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-foreground/60 mt-2">
          Business overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          icon={Mail}
          label="Contact Forms"
          value={stats.contacts}
        />

        <StatCard
          icon={Calendar}
          label="Consultations"
          value={stats.consultations}
        />

        <StatCard
          icon={Users}
          label="Team Members"
          value={stats.team}
        />

        <StatCard
          icon={MessageSquare}
          label="Subscribers"
          value={stats.subscribers}
        />

      </div>

      {/* Chart */}
      <div className="bg-card rounded-xl border border-border p-6">

        <h2 className="text-xl font-bold mb-6">
          Platform Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl border border-border p-6">

        <h2 className="text-xl font-bold mb-6">
          Recent Activity
        </h2>

        <div className="space-y-4">

          {recentActivity.map((item,index)=>(
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-secondary/5 rounded-lg"
            >

              <div>
                <p className="font-semibold">{item.type}</p>
                <p className="text-sm text-foreground/60">
                  {item.author}
                </p>
              </div>

              <span className="text-sm text-foreground/60">
                {new Date(item.time).toLocaleDateString()}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  )
}
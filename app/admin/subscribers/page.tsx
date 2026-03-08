'use client'

import { useEffect, useState } from 'react'
import { Mail, Download, Trash2 } from 'lucide-react'

interface Subscriber {
  id: string
  email: string
  subscribedAt: string
}

export default function SubscribersPage() {

  const [subscribers,setSubscribers] = useState<Subscriber[]>([])
  const [loading,setLoading] = useState(true)
  const [deleting,setDeleting] = useState<string | null>(null)

  useEffect(()=>{
    fetchSubscribers()
  },[])

  async function fetchSubscribers(){

    try{

      const res = await fetch('/api/admin/subscribers')
      const data = await res.json()

      setSubscribers(data)

    }catch(error){
      console.error("Fetch subscribers error:",error)
    }finally{
      setLoading(false)
    }

  }

  async function deleteSubscriber(id:string){

    if(!confirm("Delete this subscriber?")) return

    setDeleting(id)

    try{

      const res = await fetch('/api/admin/subscribers',{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({id})
      })

      if(res.ok){
        setSubscribers(prev => prev.filter(s => s.id !== id))
      }

    }catch(error){
      console.error("Delete subscriber error:",error)
    }finally{
      setDeleting(null)
    }

  }

  function exportCSV(){

    const rows = subscribers.map(s =>
      `${s.email},${new Date(s.subscribedAt).toLocaleDateString()}`
    )

    const csv =
      "Email,Subscribed Date\n" +
      rows.join("\n")

    const blob = new Blob([csv],{ type:"text/csv" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "subscribers.csv"
    a.click()

  }

  if(loading){
    return(
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"/>
          <p className="text-foreground/60">Loading subscribers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <div>
          <h1 className="text-4xl font-bold">Email Subscribers</h1>
          <p className="text-foreground/60 mt-2">
            Manage newsletter subscribers
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          <Download size={20}/>
          Export CSV
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-card rounded-xl border border-border/50 overflow-hidden">

        {subscribers.length === 0 ? (

          <div className="text-center py-12">
            <Mail size={48} className="mx-auto mb-4 text-foreground/40"/>
            <p className="text-foreground/60">No subscribers yet</p>
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-secondary/10 border-b border-border">

                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Email
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Subscribed Date
                  </th>

                  <th className="px-6 py-3 text-right text-sm font-semibold">
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody className="divide-y divide-border">

                {subscribers.map((subscriber)=>(
                  <tr
                    key={subscriber.id}
                    className="hover:bg-secondary/5 transition-colors"
                  >

                    <td className="px-6 py-4 font-medium">
                      {subscriber.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-foreground/70">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right">

                      <button
                        onClick={()=>deleteSubscriber(subscriber.id)}
                        disabled={deleting === subscriber.id}
                        className="p-2 hover:bg-destructive/20 rounded-lg transition-colors"
                      >
                        <Trash2
                          size={18}
                          className="text-destructive"
                        />
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  )
}
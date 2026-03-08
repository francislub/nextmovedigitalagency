import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [
      contactsCount,
      consultationsCount,
      teamCount,
      subscribersCount,
      recentContacts,
      recentConsultations,
      recentSubscribers
    ] = await Promise.all([
      prisma.contactSubmission.count(),
      prisma.scheduleConsultation.count(),
      prisma.teamMember.count(),
      prisma.subscriber.count(),

      prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 5
      }),

      prisma.scheduleConsultation.findMany({
        orderBy: { createdAt: "desc" },
        take: 5
      }),

      prisma.subscriber.findMany({
        orderBy: { subscribedAt: "desc" },
        take: 5
      })
    ])

    const recentActivity = [
      ...recentContacts.map((c) => ({
        type: "Contact",
        author: c.fullName,
        status: c.status,
        time: c.createdAt
      })),
      ...recentConsultations.map((c) => ({
        type: "Consultation",
        author: c.fullName,
        status: c.status,
        time: c.createdAt
      })),
      ...recentSubscribers.map((s) => ({
        type: "Subscription",
        author: s.email,
        status: "confirmed",
        time: s.subscribedAt
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 6)

    return NextResponse.json({
      stats: {
        contacts: contactsCount,
        consultations: consultationsCount,
        team: teamCount,
        subscribers: subscribersCount
      },
      recentActivity
    })

  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    )
  }
}
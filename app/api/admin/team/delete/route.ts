import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: "Team member ID required" }, { status: 400 })

    await prisma.teamMember.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete team member error:", error)
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 })
  }
}
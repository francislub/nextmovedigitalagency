import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET → fetch all team members
export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(team)
  } catch (error) {
    console.error("Fetch team error:", error)
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 })
  }
}

// POST → add a new team member
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newMember = await prisma.teamMember.create({
      data: {
        name: data.name,
        description: data.description,
        activeEmail: data.activeEmail,
        activePhone: data.activePhone,
        mainRole: data.mainRole || "admin",
        image: data.image,
        githubLink: data.githubLink,
        twitterLink: data.twitterLink,
        linkedinLink: data.linkedinLink,
        instagramLink: data.instagramLink,
        websiteLink: data.websiteLink,
        roleIds: data.roleIds || [],
      },
    })
    return NextResponse.json(newMember)
  } catch (error) {
    console.error("Add team member error:", error)
    return NextResponse.json({ error: "Failed to add team member" }, { status: 500 })
  }
}

// PUT → update a team member
export async function PUT(request: Request) {
  try {
    const data = await request.json()
    if (!data.id) return NextResponse.json({ error: "ID is required" }, { status: 400 })

    const updated = await prisma.teamMember.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        activeEmail: data.activeEmail,
        activePhone: data.activePhone,
        mainRole: data.mainRole,
        image: data.image,
        githubLink: data.githubLink,
        twitterLink: data.twitterLink,
        linkedinLink: data.linkedinLink,
        instagramLink: data.instagramLink,
        websiteLink: data.websiteLink,
        active: data.active,
        roleIds: data.roleIds || [],
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error("Update team member error:", error)
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 })
  }
}
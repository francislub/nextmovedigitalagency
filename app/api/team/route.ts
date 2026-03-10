// app/api/team/route.ts

import { NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"

export async function GET() {
  console.log("🚀 /api/team request received")

  try {

    const team = await prisma.teamMember.findMany({
      where: {
        active: true
      },
      include: {
        roles: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    console.log("✅ Team fetched:", team.length)

    return NextResponse.json(team)

  } catch (error) {

    console.error("❌ Failed to fetch team:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch team members"
      },
      { status: 500 }
    )
  }
}
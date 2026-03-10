import { NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"

export async function GET() {
  console.log("🚀 Fetching team members")

  try {
    const team = await prisma.teamMember.findMany({
      where: {
        active: true,
      },
      include: {
        roles: true, // VERY IMPORTANT
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    console.log("✅ Team members:", team)

    return NextResponse.json(team)

  } catch (error) {
    console.error("❌ Error fetching team:", error)

    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    )
  }
}
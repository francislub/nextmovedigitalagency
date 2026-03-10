import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(roles)
  } catch (error) {
    console.error("GET ROLES ERROR", error)
    return NextResponse.json({ error: "Failed to fetch roles" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const role = await prisma.role.create({
      data: {
        name: body.name,
        description: body.description,
      },
    })

    return NextResponse.json(role)
  } catch (error) {
    console.error("CREATE ROLE ERROR", error)
    return NextResponse.json({ error: "Failed to create role" }, { status: 500 })
  }
}
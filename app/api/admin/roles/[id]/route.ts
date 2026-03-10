import { NextRequest, NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    const role = await prisma.role.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
      },
    })

    return NextResponse.json(role)
  } catch (error) {
    console.error("UPDATE ROLE ERROR", error)
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.role.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE ROLE ERROR", error)
    return NextResponse.json({ error: "Failed to delete role" }, { status: 500 })
  }
}
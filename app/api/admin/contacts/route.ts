import {NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ contacts })
  } catch (error) {
    console.error('Failed to fetch contacts:', error)
    return NextResponse.json({ contacts: [], error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

// DELETE contact
export async function DELETE(req: NextRequest) {
  console.log("🗑 DELETE contact request received")

  try {
    const { id } = await req.json()

    console.log("📦 Contact ID:", id)

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Contact ID required" },
        { status: 400 }
      )
    }

    await prisma.contactSubmission.delete({
      where: { id },
    })

    console.log("✅ Contact deleted:", id)

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    })
  } catch (error) {
    console.error("❌ Delete failed:", error)

    return NextResponse.json(
      { success: false, message: "Failed to delete contact" },
      { status: 500 }
    )
  }
}
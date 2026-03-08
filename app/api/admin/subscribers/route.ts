import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET ALL SUBSCRIBERS
export async function GET() {
  try {

    const subscribers = await prisma.subscriber.findMany({
      orderBy: { subscribedAt: "desc" }
    })

    return NextResponse.json(subscribers)

  } catch (error) {

    console.error("Subscribers fetch error:", error)

    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    )

  }
}


// DELETE SUBSCRIBER
export async function DELETE(request: Request) {

  try {

    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: "Subscriber ID required" },
        { status: 400 }
      )
    }

    await prisma.subscriber.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true
    })

  } catch (error) {

    console.error("Delete subscriber error:", error)

    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 }
    )

  }

}
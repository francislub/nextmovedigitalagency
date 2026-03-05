import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    })

    return NextResponse.json({ roles }, { status: 200 })
  } catch (error) {
    console.error('[v0] Error fetching roles:', error)
    return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 })
  }
}

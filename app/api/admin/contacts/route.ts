import { NextResponse } from 'next/server'
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